var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z =2;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(0,0%,100%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(22,83%,38%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);
scene.background = new THREE.Color( 0xffffff );

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/assets/');
mtlLoader.setPath('/assets/');
mtlLoader.load('Parachute.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/assets/');
    objLoader.load('model.dae.obj', function (object) {

        scene.add(object);
        object.position.y -= 0;

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();