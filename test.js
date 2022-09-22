var Translator = require('./app');

class Test{
    constructor() {}

    async traducir(){
        let tr = new Translator();
        let translation = await tr.traducir('for');
        console.log(translation);
    }
}

t = new Test();
t.traducir();