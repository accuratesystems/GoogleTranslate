const fs = require('fs');
const { buffer } = require('stream/consumers');


const path = './NumeroCaracteres.txt';
class GestionFicheroCaracteres {

    constructor(){

    }


    getCaracteresActuales() {
        let buf = fs.readFileSync(path);        
        let data = buf.toString();
        var numCaracteres = parseInt(data);
        return numCaracteres;

        // await fs.readFile('./NumeroCaracteres.txt','utf8',(err,data)=>{
        //     if(err)
        //     {
        //         console.error(err);
        //         return null;
        //     }
        //     console.log(data);
        //     var numCaracteres = parseInt(data);
        //     console.log(numCaracteres);
        //     return numCaracteres;
        // });
    }

    escribeCaracteres(caracteresActuales,incremento){
        fs.open('./NumeroCaracteres.txt','r+',function(err,fd){
            if(err){
                console.error(err);
                return;
            }

            let total = caracteresActuales+incremento;
            let buffer = new Buffer.from(total.toString(),'utf-8');
            fs.write(fd,buffer,0,buffer.length,0,function(err,writtenBytes){
                if(err){
                    console.error(err);
                    return;
                }else{
                    console.log(writtenBytes + ' caracteres añadidos al fichero');
                }
            });

        });
    }

    incrementaCaracteres(incremento){
        var cars =this.getCaracteresActuales();    
        this.escribeCaracteres(cars,incremento);

    }
}

module.exports = GestionFicheroCaracteres;