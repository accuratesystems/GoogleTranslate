//#region TRADUCIR TEXTO

const { readFile } = require('fs');
const GestionFicheroCaracteres  = require('./readfile');

const projectId = {
    key : 'AIzaSyDJZThlBK_zDvHOAjKMTi0EawAtS0quQfE'
}
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate(projectId);

function traducir(){
    const text = '<h2>For the international transport of hazardous liquids according to ADR/RID and the IMDG code, packing groups II and II</h2><h2>Mobile diesel supply for building site vehicles, machines, equipment etc.</h2><h3>Attributes</h3><ul><li>Sturdy, conical outer container, 3 mm steel sheet (with a frame) serves as a containment sump with 100% volume</li><li>Dipstick to detect any leakage</li><li>100 mm ground leeway</li><li>Sturdy, changeable inner tank made of PE</li><li>Filling/extraction lid with 2" filling coupling, vent valve, suction hose, stopcock for the pump connection, screw-in dipstick</li><li>Lockable hood with gas compression springs</li><li>Suitable for pick-up by a pallet truck, forklift or crane</li></ul>';
    var gf = new GestionFicheroCaracteres();
    gf.incrementaCaracteres(text.length);
    const target = 'es';
    translate.translate(text,target).then(data=>{
        console.log(data);

    }).catch(err=>{
        console.log(err);
    });
}

//traducir();


//#endregion


