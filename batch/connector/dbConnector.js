var sqlite3 = require('sqlite3')
const fs = require('fs');

var db;
class DBConnector{
    constructor() { this.init() }

    init(){
        db = new sqlite3.Database('C:/Project/nodejs_project/financeanalysis/db/finance.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
                console.error(dbPath);
            } else {
                var script_ddl = fs.readFileSync('C:/Project/nodejs_project/financeanalysis/db/script/finance.txt', 'utf8' , (err, data) => {
                    if(err) 
                        console.err(err)
                });
                var scripts = script_ddl.split(";");
                for (var i = 0; i < scripts.length; i++) {
                    if(scripts[i].trim() == '') continue;
                    db.run(scripts[i]);
                }
                this.close()
            }
        }); 
    }

    connect(){
        // db sqlite3 db 연결
        db = new sqlite3.Database('C:/Project/nodejs_project/financeanalysis/db/finance.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
                console.error(dbPath);
            }
        }); 

        return db;
    }

    close(){
        // db sqlite3 db 종료
        db.close((err) =>{
            if(err){
                console.error(err.message);
            }
        });
    }

    insert(sql, callback){
        console.log('sql : ' + sql);
        db = this.connect();
        db.run(sql, callback);
        this.close(db);
    }

    select(sql, callback){
        console.log('sql : ' + sql);
        db = this.connect();
        db.all(sql, [], callback);
        this.close(db);
    }

}
module.exports = DBConnector