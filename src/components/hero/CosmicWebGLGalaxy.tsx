import React, { useRef, useEffect } from 'react';
import { useMotionStore } from '../../store/useMotionStore';

// Vertex Shader for Fullscreen Quad
const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Procedural Spiral Galaxy Fragment Shader (Fixed, steady cosmic rotation - no cursor movement)
const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_shockwave; // x, y, progress (0 to 1)

  // Pseudo-random noise hash
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Smooth 2D Value Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal Brownian Motion for swirling interstellar dust
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.55;
    mat2 rot = mat2(0.877, 0.479, -0.479, 0.877);
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = rot * p * 2.15;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Aspect-ratio corrected UV coordinates centered at (0, 0)
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Subtle upward offset so the bright galactic core aligns with the meditating figure's upper chest/halo
    uv.y += 0.04;

    // Shockwave gravitational lensing distortion on click
    if (u_shockwave.z > 0.0) {
      vec2 waveCenter = (u_shockwave.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      waveCenter.y += 0.04;
      float d = length(uv - waveCenter);
      float waveDist = u_shockwave.z * 1.35;
      float diff = d - waveDist;
      if (abs(diff) < 0.12) {
        float waveStrength = sin(diff * 26.17) * (1.0 - u_shockwave.z) * 0.04;
        uv += normalize(uv - waveCenter) * waveStrength;
      }
    }

    // Polar coordinates for logarithmic spiral
    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // Smooth, serene rotation over time (hypnotic and continuous)
    float rotSpeed = 0.065;
    float time = u_time * rotSpeed;

    // Logarithmic spiral math: 2 main arms + interstellar filaments
    float armTwist = 3.6;
    float spiralAngle = theta - armTwist * log(r + 0.07) + time;
    float spiral1 = cos(spiralAngle * 2.0);
    float spiral2 = cos(spiralAngle * 4.0 + 1.57);

    // Modulate spiral arms with FBM nebula turbulence
    vec2 gasCoord = vec2(r * 2.4, spiralAngle * 1.4);
    float gas = fbm(gasCoord + vec2(u_time * 0.02, -u_time * 0.015));
    float armDensity = max(0.0, spiral1 * 0.65 + spiral2 * 0.35 + 0.3) * gas;

    // Radial attenuation of arms (bright near center, fades smoothly outwards)
    float armFalloff = smoothstep(1.35, 0.12, r) * smoothstep(0.02, 0.22, r);
    float arms = armDensity * armFalloff;

    // Intense radiant galactic core star
    float coreGlow = 1.0 / (r * 16.0 + 0.045);
    float coreRays = max(0.0, cos(theta * 8.0 + u_time * 0.15)) * 0.18 * exp(-r * 6.5);
    float core = (coreGlow + coreRays) * 0.52;

    // Distant procedural twinkling cosmic stars
    vec2 starUv = uv * 85.0;
    float starGrid = hash(floor(starUv));
    float star = 0.0;
    if (starGrid > 0.982) {
      float twinkle = sin(u_time * 2.2 + starGrid * 62.8) * 0.5 + 0.5;
      star = smoothstep(0.42, 0.0, length(fract(starUv) - 0.5)) * twinkle * (1.0 - smoothstep(0.0, 0.85, r));
    }

    // Palette blending: Deep space void -> Indigo -> Royal Violet -> Magenta -> Cyan -> Golden Core
    vec3 colVoid    = vec3(0.035, 0.028, 0.065); // #090710
    vec3 colIndigo  = vec3(0.11, 0.08, 0.26);   // #1C1442
    vec3 colViolet  = vec3(0.38, 0.12, 0.68);   // #611EAD
    vec3 colMagenta = vec3(0.72, 0.20, 0.80);   // #B833CC
    vec3 colCyan    = vec3(0.28, 0.82, 0.88);   // #47D1E0
    vec3 colGold    = vec3(0.96, 0.74, 0.28);   // #F5BC47
    vec3 colWhite   = vec3(1.0, 1.0, 1.0);

    // Layer colors
    vec3 col = colVoid;
    col = mix(col, colIndigo, smoothstep(1.25, 0.25, r) * 0.75);
    col += colViolet * arms * 1.35;
    col += colMagenta * pow(arms, 1.25) * 1.15;
    col += colCyan * smoothstep(0.48, 0.12, r) * gas * 0.4;
    col += colGold * pow(core, 1.35) * 0.75;
    col += colWhite * pow(core, 2.1) * 1.45;
    col += colCyan * star * 0.75;

    // Smooth edge vignette
    float vignette = smoothstep(1.5, 0.45, r);
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface CosmicWebGLGalaxyProps {
  shockwave?: { x: number; y: number; progress: number } | null;
}

export const CosmicWebGLGalaxy: React.FC<CosmicWebGLGalaxyProps> = ({ shockwave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionEnabled = useMotionStore((state) => state.motionEnabled);
  const shockwaveRef = useRef(shockwave);

  // Keep shockwave ref updated without triggering re-renders
  useEffect(() => {
    shockwaveRef.current = shockwave;
  }, [shockwave]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use WebGL with fallback
    const gl =
      canvas.getContext('webgl', {
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
      }) || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      console.warn('WebGL not supported on this device');
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const frag = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen Quad Buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uShockwave = gl.getUniformLocation(program, 'u_shockwave');

    const updateDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let animId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      gl.uniform1f(uTime, motionEnabled ? elapsed : 0);

      const sw = shockwaveRef.current;
      if (sw && sw.progress < 1) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        gl.uniform3f(
          uShockwave,
          sw.x * dpr,
          (window.innerHeight - sw.y) * dpr,
          sw.progress
        );
      } else {
        gl.uniform3f(uShockwave, 0, 0, 0);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animId);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buffer);
    };
  }, [motionEnabled]); // ONLY motionEnabled in dependency array! Program NEVER recreates on mouse move!

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{ width: '100vw', height: '100vh', display: 'block' }}
    />
  );
};
