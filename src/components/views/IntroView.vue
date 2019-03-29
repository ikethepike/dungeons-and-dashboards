<template>
  <div id="intro-view" ref="intro"></div>
</template>
<script>
// Imports
// -- Three
import * as THREE from "three";

export default {
  data: () => ({
    // Three objects
    die: null,
    scene: null,
    camera: null,
    renderer: null
  }),
  methods: {
    updateViewport() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    render() {
      requestAnimationFrame(this.render); // Let's loop it
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    // Let's emit an event on completion
    // Let's instantiate a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    // Let's create a scene
    this.scene = new THREE.Scene();

    // Use orthographic camera to not deal with any FOV distortion
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);

    // Let's bind the viewport to current dimensions
    this.updateViewport();

    // Create the canvas
    this.$refs.intro.appendChild(this.renderer.domElement);

    // Let's place the camera
    this.camera.position.z = 1;

    // Let's create our die
    this.die = new THREE.Mesh(
      new THREE.IcosahedronGeometry({ radius: 0.5 }),
      new THREE.MeshBasicMaterial({ color: 0xd64541 })
    );

    // Throw the dice into the scene
    this.scene.add(this.die);

    this.render()
  }
};
</script>
