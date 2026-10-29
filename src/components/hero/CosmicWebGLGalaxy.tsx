import React, { useRef, useEffect } from 'react';
import { useMotionStore } from '../../store/useMotionStore';

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// True spiral galaxy: circular, seam-free FBM, proper core, real arms, no cursor reaction
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
    // ── Scroll-driven dynamics ───────────────────────────────────
    float scroll  = clamp(u_scroll, 0.0, 1.0);
    float speed   = 1.0 + scroll * 5.0;          // 1× → 6× rotation
    float scaleGal = 1.0 - scroll * 0.70;        // 1.0 → 0.30 (shrink)

    // Galaxy center: screen-centre at top, drifts slightly up as scroll increases
    // (so it converges toward figure head area)
    vec2 galCenterNorm = vec2(0.5, 0.5 - scroll * 0.14);
    vec2 galCenterPx   = galCenterNorm * u_resolution;

    // ── TRUE CIRCULAR UV (no aspect distortion → real circle) ────
    // Use min(w,h) as normaliser so galaxy is a circle in pixel space
    float minDim = min(u_resolution.x, u_resolution.y);
    vec2 uv = (gl_FragCoord.xy - galCenterPx) / (minDim * scaleGal);

    // ── Shockwave lens distortion ────────────────────────────────
    if (u_shockwave.z > 0.0) {
      vec2 wc = (u_shockwave.xy - galCenterPx) / (minDim * scaleGal);
      float d    = length(uv - wc);
      float wd   = u_shockwave.z * 1.2;
      float diff = d - wd;
      if (abs(diff) < 0.12) {
        float str = sin(diff * 22.0) * (1.0 - u_shockwave.z) * 0.032;
        uv += normalize(uv - wc) * str;
      }
    }

    float r     = length(uv);
    float theta = atan(uv.y, uv.x);            // used ONLY for arm pattern
    float rot   = u_time * 0.13 * speed;       // visible rotation, speeds up on scroll

    // ── SPIRAL ARMS (atan is fine here — cos(2×phi) is continuous) ─
    float kA  = 3.2;                                        // arm tightness
    float phi = theta - kA * log(max(r, 0.001)) + rot;     // log-spiral phase
    float arm = 0.5 + 0.5 * cos(phi * 2.0);               // 2-arm pattern
    arm       = pow(arm, 3.0);                              // sharpen arms

    // ── SEAM-FREE FBM: rotate cartesian UV, never use phi/theta ──
    // Rotating the input UV by 'rot' gives the nebula a sense of spin
    // without any atan discontinuity.
    float cr = cos(rot * 0.28), sr = sin(rot * 0.28);
    vec2 rotUV = vec2(cr * uv.x - sr * uv.y, sr * uv.x + cr * uv.y);
    float neb  = fbm(rotUV * 2.6 + vec2(0.3, 0.7));
    float neb2 = fbm(rotUV * 1.4 + vec2(1.2, -0.9)) * 0.55;
    float nebTotal = clamp(neb + neb2, 0.0, 1.0);

    // ── RADIAL ENVELOPE ──────────────────────────────────────────
    // Nothing in the very centre, fade out at ~radius 0.9
    float rEnv = smoothstep(0.02, 0.20, r) * smoothstep(1.0, 0.12, r);

    // Combined arm brightness
    float armBright = arm * nebTotal * rEnv;

    // Soft dust lanes between arms
    float dust = 0.5 + 0.5 * cos(phi * 2.0 + 3.14159);
    dust = pow(dust, 2.5) * nebTotal * rEnv * 0.25;

    // ── GALACTIC CORE ────────────────────────────────────────────
    float core     = exp(-r * 10.0) * 4.0;
    float coreHalo = exp(-r *  3.8) * 1.0;
    float rays     = max(0.0, cos(theta * 6.0 + rot * 1.6)) * exp(-r * 6.0) * 0.5;

    // ── GLOBAL GLOW / DISK HAZE ──────────────────────────────────
    float diskHaze = exp(-r * r * 2.5) * 0.45;          // soft gaussian disk
    float outerGlow = smoothstep(1.05, 0.15, r) * 0.18;  // very faint outer glow

    // ── STAR FIELD ───────────────────────────────────────────────
    // Fine stars
    vec2 sv = uv * 130.0;
    float sg = hash21(floor(sv));
    float star = 0.0;
    if (sg > 0.976) {
      float tw = 0.5 + 0.5 * sin(u_time * 3.0 + sg * 78.5);
      star = smoothstep(0.42, 0.0, length(fract(sv) - 0.5)) * tw
             * (1.0 - smoothstep(0.0, 1.1, r));
    }
    // Medium stars
    vec2 sv2 = uv * 58.0 + vec2(17.3, 42.1);
    float sg2 = hash21(floor(sv2));
    float star2 = 0.0;
    if (sg2 > 0.937) {
      float tw2 = 0.3 + 0.3 * sin(u_time * 1.7 + sg2 * 31.4);
      star2 = smoothstep(0.46, 0.0, length(fract(sv2) - 0.5)) * tw2 * 0.5
              * (1.0 - smoothstep(0.0, 1.2, r));
    }
    // Distant background star haze
    vec2 sv3 = uv * 220.0 + vec2(-5.1, 9.7);
    float sg3 = hash21(floor(sv3));
    float star3 = 0.0;
    if (sg3 > 0.991) {
      star3 = smoothstep(0.48, 0.0, length(fract(sv3) - 0.5)) * 0.35
              * (1.0 - smoothstep(0.0, 1.5, r));
    }

    // ── COLOUR PALETTE ───────────────────────────────────────────
    vec3 cVoid    = vec3(0.025, 0.016, 0.050);  // deepest dark
    vec3 cIndigo  = vec3(0.09,  0.06,  0.22);
    vec3 cViolet  = vec3(0.32,  0.08,  0.60);
    vec3 cMagenta = vec3(0.68,  0.16,  0.78);
    vec3 cCyan    = vec3(0.22,  0.78,  0.88);
    vec3 cGold    = vec3(0.98,  0.80,  0.30);
    vec3 cWhite   = vec3(1.0,   0.97,  0.95);

    vec3 col = cVoid;

    // Background indigo haze grows toward centre
    col = mix(col, cIndigo, smoothstep(1.1, 0.15, r) * 0.6);

    // Disk haze — subtle purple glow across the whole galaxy
    col += cIndigo * diskHaze;
    col += cVoid   * outerGlow;

    // Spiral arms: violet inner → cyan outer
    vec3 armCol = mix(cViolet, cCyan, clamp(r * 1.5, 0.0, 1.0));
    col += armCol * armBright * 1.7;
    col += cMagenta * pow(armBright, 1.8) * 1.1;

    // Dust lanes dim the between-arm void
    col -= cIndigo * dust;

    // Core: gold warm halo + white-hot centre + diffraction rays
    col += cGold  * coreHalo * 1.0;
    col += cGold  * rays     * 0.7;
    col += cWhite * core     * 1.4;

    // Stars
    col += cWhite * star  * 1.2;
    col += cWhite * star2 * 0.65;
    col += cWhite * star3 * 0.9;

    // ── VIGNETTE: smooth circle falloff (makes it look spherical) ─
    col *= smoothstep(1.08, 0.22, r);

    // ── TONE MAP & GAMMA ─────────────────────────────────────────
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
