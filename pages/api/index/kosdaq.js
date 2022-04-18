import DBConnector from '../../connector/dbConnector'

var dbConnector = new DBConnector();
export default (req, res) => {
    loadKosdaq(function(data){
        if (req.method === 'POST') {
            try {
                res.status(200).end(JSON.stringify(data));
            } catch (err) {
                res.status(err).json({});
            }
        } else {
            res.status(405);
            res.end();
        }
        
    });
}

const loadKosdaq = function(callback){
    dbConnector.select(`
            select * 
            from cert_kospi_kosdaq 
            where stk_typ = 'KOSDAQ'
            order by stk_date desc;
        `, 
        (err, data) => {
        if(err){
            console.err(err)
        }
        callback(data);
    });
}