import * as THREE from 'three';

const canvas = document.createElement('canvas');
canvas.id = 'snow';
canvas.height = 800;
canvas.width = 1000;

const container = document.getElementById('container');
container.appendChild(canvas);


var scene = new THREE.Scene();

// var starsGeometry = new THREE.Geometry();
// for ( var i = 0; i < 10000; i ++ ) {
// 	var star = new THREE.Vector3();
// 	star.x = THREE.Math.randFloatSpread( 2000 );
// 	star.y = THREE.Math.randFloatSpread( 2000 );
// 	star.z = THREE.Math.randFloatSpread( 2000 );
//
// 	starsGeometry.vertices.push( star );
//
// }
// var starsMaterial = new THREE.PointsMaterial( { color: 0xffffff, size: 5.0 } );
// var starField = new THREE.Points( starsGeometry, starsMaterial );
// scene.add( starField );

var starGeo = new THREE.SphereGeometry(2, 32, 32);
var starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

for ( let i = 0; i < 1000; i++) {
  var star = new THREE.Mesh( starGeo, starMat );
  star.position.x = THREE.Math.randFloatSpread( 2000 );
  star.position.y = THREE.Math.randFloatSpread( 2000 );
  star.position.z = THREE.Math.randFloatSpread( 2000 );

  scene.add( star );
}


var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer({canvas: canvas});

// function animate() {
// 	requestAnimationFrame( animate );
//
//
// }
// animate();

renderer.render( scene, camera );
