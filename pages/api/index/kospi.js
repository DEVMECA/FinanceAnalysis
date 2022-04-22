import DBConnector from '../../connector/dbConnector'

var dbConnector = new DBConnector();
export default (req, res) => {
    loadKospi(function(data){
        if (req.method === 'POST') {
            try {
                res.status(200).json(JSON.stringify(data));
                res.end();
            } catch (err) {
                res.status(err).json({});
                res.end();
            }
        } else {
            res.status(405);
            res.end();
        }
    });
}

const loadKospi = function(callback){
    dbConnector.select(`
            select * 
            from cert_kospi_kosdaq 
            where stk_typ = 'KOSPI'
            order by stk_date desc;
        `, 
        (err, data) => {
        if(err){
            console.err(err)
        }
        callback(data);
    });
}