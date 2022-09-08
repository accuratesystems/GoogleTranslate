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

sql.connect(config,function(err){
    if(err){
        console.log(err);
    }
    var request = new sql.Request();
    request.query('SELECT * FROM _TMP_TRADUCCIONES',function(err,recordset) {
        if(err){
            console.log(err);
        }
        console.log(recordset);
    });
    request.query(`INSERT INTO _TMP_TRADUCCIONES (Id,Descripcion) VALUES (1,'Hola')`,function(err,recordset){
        if(err){
            console.log(err);
        }
        console.log(recordset);
    });

        
});

