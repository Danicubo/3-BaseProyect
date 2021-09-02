    //Importaciones
    import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
    import * as dat from 'dat.gui';
    import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

    // Arreglos de Objetos
    const objectsCube = [];
    const objectsSphere = [];
    const objectsLigths = [];

    //Variables Generales
    let contCube = undefined;
    let contSphere = 0;
    let guiFolderCube = 1;
    let guiFolderSphere = 1;
    let plane;
    let size = 0;
    let gui = undefined;
    const objects = {};
    let spotLight;

    // Paleta de colores
    const palette = {
        bgColor: '#60a3bc',
        Light: '0xffffff'
    };

    //Configuración Escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    );
    const renderer = new THREE.WebGLRenderer();

    //Ajuste Pantalla
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, true);
    };

    //Funcion Reset
    export function reset() {
        scene.children = [];
        renderer.setSize(0, 0);
        contCube = 0;
        contSphere = 0;
        guiFolderSphere = 1;
        guiFolderCube = 1;
    }

    //Funcion Principal
    export function main(optionSize) {

        reset();

        //Configuración inicial
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.setClearColor(palette.bgColor, 1);
        document.body.appendChild(renderer.domElement);

        camera.position.z = 15;
        camera.position.y = 15;

        // Controls
        new OrbitControls(camera, renderer.domElement);

        //Plano por defecto

        defaultPlane(optionSize)

        // GUI
        loadGUI();

        console.log(objects);

        // Animate
        animate();
    }

    //Funcion Crear Plano Default

    function defaultPlane(size) {
        const geometry = new THREE.PlaneGeometry(size, size, size, size);
        const material = new THREE.MeshPhongMaterial({
            color: '#d3d3d3',
            side: THREE.DoubleSide,
            wireframe: false
        });
        plane = new THREE.Mesh(geometry, material);
        plane.castShadow = true;
        plane.receiveShadow = true;

        scene.add(plane);
        objects.plano = plane;
        plane.rotation.x = Math.PI / 2;
    }

    //Funcion Crear SpotLigh

    export function createSpotlightGeneric() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);

        spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(0, 10, 0);
        spotLight.angle = Math.PI / 10;
        spotLight.penumbra = 0.1;
        spotLight.decay = 2;
        spotLight.distance = 200;

        spotLight.castShadow = true;

        objectsLigths.push(spotLight);
        spotLight.GUIlights = _lightsObject();
        _createSpotlightGUI(spotLight.GUIlights);

        scene.add(spotLight);
    }

    //Funcio Crear AmbientLight
    export function createAmbietLightGeneric() {
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        objectsLigths.push(ambientLight);
        ambientLight.GUIlights = _lightsObject();
        _createAmbientLightGUI(ambientLight.GUIlights);
    }

    export function createPointLightGeneric() {
        const pointLight = new THREE.PointLight(0xff0000, 1, 100);
        pointLight.position.set(0, 0, 0);
        scene.add(pointLight);

        objectsLigths.push(pointLight);
        pointLight.GUIlights = _lightsObject();
        _createPointLightGUI(pointLight.GUIlights);
    }

    export function createDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.castShadow = true;

        objectsLigths.push(directionalLight);
        directionalLight.GUIlights = _lightsObject();
        _createDirectionalLigthGUI(directionalLight.GUIlights);

        scene.add(directionalLight);

    }

    //Funcion Crear Cubo
    export function createCubeGeneric() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({
            color: 0xffac0,
            wireframe: false,
        });
        const cube = new THREE.Mesh(geometry, material);

        objectsCube.push(cube);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.y = 0.5;
        scene.add(cube);

        cube.GUIcube = _cubeObject();
        _createCubeGUI(cube.GUIcube);

        contCube = contCube + 1;
    }



    //Funcion Crear Esfera
    export function createSphereGeneric() {

        const geometry = new THREE.SphereGeometry();
        const material = new THREE.MeshBasicMaterial({
            color: 0xffac0,
            wireframe: false
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphere.position.y = .5;
        sphere.position.x = 2;
        objectsSphere.push(sphere);
        scene.add(sphere);
        sphere.GUIsphere = _sphereObject();
        _createSphereGUI(sphere.GUIsphere);
        contSphere = contSphere + 1;
    }

    //Propiedades luces
    function _lightsObject() { /* Tomé esta función para las opciones generales en las luces y no hacer varias funciones */
        var GUIlights = {
            x: 0,
            y: 16,
            z: 0,
            intensity: 1,
            distance: 0,
            decay: 1,
            angle: 0,
            penumbra: 0,
            correct: 2,
            color: 0xffffff,
        }
        return GUIlights;
    }
    //Propiedades Cubo
    function _cubeObject() {
        var GUIcube = {
            material: 'Basic',
            materialColor: 0xffac0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            posX: 2,
            posY: .6,
            posZ: 0,
            rotaX: 0,
            rotaY: 0,
            rotaZ: 0,
        };
        return GUIcube;
    }
    // Propiedad esfera
    function _sphereObject() {
        var GUIsphere = {
            material: 'Basic',
            materialColor: 0xffac0,
            scaleX: .5,
            scaleY: 11,
            scaleZ: 8,
            posX: 0,
            posY: 1,
            posZ: 1,
            rotaX: 0,
            rotaY: 0,
            rotaZ: 0,
        }
        return GUIsphere;
    }

    //LoadGUI
    function loadGUI() {
        gui = new dat.GUI();
        gui.open();

    }

    //Gui SpotLight
    function _createSpotlightGUI(GUIlights) {
        const folder = gui.addFolder('SpotLight')

        folder.add(GUIlights, 'x', 0, 30);
        folder.add(GUIlights, 'y', 0, 30);
        folder.add(GUIlights, 'z', 0, 30);
        folder.add(GUIlights, 'intensity', 1, 10);
        folder.add(GUIlights, 'angle', 0, Math.PI / 2);
        folder.add(GUIlights, 'decay', 0, 30);
        folder.add(GUIlights, 'penumbra', 0, 1);
        folder.addColor(GUIlights, 'color');

    }

    //Gui Ambient Light
    function _createAmbientLightGUI(GUIlights) {
        const folder = gui.addFolder('Ambient Light')

        folder.add(GUIlights, 'intensity', 1, 10);
        folder.addColor(GUIlights, 'color');
    }

    //Gui PointLight
    function _createPointLightGUI(GUIlights) {
        const folder = gui.addFolder('Point Light')

        folder.addColor(GUIlights, 'color');
        folder.add(GUIlights, 'intensity', 0, 10);
        folder.add(GUIlights, 'distance', 0, 100);
        folder.add(GUIlights, 'decay', 0, 10);
        folder.add(GUIlights, 'correct', 0, 10)
    }

    //Gui DirectionalLight
    function _createDirectionalLigthGUI(GUIlights) {
        const folder = gui.addFolder('Directional Light');

        folder.addColor(GUIlights, 'color');
        folder.add(GUIlights, 'intensity', 0, 10);
        folder.add(GUIlights, 'x', 0, 30);
        folder.add(GUIlights, 'y', 0, 30);
        folder.add(GUIlights, 'z', 0, 30);

    }

    //Funcion crear GUI Cube Folders
    function _createCubeGUI(GUIcube) {
        const folder = gui.addFolder('Cube ' + contCube);
        //Material
        folder.addColor(GUIcube, 'materialColor');
        folder.add(GUIcube, 'material', ['Basic', 'Phong', 'Lambert']);

        //Escala
        folder.add(GUIcube, 'scaleX', 0, 30);
        folder.add(GUIcube, 'scaleY', 0, 30);
        folder.add(GUIcube, 'scaleZ', 0, 30);

        // Posicion
        folder.add(GUIcube, 'posX', 0, 30);
        folder.add(GUIcube, 'posY', 0, 30);
        folder.add(GUIcube, 'posZ', 0, 30);

        // Rotacion
        folder.add(GUIcube, 'rotaX', 0, 30);
        folder.add(GUIcube, 'rotaY', 0, 30);
        folder.add(GUIcube, 'rotaZ', 0, 30);

        guiFolderCube = guiFolderCube + 1;
    }

    //Funcion crear GUI Sphere Folders
    function _createSphereGUI(GUIsphere) {
        const folder = gui.addFolder('Sphere ' + contSphere);
        //Material
        folder.addColor(GUIsphere, 'materialColor');
        folder.add(GUIsphere, 'material', ['Basic', 'Phong', 'Lambert']);

        //Escala
        folder.add(GUIsphere, 'scaleX', 0, 30);
        folder.add(GUIsphere, 'scaleY', 0, 30);
        folder.add(GUIsphere, 'scaleZ', 0, 30);

        // Posicion
        folder.add(GUIsphere, 'posX', 0, 30);
        folder.add(GUIsphere, 'posY', 0, 30);
        folder.add(GUIsphere, 'posZ', 0, 30);

        //Rotation
        folder.add(GUIsphere, 'rotaX', 0, 30);
        folder.add(GUIsphere, 'rotaY', 0, 30);
        folder.add(GUIsphere, 'rotaZ', 0, 30);

        guiFolderSphere = guiFolderSphere + 1;
    }

    //CleanGUI
    export function cleanGUI() {
        const dom = document.querySelector(".dg.main");
        if (dom) dom.remove();


    }

    function animate() {
        requestAnimationFrame(animate);
        updateElements();
        renderer.render(scene, camera);
    }

    //Actualizar Cubo
    function _updateCube() {
        Object.keys(objectsCube).forEach(i => {
            const cubeSelected = objectsCube[i];
            //Material cubo
            cubeSelected.GUIcube.material == 'Basic' ?
                (cubeSelected.material = new THREE.MeshBasicMaterial({
                    color: cubeSelected.GUIcube.materialColor,
                })) :
                cubeSelected.GUIcube.material == 'Lambert' ?
                (cubeSelected.material = new THREE.MeshLambertMaterial({
                    color: cubeSelected.GUIcube.materialColor,
                })) :
                (cubeSelected.material = new THREE.MeshPhongMaterial({
                    color: cubeSelected.GUIcube.materialColor,
                }));

            //Escalar cubo
            cubeSelected.geometry = new THREE.BoxGeometry(
                cubeSelected.GUIcube.scaleX,
                cubeSelected.GUIcube.scaleY,
                cubeSelected.GUIcube.scaleZ,
            );

            //Posición
            cubeSelected.position.x = cubeSelected.GUIcube.posX;
            cubeSelected.position.y = cubeSelected.GUIcube.posY;
            cubeSelected.position.z = cubeSelected.GUIcube.posZ;

            // Rotación
            cubeSelected.rotation.x = cubeSelected.GUIcube.rotaX;
            cubeSelected.rotation.y = cubeSelected.GUIcube.rotaY;
            cubeSelected.rotation.z = cubeSelected.GUIcube.rotaZ;
        });
    }

    //Actualizar Esfera

    function _updateShpere() {
        Object.keys(objectsSphere).forEach(i => {
            const sphreSelected = objectsSphere[i];
            //Material Sphere
            sphreSelected.GUIsphere.material == 'Basic' ?
                (sphreSelected.material = new THREE.MeshBasicMaterial({
                    color: sphreSelected.GUIsphere.materialColor,
                })) :
                sphreSelected.GUIsphere.material == 'Lambert' ?
                (sphreSelected.material = new THREE.MeshLambertMaterial({
                    color: sphreSelected.GUIsphere.materialColor,
                })) :
                (sphreSelected.material = new THREE.MeshPhongMaterial({
                    color: sphreSelected.GUIsphere.materialColor,
                }));

            //Escalar Esfera
            sphreSelected.geometry = new THREE.SphereGeometry(
                sphreSelected.GUIsphere.scaleX,
                sphreSelected.GUIsphere.scaleY,
                sphreSelected.GUIsphere.scaleZ,
            );

            //Posición
            sphreSelected.position.x = sphreSelected.GUIsphere.posX;
            sphreSelected.position.y = sphreSelected.GUIsphere.posY;
            sphreSelected.position.z = sphreSelected.GUIsphere.posZ;

            //Rotación

            sphreSelected.rotation.x = sphreSelected.GUIsphere.rotaX;
            sphreSelected.rotation.y = sphreSelected.GUIsphere.rotaY;
            sphreSelected.rotation.z = sphreSelected.GUIsphere.rotaZ;
        });

    }

    function _updatelights() {
        Object.keys(objectsLigths).forEach(i => {
            const spotLightSelected = objectsLigths[i];

            //LightHelper 

            // spotLightSelected.LightHelper = new THREE.SpotLightHelper(spotLightSelected);

            //Color
            spotLightSelected.color = new THREE.Color(spotLightSelected.GUIlights.color);

            //Position
            spotLightSelected.position.x = spotLightSelected.GUIlights.x;
            spotLightSelected.position.y = spotLightSelected.GUIlights.y;
            spotLightSelected.position.z = spotLightSelected.GUIlights.z;

            //Intensity

            spotLightSelected.intensity = spotLightSelected.GUIlights.intensity;

            //Distance

            spotLightSelected.distance = spotLightSelected.GUIlights.distance;

            //Decay
            spotLightSelected.decay = spotLightSelected.GUIlights.decay;

            //Angle
            spotLightSelected.angle = spotLightSelected.GUIlights.angle;

            //Penumbra 
            spotLightSelected.penumbra = spotLightSelected.GUIlights.penumbra;

            //Correct
            spotLightSelected.correct = spotLightSelected.GUIlights.correct;
        })
    }

    function updateElements() {

        _updateCube(); -
        _updateShpere();
        _updatelights();

    }