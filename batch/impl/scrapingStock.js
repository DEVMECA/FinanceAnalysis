var axios = require('axios')
var cheerio = require('cheerio')
var sqlite3 = require('sqlite3');
var DBConnector = require('../../db/connector/dbConnector')

var configScrapingStock = [];
var dbConnector = new DBConnector();
class ScrapingStock {

  constructor(configScrapingStock) { this.configScrapingStock = configScrapingStock }

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
        console.log('obj.url : ' + obj.url)
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
          const stk_date = $(this).children('td').eq(0).text()
                              .replace(/\n/g,'').replace(/\t/g,'').replace(/,/g,'')
          const stk_end_amt = $(this).children('td').eq(1).text().replace(/,/g,'')
          const stk_cpr_bef_amt = $(this).children('td').eq(2).text().replace(/,/g,'')
                                  .replace(/\n/g,'').replace(/\t/g,'')
          const stk_amt = $(this).children('td').eq(3).text().replace(/,/g,'')
          const stk_max_amt = $(this).children('td').eq(4).text().replace(/,/g,'')
          const stk_min_amt = $(this).children('td').eq(5).text().replace(/,/g,'')
          const trd_amt = $(this).children('td').eq(6).text().replace(/,/g,'')
          if(stk_date.length<8) 
            return true;
          
          result[i] = {
            cert_no: obj.cert_no,
            stk_date: stk_date,
            stk_end_amt: stk_end_amt,
            stk_cpr_bef_amt: stk_cpr_bef_amt,
            stk_amt: stk_amt,
            stk_max_amt: stk_max_amt,
            stk_min_amt: stk_min_amt,
            trd_amt: trd_amt,
          };

          
        });
  
        return result;
      })
      .then((res) => {
        console.log(result);
          result.forEach((item) => {
            dbConnector.insert(`
                insert into cert_stock_daily (
                  cert_no,
                  stk_date,
                  stk_end_amt,
                  stk_cpr_bef_amt,
                  stk_max_amt,
                  stk_min_amt,
                  trd_amt
                )
                values(
                  '${item.cert_no}',
                  '${item.stk_date}',
                  '${item.stk_end_amt}',
                  '${item.stk_cpr_bef_amt}',
                  '${item.stk_max_amt}',
                  '${item.stk_min_amt}',
                  '${item.trd_amt}'
                );
          `, (err) =>{
              if(err){
                console.error(err.message);
              }
            });
          });
        });
        obj.body = result;
  }

}
module.exports = ScrapingStock

