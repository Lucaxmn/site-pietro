import * as THREE from 'three';

export function initDumbbell(canvas) {
  if (!canvas) return { destroy() {} };

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  function makeEnvTexture() {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 256;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#05060a");
    g.addColorStop(0.45, "#0a1230");
    g.addColorStop(0.5, "#2a5bff");
    g.addColorStop(0.55, "#0a1230");
    g.addColorStop(1, "#020308");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const r = ctx.createRadialGradient(180, 70, 5, 180, 70, 120);
    r.addColorStop(0, "rgba(90,150,255,0.9)");
    r.addColorStop(1, "rgba(90,150,255,0)");
    ctx.fillStyle = r;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    return tex;
  }
  const envTex = makeEnvTexture();
  scene.environment = envTex;

  const metalDark = new THREE.MeshStandardMaterial({
    color: 0x16181d, metalness: 1.0, roughness: 0.28, envMap: envTex, envMapIntensity: 1.3,
  });
  const metalMid = new THREE.MeshStandardMaterial({
    color: 0x23262d, metalness: 1.0, roughness: 0.35, envMap: envTex, envMapIntensity: 1.2,
  });
  const blueEmissive = new THREE.MeshStandardMaterial({
    color: 0x0a1230, metalness: 0.9, roughness: 0.25,
    emissive: 0x1e50ff, emissiveIntensity: 1.4, envMap: envTex, envMapIntensity: 1.1,
  });

  const dumbbell = new THREE.Group();
  const seg = isMobile ? 32 : 64;

  const barLen = 5.2;
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, barLen, seg), metalMid);
  bar.rotation.z = Math.PI / 2;
  dumbbell.add(bar);

  const gripMat = new THREE.MeshStandardMaterial({ color: 0x101216, metalness: 0.9, roughness: 0.6, envMap: envTex, envMapIntensity: 0.8 });
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 1.8, seg), gripMat);
  grip.rotation.z = Math.PI / 2;
  dumbbell.add(grip);

  function buildSide(dir) {
    const g = new THREE.Group();
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.5, seg), metalDark);
    collar.rotation.z = Math.PI / 2;
    collar.position.x = dir * (barLen / 2 - 0.5);
    g.add(collar);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.045, 16, seg), blueEmissive);
    ring.position.x = dir * (barLen / 2 - 0.25);
    ring.rotation.y = Math.PI / 2;
    g.add(ring);

    const plates = [
      { r: 1.55, w: 0.42, x: 0.55 },
      { r: 1.25, w: 0.40, x: 0.98 },
      { r: 0.95, w: 0.38, x: 1.38 },
    ];
    plates.forEach((p, i) => {
      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(p.r, p.r, p.w, seg, 1, false),
        i % 2 === 0 ? metalDark : metalMid
      );
      plate.rotation.z = Math.PI / 2;
      plate.position.x = dir * (barLen / 2 - 0.7 + p.x);
      g.add(plate);

      if (i === 0) {
        const edge = new THREE.Mesh(new THREE.TorusGeometry(p.r - 0.04, 0.03, 12, seg), blueEmissive);
        edge.position.x = dir * (barLen / 2 - 0.7 + p.x - p.w / 2);
        edge.rotation.y = Math.PI / 2;
        g.add(edge);
      }
    });

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.3, seg), metalDark);
    cap.rotation.z = Math.PI / 2;
    cap.position.x = dir * (barLen / 2 + 1.05);
    g.add(cap);
    return g;
  }
  dumbbell.add(buildSide(1));
  dumbbell.add(buildSide(-1));

  dumbbell.scale.set(0.6, 0.6, 0.6);
  dumbbell.rotation.x = -0.35;
  dumbbell.rotation.y = -0.5;
  scene.add(dumbbell);

  scene.add(new THREE.AmbientLight(0x223055, 0.6));

  const keyBlue = new THREE.PointLight(0x2f6bff, 600, 60);
  keyBlue.position.set(-6, 4, 6);
  scene.add(keyBlue);

  const rimBlue = new THREE.PointLight(0x3a78ff, 400, 60);
  rimBlue.position.set(7, -3, -4);
  scene.add(rimBlue);

  const white = new THREE.DirectionalLight(0xffffff, 1.1);
  white.position.set(3, 6, 8);
  scene.add(white);

  const fill = new THREE.PointLight(0x88aaff, 120, 40);
  fill.position.set(0, -6, 4);
  scene.add(fill);

  let targetRotX = -0.35, targetRotY = -0.5;
  let scrollRot = 0;
  let mouseX = 0, mouseY = 0;

  function onPointer(e) {
    const t = e.touches ? e.touches[0] : e;
    mouseX = (t.clientX / window.innerWidth) * 2 - 1;
    mouseY = (t.clientY / window.innerHeight) * 2 - 1;
  }
  window.addEventListener("mousemove", onPointer, { passive: true });
  window.addEventListener("touchmove", onPointer, { passive: true });

  function onScroll() {
    scrollRot = window.scrollY * 0.0018;
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement || canvas);
  resize();

  let raf;
  const idleSpeed = isMobile ? 0.0025 : 0.0035;
  function animate() {
    raf = requestAnimationFrame(animate);
    targetRotY = -0.5 + mouseX * 0.6 + scrollRot;
    targetRotX = -0.35 + mouseY * 0.35;
    dumbbell.rotation.y += (targetRotY - dumbbell.rotation.y) * 0.06 + idleSpeed;
    dumbbell.rotation.x += (targetRotX - dumbbell.rotation.x) * 0.06;
    renderer.render(scene, camera);
  }
  animate();

  return {
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onPointer);
      window.removeEventListener("touchmove", onPointer);
      window.removeEventListener("scroll", onScroll);

      const disposedMaterials = new Set();
      const disposedTextures = new Set();
      scene.traverse(obj => {
        if (!obj.isMesh) return;
        obj.geometry && obj.geometry.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach(material => {
          if (!material || disposedMaterials.has(material)) return;
          Object.values(material).forEach(value => {
            if (value && value.isTexture && !disposedTextures.has(value)) {
              value.dispose();
              disposedTextures.add(value);
            }
          });
          material.dispose();
          disposedMaterials.add(material);
        });
      });

      renderer.dispose();
    },
  };
}
