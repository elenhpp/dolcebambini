/* WebGL silk for the homepage.
   A single cloth mesh whose shape is driven by a handful of numbers (SilkState).
   Scroll tweens the state between chapter keyframes; the shader turns it into
   a billowing sheet, a twisting ribbon, and back again. */

export type SilkState = {
  spread: number;
  w: number;
  h: number;
  rh: number;
  x: number;
  y: number;
  rotX: number;
  rotZ: number;
  twist: number;
  amp: number;
  curve: number;
  tint: number;
  alpha: number;
};

export const KEYFRAMES = {
  open: {
    spread: 1,
    w: 1.3,
    h: 1.0,
    rh: 0.9,
    x: 0,
    y: 0.04,
    rotX: -0.22,
    rotZ: -0.05,
    twist: 0,
    amp: 0.9,
    curve: 0,
    tint: 0.05,
    alpha: 1,
  },
  coll: {
    spread: 0,
    w: 2.1,
    h: 0.9,
    rh: 0.75,
    x: 0,
    y: -0.36,
    rotX: 0,
    rotZ: 0.02,
    twist: 1.2,
    amp: 0.6,
    curve: 0.35,
    tint: 0.85,
    alpha: 1,
  },
  hero: {
    spread: 1,
    w: 1.25,
    h: 0.9,
    rh: 0.9,
    x: 0,
    y: 0.16,
    rotX: -0.28,
    rotZ: -0.07,
    twist: 0,
    amp: 1,
    curve: 0,
    tint: 0,
    alpha: 1,
  },
  state: {
    spread: 0,
    w: 1.9,
    h: 0.9,
    rh: 0.95,
    x: 0,
    y: 0.02,
    rotX: 0,
    rotZ: -0.3,
    twist: 2.2,
    amp: 0.75,
    curve: 0.55,
    tint: 0.25,
    alpha: 1,
  },
  years: {
    spread: 0,
    w: 1.9,
    h: 0.9,
    rh: 1.1,
    x: 0,
    y: -0.02,
    rotX: 0.1,
    rotZ: 0.3,
    twist: 3.4,
    amp: 0.8,
    curve: 0.9,
    tint: 0.45,
    alpha: 1,
  },
  finale: {
    spread: 1,
    w: 1.3,
    h: 0.85,
    rh: 0.9,
    x: 0,
    y: -0.24,
    rotX: -0.35,
    rotZ: 0.05,
    twist: 0,
    amp: 0.8,
    curve: 0,
    tint: 0.1,
    alpha: 1,
  },
} satisfies Record<string, SilkState>;

export type SilkFrame = {
  state: SilkState;
  time: number;
  velocity: number;
  pointer: { x: number; y: number; strength: number };
};

export type Silk = { render: (f: SilkFrame) => void; dispose: () => void };

type RGB = [number, number, number];
const hex = (h: string): RGB =>
  [1, 3, 5].map((i) => Number.parseInt(h.slice(i, i + 2), 16) / 255) as RGB;
const PAL = {
  a0: hex("#efcdc6"),
  b0: hex("#fbf2e9"), // blush → ivory
  a1: hex("#dde5ee"),
  b1: hex("#f9f3ec"), // pale sky → ivory
  sheen: hex("#e9b3a5"),
};
const mix3 = (a: RGB, b: RGB, t: number): RGB => a.map((v, i) => v + (b[i] - v) * t) as RGB;

const VERT = /* glsl */ `
  uniform float uTime, uSpread, uTwist, uAmp, uCurve, uRibbonH;
  uniform vec2 uSheet;
  uniform vec3 uMouse;
  varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vW; varying float vFold;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  vec3 shape(vec2 p){
    float t = uTime;
    float w = uSheet.x;
    float h = mix(uRibbonH, uSheet.y, uSpread);
    float x = p.x * w * 0.5;
    float ly = p.y * h * 0.5;

    // soft billows + slow drifting noise + pleats while it's a sheet
    float z = snoise(vec3(x * 0.32, ly * 0.32, t * 0.07)) * 0.6;
    z += sin(x * 1.05 + t * 0.42 + ly * 0.3) * 0.26;
    z += sin(x * 2.4 + sin(ly * 0.9 + t * 0.22) * 1.6) * 0.13 * uSpread;
    z *= uAmp;

    // hem drifts a little more than the top edge, like hanging cloth
    ly += uSpread * sin(x * 0.9 + t * 0.35) * 0.18 * smoothstep(0.2, -1.0, p.y);

    // ribbon centre line and twist around its length
    float cy = (1.0 - uSpread) * uCurve * sin(x * 0.5 + t * 0.16);
    float a = uTwist * (x * 0.26 + sin(t * 0.14) * 0.4);
    float y = cy + ly * cos(a) - z * sin(a);
    float zz = ly * sin(a) + z * cos(a);

    // the cloth lifts gently towards the cursor
    vec2 d = vec2(x, y) - uMouse.xy;
    float r2 = dot(d, d);
    zz += uMouse.z * exp(-r2 * 1.1) * 0.55;
    zz += uMouse.z * exp(-r2 * 0.6) * sin(sqrt(r2) * 4.5 - t * 2.2) * 0.05;
    return vec3(x, y, zz);
  }

  void main(){
    vec2 p = position.xy;
    float e = 0.012;
    vec3 P = shape(p);
    vec3 Px = shape(p + vec2(e, 0.0));
    vec3 Py = shape(p + vec2(0.0, e));
    vec3 dx = Px - P, dy = Py - P;
    vN = normalize(mat3(modelMatrix) * cross(dx, dy));
    vT = normalize(mat3(modelMatrix) * dx);
    vec4 wp = modelMatrix * vec4(P, 1.0);
    vW = wp.xyz; vUv = uv; vFold = P.z;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }`;

