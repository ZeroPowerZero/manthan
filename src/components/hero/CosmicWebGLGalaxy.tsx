import React, { useRef, useEffect } from 'react';
import { useMotionStore } from '../../store/useMotionStore';

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// True spiral galaxy: circular, seam-free FBM, calm majestic rotation,
// scrolls smoothly down to the head of the meditating figure
const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2  u_resolution;
  uniform float u_time;
  uniform float u_scroll;    // 0 = top, 1 = fully scrolled
  uniform vec3  u_shockwave; // x, y, progress

  // ── Noise helpers ────────────────────────────────────────────────
  float hash21(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i),           b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // FBM on CARTESIAN coords — never uses atan so no seam
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = m * p; a *= 0.5; }
    return v;
  }

  void main() {
    float scroll     = clamp(u_scroll, 0.0, 1.0);
    float easeScroll = smoothstep(0.0, 1.0, scroll);

    // ── Rotation: STEADY & CALM (NOT fast on scroll) ───────────────
    // User requested "not fast rotation" — steady, serene cosmic spin
    float rot = u_time * 0.085;

    // ── Head Anchor Calculation ───────────────────────────────────
    float vmin = min(u_resolution.x, u_resolution.y);

    // Figure size in pixels: min(0.72 * vmin, 680.0)
    float figSize = min(vmin * 0.72, 680.0);

    // Head centroid is ~17.0% from top of figure square (offset from center is 0.332)
    float headOffsetPx = figSize * 0.332;

    // CSS float synchronization: 6s cycle, 0 -> 18px -> 0
    // Upwards in CSS is +Y in WebGL
    float floatPx = 9.0 * (1.0 - cos(u_time * 1.0471975));

    // Head position in WebGL pixel coordinates:
    vec2 headPosPx = vec2(
      u_resolution.x * 0.5,
      u_resolution.y * 0.5 + headOffsetPx + floatPx
    );

    // Center starts at screen center (0.5, 0.5) and converges to headPosPx
    vec2 startCenterPx = u_resolution * 0.5;
    vec2 galCenterPx   = mix(startCenterPx, headPosPx, easeScroll);

    // ── Scale: Shrinks from full screen down to head/halo size ─────
    // 1.0 at scroll=0  -->  0.13 at scroll=1 (tight crown halo right at head)
    float scaleGal = mix(1.0, 0.13, easeScroll);

    // ── Circular coordinate relative to galaxy center ─────────────
    vec2 uv = (gl_FragCoord.xy - galCenterPx) / (vmin * scaleGal);

    // ── Shockwave lens distortion (clicks) ────────────────────────
    if (u_shockwave.z > 0.0) {
      vec2 wc = (u_shockwave.xy - galCenterPx) / (vmin * scaleGal);
      float d    = length(uv - wc);
      float wd   = u_shockwave.z * 1.2;
      float diff = d - wd;
      if (abs(diff) < 0.12) {
        float str = sin(diff * 22.0) * (1.0 - u_shockwave.z) * 0.032;
        uv += normalize(uv - wc) * str;
      }
    }

    float r     = length(uv);
    float theta = atan(uv.y, uv.x);

    // ── Spiral Arms (continuous log-spiral) ────────────────────────
    float kA  = 3.2;
    float phi = theta - kA * log(max(r, 0.001)) + rot;
    float arm = 0.5 + 0.5 * cos(phi * 2.0);
    arm       = pow(arm, 3.0);

    // ── Seam-free FBM on rotated Cartesian coords ─────────────────
    float cr = cos(rot * 0.28), sr = sin(rot * 0.28);
    vec2 rotUV = vec2(cr * uv.x - sr * uv.y, sr * uv.x + cr * uv.y);
    float neb  = fbm(rotUV * 2.6 + vec2(0.3, 0.7));
    float neb2 = fbm(rotUV * 1.4 + vec2(1.2, -0.9)) * 0.55;
    float nebTotal = clamp(neb + neb2, 0.0, 1.0);

    // ── Radial Envelope of Galaxy ─────────────────────────────────
    float rEnv = smoothstep(0.02, 0.20, r) * smoothstep(1.0, 0.12, r);
    float armBright = arm * nebTotal * rEnv;

    // Dust lanes
    float dust = 0.5 + 0.5 * cos(phi * 2.0 + 3.14159);
    dust = pow(dust, 2.5) * nebTotal * rEnv * 0.25;

    // ── Core & Halo ───────────────────────────────────────────────
    float corePower = 4.0 + easeScroll * 2.0;
    float core     = exp(-r * 9.5) * corePower;
    float coreHalo = exp(-r * 3.8) * 1.1;
    float rays     = max(0.0, cos(theta * 6.0 + rot * 1.6)) * exp(-r * 6.0) * 0.5;

    // Disk haze
    float diskHaze  = exp(-r * r * 2.5) * 0.45;
    float outerGlow = smoothstep(1.05, 0.15, r) * 0.18;

    // ── Galaxy Star Cluster (scales with galaxy) ──────────────────
    vec2 sv = uv * 125.0;
    float sg = hash21(floor(sv));
    float star = 0.0;
    if (sg > 0.976) {
      float tw = 0.5 + 0.5 * sin(u_time * 2.8 + sg * 78.5);
      star = smoothstep(0.42, 0.0, length(fract(sv) - 0.5)) * tw * (1.0 - smoothstep(0.0, 1.1, r));
    }

    vec2 sv2 = uv * 55.0 + vec2(17.3, 42.1);
    float sg2 = hash21(floor(sv2));
    float star2 = 0.0;
    if (sg2 > 0.938) {
      float tw2 = 0.3 + 0.3 * sin(u_time * 1.7 + sg2 * 31.4);
      star2 = smoothstep(0.46, 0.0, length(fract(sv2) - 0.5)) * tw2 * 0.5 * (1.0 - smoothstep(0.0, 1.2, r));
    }

    // ── Palette ───────────────────────────────────────────────────
    vec3 cVoid    = vec3(0.055, 0.047, 0.080); // matches #17141F bg-midnight after tonemap
    vec3 cIndigo  = vec3(0.10,  0.07,  0.24);
    vec3 cViolet  = vec3(0.34,  0.09,  0.62);
    vec3 cMagenta = vec3(0.70,  0.18,  0.80);
    vec3 cCyan    = vec3(0.24,  0.80,  0.90);
    vec3 cGold    = vec3(0.98,  0.82,  0.34);
    vec3 cWhite   = vec3(1.0,   0.98,  0.96);

    // ── Base space across entire screen ───────────────────────────
    vec3 col = cVoid;

    // Ambient distant stars (screen-space, persistent across full screen)
    vec2 screenUV = gl_FragCoord.xy / vmin;
    vec2 bgSv = screenUV * 75.0;
    float bgSg = hash21(floor(bgSv));
    if (bgSg > 0.982) {
      float tw = 0.4 + 0.4 * sin(u_time * 1.6 + bgSg * 42.0);
      float bgStar = smoothstep(0.42, 0.0, length(fract(bgSv) - 0.5)) * tw * 0.55;
      col += vec3(0.85, 0.88, 1.0) * bgStar;
    }

    // ── Galaxy Body Composition ───────────────────────────────────
    vec3 armCol = mix(cViolet, cCyan, clamp(r * 1.5, 0.0, 1.0));
    vec3 galCol = vec3(0.0);

    galCol += cIndigo * (diskHaze * 1.3 + outerGlow);
    galCol += armCol * armBright * 1.75;
    galCol += cMagenta * pow(armBright, 1.8) * 1.15;
    galCol -= cIndigo * dust;
    galCol += cGold  * coreHalo * 1.05;
    galCol += cGold  * rays     * 0.70;
    galCol += cWhite * core     * 1.45;
    galCol += cWhite * star  * 1.2;
    galCol += cWhite * star2 * 0.7;

    // Radial spherical falloff mask for galaxy body
    float galMask = smoothstep(1.05, 0.20, r);

    // Ambient space glow near galaxy
    col += mix(cVoid, cIndigo, smoothstep(1.3, 0.15, r) * 0.5) * galMask;

    // Add galaxy
    col += galCol * galMask;

    // ── Tone mapping & Gamma ──────────────────────────────────────
    col = col / (col + 0.80);
    col = pow(max(col, 0.0), vec3(0.88));

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface CosmicWebGLGalaxyProps {
  shockwave?: { x: number; y: number; progress: number } | null;
  scrollProgress?: number; // 0–1
}

export const CosmicWebGLGalaxy: React.FC<CosmicWebGLGalaxyProps> = ({
  shockwave,
  scrollProgress = 0,
}) => {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const motionEnabled = useMotionStore((s) => s.motionEnabled);

  // Live refs so the rAF loop always sees fresh values without restarting
  const swRef     = useRef(shockwave);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => { swRef.current = shockwave; },        [shockwave]);
  useEffect(() => { scrollRef.current = scrollProgress; }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      powerPreference: 'high-performance',
      alpha: false,
    }) as WebGLRenderingContext | null;
    if (!gl) { console.warn('WebGL unavailable'); return; }

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s)); gl.deleteShader(s); return null;
      }
      return s;
    };

    const vert = mkShader(gl.VERTEX_SHADER,   VERTEX_SHADER);
    const frag = mkShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vert || !frag) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert); gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog)); return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes    = gl.getUniformLocation(prog, 'u_resolution');
    const uTime   = gl.getUniformLocation(prog, 'u_time');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');
    const uSW     = gl.getUniformLocation(prog, 'u_shockwave');

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width  = Math.floor(innerWidth  * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    const t0 = performance.now();

    const render = (now: number) => {
      const elapsed = (now - t0) * 0.001;
      gl.uniform1f(uTime,   motionEnabled ? elapsed : 0.5);
      gl.uniform1f(uScroll, scrollRef.current);

      const sw = swRef.current;
      if (sw && sw.progress < 1) {
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        gl.uniform3f(uSW, sw.x * dpr, (innerHeight - sw.y) * dpr, sw.progress);
      } else {
        gl.uniform3f(uSW, 0, 0, 0);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [motionEnabled]); // never restarts on scroll / shockwave changes

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};
