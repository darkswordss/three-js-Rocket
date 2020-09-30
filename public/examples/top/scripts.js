var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 1000, window.innerWidth/window.innerHeight, 0.5, 2000 );
camera.position.z = 150;
camera.position.y=10;
camera.position.r


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
mtlLoader.setTexturePath('/examples/top/assets/');
mtlLoader.setPath('/examples/top/assets/');
mtlLoader.load('top.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/top/assets/');
    objLoader.load('top.obj', function (object) {

        scene.add(object);
        object.position.y -= 700;
        object.position.x -= 300;

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	camera.lookAt( scene.position );
	controls.update();
	renderer.render(scene, camera);
};

animate();