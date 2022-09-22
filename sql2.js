class SQL {
    #sql = require('mssql');
    #config = {}

    constructor() {
        this.#config = {
            user : 'sa',
            password : 'Accur@t344',
            server : 'sqlsrvr\\sql2017',    
            database : 'TYMBIA' ,
            options: {
                trustServerCertificate : true        
            }
        }        
    }

    select() { 
        this.#sql.connect(this.#config, function(err){
            var request = new this.#sql.Request();
            request.query('SELECT * FROM _TMP_TRADUCCIONES;', function(err, recordset) {
                if(err){
                    console.log(err);
                }
                console.log(recordset);
            });
        });
    } 

    insert() {
        this.#sql.connect(this.#config, function(err){
            for (let test of ['hola', 'prova', 'test']) {
                var request = new this.#sql.Request();
                request.query(`INSERT INTO _TMP_TRADUCCIONES (Description) VALUES ('${test}')`, function(err, recordset){
                    if(err){
                        console.log(err);
                    }
                    console.log(recordset);
                });
            }
        });
    }
    
    delete() {
        this.#sql.connect(this.#config, function(err){
            var request = new this.#sql.Request();
            request.query(`DELETE FROM _TMP_TRADUCCIONES WHERE ID IS NULL;`,function(err,recordset){
                if(err){
                    console.log(err);
                }
                console.log(recordset);
            });        
        });
    }
}

const sql = new SQL();
sql.select();
