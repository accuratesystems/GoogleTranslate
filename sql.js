var Translator = require('./app');

var sql = require('mssql');
var config = {
    user : 'sa',
    password : 'Accur@t344',
    server : 'sqlsrvr\\sql2017',    
    database : 'TYMBIA' ,
    options:{
        trustServerCertificate : true        
    }
};

sql.connect(config, function(err){
    if(err){
        console.log(err);
    }


    // SELECT
    var request = new sql.Request();
    request.query('SELECT * FROM _TMP_TRADUCCIONES',function(err,recordset) {
        if(err){
            console.log(err);
        }
        console.log(recordset);
    });


    /*
    // Translate Descriptions
    var request1 = new sql.Request();
    // Obtenemos Descripciones únicas.
    request1.query("SELECT DISTINCT Description FROM _TMP_TRADUCCIONES WHERE Description LIKE 'Traverses for emptying stacking tippers and swarf stacking tippers%';", function(err1, recordset1) {
        if (err1) {
            console.log(err1);
        }
        console.log(recordset1);
        let polyglot = new Translator();
        for (rec1 of recordset1.recordset)
        {
            let description = rec1.Description;
            let sql_descr = description.replace("'", "''")
            var request2 = new sql.Request();
            // Obtenemos las ids de cada Descripción
            request2.query(`SELECT * FROM _TMP_TRADUCCIONES WHERE Description = '${sql_descr}'`, async function(err2, recordset2) {
                if (err2) {
                    console.log(err2);
                } else {
                    
                    let id_list = recordset2.recordset.map(rec => rec.ID)
                    let where_tail = id_list.length > 1 ? `IN (${id_list.join(', ')})` : `= ${id_list[0]}`
                    let translation = await polyglot.traducir(description);
                    let query = `UPDATE _TMP_TRADUCCIONES SET Translation = '${translation[0].replace("'", "''")}' WHERE ID ${where_tail}`

                    var request3 = new sql.Request();
                    request3.query(query, function(err3, recordset3) {
                        if (err3) {
                            console.log(err3);
                        } else {
                            console.log(`UPDATED succeeded! Rows affected: ${recordset3.rowsAffected}`);
                        }
                    })
                }
            })
        }
    });
    */

    // Translate Names
    var request1 = new sql.Request();
    // Obtenemos nombres únicos.
    // LIMIT 10 <=(SQL, SQL SERVER)=> ORDER BY 1 OFFSET 0 ROWS FETCH FIRST 10 ROWS ONLY
    request1.query("SELECT DISTINCT ProductName FROM _TMP_TRADUCCIONES WHERE ProductName <> '' ORDER BY 1 OFFSET 0 ROWS FETCH FIRST 300 ROWS ONLY;", function(err1, recordset1) {
        if (err1) {
            console.log(err1);
        }
        console.log(recordset1);
        let polyglot = new Translator();
        for (rec1 of recordset1.recordset)
        {
            let description = rec1.Description;
            let sql_descr = description.replace("'", "''")
            var request2 = new sql.Request();
            // Obtenemos las ids de cada nombre único.
            query = `SELECT * FROM _TMP_TRADUCCIONES WHERE Description = '${sql_descr}';`
            request2.query(query, async function(err2, recordset2) {
                if (err2) {
                    console.log(err2);
                } else {
                    // Actualizamos campo ProdNameTranslation                    
                    let id_list = recordset2.recordset.map(rec => rec.ID)
                    let where_tail = id_list.length > 1 ? `IN (${id_list.join(', ')})` : `= ${id_list[0]}`
                    let translation = await polyglot.traducir(description);
                    let query = `UPDATE _TMP_TRADUCCIONES SET ProdNameTranslation = '${translation[0].replace("'", "''")}' WHERE ID ${where_tail};`

                    var request3 = new sql.Request();
                    request3.query(query, function(err3, recordset3) {
                        if (err3) {
                            console.log(err3);
                        } else {
                            console.log(`UPDATED succeeded! Rows affected: ${recordset3.rowsAffected}`);
                        }
                    })
                }
            })
        }
    });
});
