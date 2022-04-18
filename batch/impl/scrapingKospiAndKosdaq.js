var axios = require('axios')
var cheerio = require('cheerio')
var sqlite3 = require('sqlite3');
var DBConnector = require('../connector/dbConnector')

// TODO: 모듈화 개발 진행 중
//var StringUtil = require('../../utils/stringUtil')

var configure = [];
var dbConnector = new DBConnector();
class ScrapingKospiAndKosdaq {

  constructor(configure) { this.configure = configure }

  crawlUrl(obj) {
    let htmlData = [];
    // axios 를 활용해서 AJAX로 HTML 문서를 가져온다.
    const getHTML = (obj) => {
      try {
        const headers = {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Language':'ko,en;q=0.9,en-US;q=0.8',
          'Accept-Encoding':'gzip, deflate, br',
          'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 Edg/100.0.1185.39'
        }
        return axios.get(obj.url, {headers});
      } catch (e) {
        console.error(e);
      }
    };
  
    let result = [];
    // getHTML 함수 실행 후 데이터에서 table tbody tr 인 리스트를 stockList 저장
    getHTML(obj)
      .then((html) => {
        const $ = cheerio.load(html.data);
        const $stockList = $('table tbody tr');
  
        $stockList.each(function (i, el) {
          const stk_typ = 'KOSPI';
          const stk_date = $(this).children('td').eq(0).text()
                              .replace(/\n/g,'').replace(/\t/g,'').replace(/,/g,'');
          const stk_end_amt = $(this).children('td').eq(1).text().replace(/,/g,'');
          const stk_cpr_bef_amt = $(this).children('td').eq(2).text().replace(/,/g,'')
                                  .replace(/\n/g,'').replace(/\t/g,'');
          const stk_ratio = $(this).children('td').eq(3).text().replace(/,/g,'')
                                  .replace(/\n/g,'').replace(/\t/g,'');
          const trd_cnt = $(this).children('td').eq(4).text().replace(/,/g,'');
          const trd_amt = $(this).children('td').eq(5).text().replace(/,/g,'');
          
          // TODO: 모듈화 개발 진행 중
          //var nowdate = StringUtil.convertDateFormat(new Date(), '.');
          //console.log(nowdate + ':' + nowdate);
          if(stk_date.length<8)
            return true;

          var stk_cpr = "";
          if($(this).children('td').eq(2).children('img').attr('src').indexOf('ico_down')>=0){
            stk_cpr = "-";
          }
          
          result[i] = {
            stk_typ: obj.stk_typ,
            stk_date: stk_date,
            stk_end_amt: stk_end_amt,
            stk_cpr_bef_amt: stk_cpr + stk_cpr_bef_amt,
            stk_ratio: stk_ratio,
            trd_cnt: trd_cnt,
            trd_amt: trd_amt,
          };

          
        });
  
        return result;
      })
      .then((res) => {
        result.forEach((item) => {
          dbConnector.select(`
            select * 
            from cert_kospi_kosdaq
            where stk_date = '${item.stk_date}'
            and  stk_typ = '${item.stk_typ}'
            `, 
            (err, stock) =>{
              if(err){
                console.error(err.message);
                return false;
              }

              if(stock.length > 0){
                this.updateKospiKosdaq(item);
                return false;
              }

              this.insertKospiKosdaq(item);
            });
        });
      });
  }


  insertKospiKosdaq(item){
    dbConnector.insert(`
              insert into cert_kospi_kosdaq (
                stk_typ,
                stk_date,
                stk_end_amt,
                stk_cpr_bef_amt,
                stk_ratio,
                trd_cnt,
                trd_amt
              )
              values(
                '${item.stk_typ}',
                '${item.stk_date}',
                '${item.stk_end_amt}',
                '${item.stk_cpr_bef_amt}',
                '${item.stk_ratio}',
                '${item.trd_cnt}',
                '${item.trd_amt}'
              );
          `
          , 
          (err) =>{
            if(err){
              console.error(err.message);
            }
          }
      );
  }

  updateKospiKosdaq(item){
    dbConnector.insert(`
              update cert_kospi_kosdaq
              set uuser = 'system',
                  udate = datetime('now','localtime'),
                  stk_end_amt = '${item.stk_end_amt}',
                  stk_cpr_bef_amt = '${item.stk_cpr_bef_amt}',
                  stk_ratio = '${item.stk_ratio}',
                  trd_cnt = '${item.trd_cnt}',
                  trd_amt = '${item.trd_amt}'
              where stk_typ = '${item.stk_typ}'
              and stk_date = '${item.stk_date}'
          `
          , 
          (err) =>{
            if(err){
              console.error(err.message);
            }
          }
      );
  }

}
module.exports = ScrapingKospiAndKosdaq

