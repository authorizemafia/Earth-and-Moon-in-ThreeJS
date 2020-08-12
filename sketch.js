
global.THREE = require("three");

require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {

  
  animate: true,
  
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  
  renderer.setClearColor("black", 1);

  
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(3, 3, -5);
  camera.lookAt(new THREE.Vector3());

  
  const controls = new THREE.OrbitControls(camera, context.canvas);


  const scene = new THREE.Scene();

  
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader = new THREE.TextureLoader()
  const earthTexture = loader.load("earth.jpg");
  const moonTexture = loader.load("moon.jpg");


  const material = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: earthTexture
  
    
  });



  const moonGroup = new THREE.Group();
  const moonMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: moonTexture

  });


  
  const mesh = new THREE.Mesh(geometry, material,);
  scene.add(mesh);


  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.position.set(1.5, 1, 0);
  moonMesh.scale.setScalar(0.25);
  moonGroup.add(moonMesh);

  scene.add(moonGroup);

  const light = new THREE.PointLight("white", 1);
  light.position.set(2, 2,2);
  moonGroup.add(light);


  
  return {

    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
  
    render({ time }) {
      mesh.rotation.y = time * 0.25;
      moonMesh.rotation.y = time * 0.20;
      moonGroup.rotation.y = time * 0.90;
      controls.update();
      renderer.render(scene, camera);
    },

    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
