var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 1000, window.innerWidth/window.innerHeight, 0.5, 4000 );
camera.position.z = 1500;



var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;
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
mtlLoader.load('texturecheck.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/assets/');
    objLoader.load('texturecheck.obj', function (object) {

        scene.add(object);
        object.position.y -= 100;
        object.position.x -= 200;

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	camera.lookAt( scene.position );
	controls.update();
	renderer.render(scene, camera);
};

animate();