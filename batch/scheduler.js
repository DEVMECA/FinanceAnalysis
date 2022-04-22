var ScrapingStock = require('./impl/scrapingStock')
var ScrapingStockTimely = require('./impl/scrapingStockTimely')
var ScrapingKospiAndKosdaq = require('./impl/scrapingKospiAndKosdaq')
var DBConnector = require('./connector/dbConnector')
var StringUtil = require('../utils/stringUtil')
var DateUtil = require('../utils/DateUtil')

var CronJob = require('cron').CronJob; 
var scrapingStock = new ScrapingStock(); 
var scrapingStockTimely = new ScrapingStockTimely(); 
var scrapingKospiAndKosdaq = new ScrapingKospiAndKosdaq();
var dbConnector = new DBConnector();
// 각 기업별 주가데이터 수집(기업별 조회)
new CronJob('*/5 * * * * *', function() { 
    console.log('Load scrapingStock Batch ' + new Date());
    dbConnector.select("select * from cert_cmp;", (err, data) => {
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
            
            const date = new Date();
            const yyyymmdd = DateUtil.yyyymmdd(date);
            const nowdatetime = DateUtil.nowdatetime(date);

            const obj_timely = {
                cert_no : item.cert_no,
                stk_date : yyyymmdd,
                url : "http://finance.naver.com/item/sise_time.naver?code=" + item.cert_no + "&page=1&thistime=" + nowdatetime,
                body : []
            };
            scrapingStockTimely.crawlUrl(obj_timely);
        })

    });
}, null, true, ''); 


// 코스피 코스닥 데이터 수집
new CronJob('*/5 9-16 * * * *', function() { 
    console.log('Load scrapingKospi&Kosdaq Batch ' + new Date());
    var obj = {
        stk_typ : "KOSPI",
        url : "https://finance.naver.com/sise/sise_index_day.nhn?code=KOSPI&page=1",
        body : []
    };
    scrapingKospiAndKosdaq.crawlUrl(obj);

    obj = {
        stk_typ : "KOSDAQ",
        url : "https://finance.naver.com/sise/sise_index_day.nhn?code=KOSDAQ&page=1",
        body : []
    };
    scrapingKospiAndKosdaq.crawlUrl(obj);

}, null, true, ''); 

