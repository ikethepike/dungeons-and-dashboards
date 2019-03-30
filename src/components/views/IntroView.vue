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
    light: null,
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
      this.die.rotation.y += 0.01;
      this.die.rotation.x += 0.001;
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    // Let's emit an event on completion
    // Let's instantiate a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Let's create a scene
    this.scene = new THREE.Scene();

    // Use orthographic camera to not deal with any FOV distortion
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.light = new THREE.SpotLight(0xffffff);
    this.light.position.z = 5;

    // Let's bind the viewport to current dimensions
    this.updateViewport();

    // Create the canvas
    this.$refs.intro.appendChild(this.renderer.domElement);

    // Let's place the camera
    this.camera.position.z = 5;

    // Let's create our die
    this.die = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry(1),
      new THREE.MeshLambertMaterial({ color: 0xd64541 })
    );

    this.die.position.z = -1;

    // Add our lighting
    this.scene.add(this.light)

    // Throw the dice into the scene
    this.scene.add(this.die);

    this.render();
  }
};
</script>
