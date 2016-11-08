const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const SHADOW_MAP_WIDTH = 1024, SHADOW_MAP_HEIGHT = 1024;

const container = document.createElement('div');

const camera = new THREE.PerspectiveCamera(25, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000);
camera.position.set(2000, 500, 1800);

cameraTarget = new THREE.Vector3();
cameraTarget.z = -1000;
cameraTarget.y = 0;

camera.lookAt(cameraTarget);

const controls = new THREE.TrackballControls(camera);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [65, 83, 68];
controls.addEventListener('change', render);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 3000, 100000);
scene.fog.color.setHSL(0.51, 0.6, 0.6);

ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2);
spotLight.position.set(0, 1800, 1500);
spotLight.target.position.set(0, 0, 0);
spotLight.castShadow = true;

spotLight.shadow.camera.near = 100;
spotLight.shadow.camera.far = camera.far;
spotLight.shadow.camera.fov = 50;

spotLight.shadow.bias = -0.00125;
spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

scene.add(spotLight);

// RENDERER

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setClearColor(scene.fog.color);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
container.appendChild(renderer.domElement);
document.body.appendChild(container);

let cubeCamera2;
let material2;
let meshCar;
let wheelFL;

const textureLoader = new THREE.TextureLoader();
textureLoader.load(
    //'https://kjunichi.github.io/kjunichi.github.com/test/threejs/textures/waternormals.jpg'
    './setobridge.jpg'
    , (texture) => {
        texture.mapping = THREE.UVMapping;
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(10000, 10000, 15000, 24, 24, true), new THREE.MeshBasicMaterial({ map: texture }));
        mesh.scale.x = -1;
        scene.add(mesh);

        const mesh2 = new THREE.Mesh(new THREE.PlaneGeometry(40000, 40000, 24, 24), new THREE.MeshBasicMaterial({ map: texture }));
        //mesh2.scale.x = -1;
        mesh2.rotation.x = Math.PI / 2.0;
        mesh2.position.y = 10000;
        scene.add(mesh2);

        const mesh3 = new THREE.Mesh(new THREE.PlaneGeometry(40000, 40000, 64, 64), new THREE.MeshBasicMaterial({ map: texture }));
        mesh3.scale.x = -1;
        mesh3.rotation.x = Math.PI / 2.0;
        mesh3.position.y = -10000;
        scene.add(mesh3);

        const cubeCamera = new THREE.CubeCamera(1, 1000, 256);
        cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
        scene.add(cubeCamera);
        cubeCamera2 = new THREE.CubeCamera(1, 19000, 256);
        cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
        scene.add(cubeCamera2);
        //1つ目のcubeCameraには屈折マッピングを適用
        cubeCamera.renderTarget.mapping = THREE.CubeRefractionMapping;
        const material = new THREE.MeshBasicMaterial({
            color: 0xf0f0ff, //色
            envMap: cubeCamera.renderTarget, //屈折マッピングにしたcubeCameraで作成した環境マッピングを適用
            refractionRatio: 0.75, //屈折率
        });
        //２つ目は通常のマッピング(反射マッピング)
        material2 = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            envMap: cubeCamera2.renderTarget.texture, //反射マッピングのcubeCameraで作成した環境マッピングを適用
            reflectivity: 1, //反射率
            opacity: 0.3, //不透明度で反射具合を調整
            transparent: true //透明を有効に
        });

        const loader2 = new THREE.JSONLoader();
        
        //loader2 = new THREE.JSONLoader();
        let wheelFRMesh;
        let wheelFLMesh;
        let wheelRRMesh;
        let wheelRLMesh;
        let bodyMesh;
        
        const frontRightWheelRoot = new THREE.Object3D();
        const frontLeftWheelRoot = new THREE.Object3D();
        const rearRightWheelRoot = new THREE.Object3D();
        const rearLeftWheelRoot = new THREE.Object3D();

        function loadWheel() {
            const delta = new THREE.Vector3();
            loader2.load('obj/fordFR.json', (geometry, materials) => {
                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                geometry.computeBoundingBox();
                const mat = new THREE.MeshFaceMaterial(materials);
                const bb = geometry.boundingBox;
                const wheelOffset = new THREE.Vector3();
                wheelOffset.addVectors(bb.min, bb.max);
                wheelOffset.multiplyScalar(0.5);
                geometry.center();
                wheelFRMesh = new THREE.Mesh(geometry, mat);
                frontRightWheelRoot.add(wheelFRMesh);
                frontRightWheelRoot.position.add(wheelOffset);
                wheelFLMesh = new THREE.Mesh(geometry, mat);
                delta.multiplyVectors(wheelOffset, new THREE.Vector3(-1, 1, 1));
                //wheelFLMesh.position.add(delta);
                wheelFLMesh.rotation.z = Math.PI;
                frontLeftWheelRoot.add(wheelFLMesh);
                frontLeftWheelRoot.position.add(delta);
                createCar();
            });
            loader2.load('obj/fordRR.json', (geometry, materials) => {
                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                geometry.computeBoundingBox();
                const bb = geometry.boundingBox;
                const wheelOffset = new THREE.Vector3();
                wheelOffset.addVectors(bb.min, bb.max);
                wheelOffset.multiplyScalar(0.5);
                geometry.center();
                const mat = new THREE.MeshFaceMaterial(materials);
                wheelRRMesh = new THREE.Mesh(geometry, mat);
                rearRightWheelRoot.add(wheelRRMesh);
                rearRightWheelRoot.position.add(wheelOffset);
                wheelRLMesh = new THREE.Mesh(geometry, mat);
                delta.multiplyVectors(wheelOffset, new THREE.Vector3(-1, 1, 1));
                //wheelFLMesh.position.add(delta);
                wheelRLMesh.rotation.z = Math.PI;
                rearLeftWheelRoot.add(wheelRLMesh);
                rearLeftWheelRoot.position.add(delta);
                createCar();
            });
        
        }
        function loadBody(){
             loader2.load('obj/fordBody.json', (geometry, materials) => {
                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                const mat = new THREE.MeshFaceMaterial(materials);
                bodyMesh = new THREE.Mesh(geometry, mat);
                createCar();
            });
        }
        function createCar() {
            //console.log(wheelFRMesh, wheelRRMesh , bodyMesh)
            if(wheelFRMesh && wheelRRMesh && bodyMesh) {
                console.log("createCar");
                let root = new THREE.Object3D();
                root.add(frontRightWheelRoot);
                root.add(frontLeftWheelRoot);
                root.add(rearRightWheelRoot);
                root.add(rearLeftWheelRoot);
                root.add(bodyMesh);
                scene.add(root);
            }
        }
        loadWheel();
        loadBody();

        
    });
animate();

function render() {
    renderer.setClearColor(scene.fog.color);
    //meshCar.visible = false;
    material2.envMap = cubeCamera2.renderTarget.texture;
    if (cubeCamera2) {
        cubeCamera2.updateCubeMap(renderer, scene);
    }
    //wheelFL.rotation.x += 0.1;
    //meshCar.visible = true;
    renderer.render(scene, camera);
}

function animate() {

    requestAnimationFrame(animate);

    render();
    controls.update();

}