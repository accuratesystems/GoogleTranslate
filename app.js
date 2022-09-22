//#region TRADUCIR TEXTO

const { readFile } = require('fs');
const GestionFicheroCaracteres  = require('./readfile');

const projectId = {
    key : 'AIzaSyDJZThlBK_zDvHOAjKMTi0EawAtS0quQfE'
}
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate(projectId);

class Translator{
    constructor () {}

    async traducir(text='for') {

        var gf = new GestionFicheroCaracteres();
        gf.incrementaCaracteres(text.length);
        const target = 'es';
        // translate.translate(text, target).then(data => {
        //     console.log(data);
        //     return data[0];
        // }).catch(err=>{
        //     console.log(err);
        //     return err;
        // });
        return await translate.translate(text, target);
    }
}

module.exports = Translator;

//#endregion