const FRAG = /* glsl */ `
  uniform vec3 uColA, uColB, uSheen;
  uniform float uAlpha;
  varying vec2 vUv; varying vec3 vN; varying vec3 vT; varying vec3 vW; varying float vFold;
  void main(){
    vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
    vec3 V = normalize(cameraPosition - vW);
    vec3 T = normalize(vT - N * dot(vT, N));
    vec3 L1 = normalize(vec3(-0.5, 0.8, 0.9));
    vec3 L2 = normalize(vec3(0.7, -0.25, 0.55));

    vec3 base = mix(uColA, uColB, smoothstep(-0.1, 1.1, vUv.x * 0.65 + vUv.y * 0.35 + vFold * 0.18));
    float d1 = dot(N, L1) * 0.5 + 0.5;
    float d2 = dot(N, L2) * 0.5 + 0.5;
    vec3 col = base * (0.66 + 0.34 * d1) + base * 0.08 * d2;

    // anisotropic silk highlights run across the weave
    float th1 = dot(T, normalize(L1 + V));
    float th2 = dot(T, normalize(L2 + V));
    float an1 = pow(sqrt(max(0.0, 1.0 - th1 * th1)), 80.0);
    float an2 = pow(sqrt(max(0.0, 1.0 - th2 * th2)), 36.0);
    col += vec3(1.0, 0.985, 0.96) * an1 * 0.32 + uSheen * an2 * 0.16;

    float fr = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += uSheen * fr * 0.22;
    col *= 0.93 + 0.07 * smoothstep(-0.6, 0.6, vFold);
    col += sin(vUv.x * 1600.0) * sin(vUv.y * 1100.0) * 0.006;
    gl_FragColor = vec4(col, uAlpha);
  }`;

/** Returns null when WebGL is unavailable; the page then falls back to a CSS gradient. */
export async function createSilk(canvas: HTMLCanvasElement): Promise<Silk | null> {
  try {
    const THREE = await import("three");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const small = innerWidth < 800;
    renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 10;
    const uniforms = {
      uTime: { value: 0 },
      uSpread: { value: 1 },
      uTwist: { value: 0 },
      uAmp: { value: 1 },
      uCurve: { value: 0 },
      uRibbonH: { value: 1 },
      uSheet: { value: new THREE.Vector2(10, 6) },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uAlpha: { value: 0 },
      uColA: { value: new THREE.Vector3(...PAL.a0) },
      uColB: { value: new THREE.Vector3(...PAL.b0) },
      uSheen: { value: new THREE.Vector3(...PAL.sheen) },
    };
    const geo = new THREE.PlaneGeometry(2, 2, small ? 150 : 240, small ? 90 : 150);
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let vw = 1,
      vh = 1;
    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      vh = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
      vw = vh * camera.aspect;
    };
    resize();
    addEventListener("resize", resize);

    const ray = new THREE.Raycaster(),
      ndc = new THREE.Vector2(),
      hit = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const render = ({ state: S, time, velocity, pointer }: SilkFrame) => {
      const u = uniforms;
      mesh.position.set(S.x * vw, S.y * vh, 0);
      mesh.rotation.set(S.rotX, 0, S.rotZ);
      mesh.updateMatrixWorld();
      ndc.set((pointer.x / innerWidth) * 2 - 1, -(pointer.y / innerHeight) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        mesh.worldToLocal(hit);
        u.uMouse.value.set(hit.x, hit.y, pointer.strength);
      }
      u.uTime.value = time;
      u.uSpread.value = S.spread;
      u.uTwist.value = S.twist;
      u.uAmp.value = S.amp * (1 + Math.min(Math.abs(velocity) * 0.01, 0.35));
      u.uCurve.value = S.curve;
      u.uRibbonH.value = S.rh;
      u.uSheet.value.set(Math.max(S.w * vw, 7), S.h * vh);
      u.uAlpha.value = S.alpha;
      u.uColA.value.set(...mix3(PAL.a0, PAL.a1, S.tint));
      u.uColB.value.set(...mix3(PAL.b0, PAL.b1, S.tint));
      renderer.render(scene, camera);
    };

    const dispose = () => {
      removeEventListener("resize", resize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };

    return { render, dispose };
  } catch (err) {
    console.warn("Silk disabled:", err);
    return null;
  }
}
