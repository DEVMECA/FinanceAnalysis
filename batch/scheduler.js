var ScrapingStock = require('./impl/scrapingStock')
var DBConnector = require('../db/connector/dbConnector')

var CronJob = require('cron').CronJob; 
var scrapingStock = new ScrapingStock(); 
var dbConnector = new DBConnector();
// 각 기업별 주가데이터 수집
new CronJob('*/5 * * * * *', function() { 
    console.log('Load scrapingStock Batch ' + new Date());
    var cert_list = dbConnector.select("select * from cert_cmp;", (err, data) => {
        if(err){
            console.err(err)
        }
        
        data.forEach(function(item){
            console.log(item);
            const obj = {
                cert_no : item.cert_no,
                url : "http://finance.naver.com/item/sise_day.nhn?code=" + item.cert_no,
                body : []
            };
            scrapingStock.crawlUrl(obj);
        })
    });
    
}, null, true, ''); 