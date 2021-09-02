import {
    main,
    reset,
    createCubeGeneric,
    createSphereGeneric,
    cleanGUI,
    createSpotlightGeneric,
    createAmbietLightGeneric,
    createPointLightGeneric,
    createDirectionalLight
} from 'C:/Users/Daniel/Desktop/MainCompuGrafica/3-BaseProyect/src/app.js'; /* Se importaron todas estas funciones desde el app.js */

let size = 10;

window.onload = () => {

    /* Esta Sección toma los valores de los id's de los botones del HTML para luego hacer funciones con ellos y agregarles acciones */

    const options = document.querySelectorAll('.btnOption');
    const content = document.querySelector('#content');
    const backBtn = document.querySelector('#backBtn');
    const createCubeBtn = document.querySelector('#createCubeBtn');
    const createSphereBtn = document.querySelector('#createSphereBtn');
    const createLightBtn = document.querySelector('#createSpotLightBtn');
    const createAmbientLightBtn = document.querySelector('#createAmbientLightBtn');
    const createPointLightBtn = document.querySelector('#createPointLightBtn');
    const createDiretionalLightBtn = document.querySelector('#createDiretionalLightBtn');
    const sendBtn = document.querySelector('#sendBtn');

    /* Oculta los botones  */
    backBtn.style.display = "none";
    createCubeBtn.style.display = "none";
    createSphereBtn.style.display = "none";
    createLightBtn.style.display = "none";
    createAmbientLightBtn.style.display = "none";
    createPointLightBtn.style.display = "none";
    createDiretionalLightBtn.style.display = "none";

    /* Funcion Principal de los botones */
    options.forEach(optionSelected => {
        optionSelected.onclick = function() {
            backBtn.style.display = "flex"; //Añade o expone los botones dependiendo del boton seleccionado
            createCubeBtn.style.display = "flex";
            createSphereBtn.style.display = "flex";
            createLightBtn.style.display = "flex";
            createAmbientLightBtn.style.display = "flex";
            createPointLightBtn.style.display = "flex";
            createDiretionalLightBtn.style.display = "flex";
            const optionSize = this.dataset.size;
            size = optionSize;
            toogleContent();
            main(size); //Envia el valor de los botones al main para luego añadir el plano a la escena
            document.querySelector("canvas").style.display = "block";
            document.querySelector(".dg").style.display = "block";
        }

    });

    backBtn.onclick = function() {
        backBtn.style.display = "none";
        createCubeBtn.style.display = "none";
        createSphereBtn.style.display = "none";
        createLightBtn.style.display = "none";
        createAmbientLightBtn.style.display = "none";
        createPointLightBtn.style.display = "none";
        createDiretionalLightBtn.style.display = "none";
        toogleContent();
        cleanGUI();
        reset();

        document.querySelector("canvas").style.display = "none"; //Desaparece el canvas para que se ejecute la pagina principal

        if (document.querySelector(".ac").childElementCount > 0) { /* Este código lo usé para ocultar la barra de GUI y no salga en la pagina Principal */
            document.querySelector(".ac").removeChild(document.querySelectorAll(".dg .main")[0]);

        }
    }

    sendBtn.onclick = function() { /* Boton funcional del Custom */


        var optionSize = document.getElementById("data-size").value;

        size = optionSize;
        backBtn.style.display = "flex";
        createCubeBtn.style.display = "flex";
        createSphereBtn.style.display = "flex";
        createLightBtn.style.display = "flex";
        createAmbientLightBtn.style.display = "flex";
        createPointLightBtn.style.display = "flex";
        createDiretionalLightBtn.style.display = "flex";
        toogleContent();
        main(optionSize);
        document.querySelector("canvas").style.display = "block";
    }

    /* Propiedades de los botones llamados desde el Js para ejecutar las geometrias y luces en la escena */
    createCubeBtn.onclick = function() {
        createCubeGeneric();
    }

    createSphereBtn.onclick = function() {
        createSphereGeneric();
    }

    createLightBtn.onclick = function() {
        createSpotlightGeneric();
    }
    createAmbientLightBtn.onclick = function() {
        createAmbietLightGeneric();
    }
    createPointLightBtn.onclick = function() {
        createPointLightGeneric();
    }

    createDiretionalLightBtn.onclick = function() {
        createDirectionalLight();
    }

    function toogleContent() {
        content.style.display = content.style.display == 'none' ? 'flex' : 'none';
    }
}