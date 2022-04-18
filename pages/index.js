import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

import Chart from 'chart.js/auto'
import BarGraph from './chart/bar';
import LineGraph from './chart/line'
import KospiGrid from './grid/kospiGrid'
import KosdakGrid from './grid/kosdaqGrid'
import NewsGrid from './grid/newsGrid'

import BubbleGraph from './chart/bubble';
import CrazyLine from './chart/crazyLine'
import Doughnut from './chart/doughnut'
import DynamicDoughnut from "./chart/dynamic-doughnut";
import HorizontalBar from './chart/horizontalBar';
import LegendHandlers from "./chart/legend-handlers";
import PieGraph from './chart/pie'
import PolarGraph from './chart/polar'
import RadarGraph from './chart/radar'
import Scatter from './chart/scatter'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Financial Analysis</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <Script src="https://www.google-analytics.com/analytics.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></Script>
      </Head>

      <main>
        <div className='header fullWidth'>
          <div id='titleDiv' className='halfWidth'>
            <Link href="/">
              <img src='/images/statistics.png' id='headerIcon'></img>
            </Link>
            <h2>Financial Analysis</h2>
          </div>
          <div id='menuDiv' className='halfWidth'>
            <nav>
              <button>HOME</button>
              <button>MARKET</button>
              <button>TRADE</button>
              <button>PRICING</button>
              <button>DOWNLOAD</button>
              <button>HELP</button>
            </nav>
          </div>
        </div>

        <div className='chartDiv fullWidth'>
          <div className='chartEachDiv'>
            <label>KOSPI</label>
            <div className='chartDetail'>
              <LineGraph width="200" height="200"/>
            </div>
          </div>
          <div className='chartEachDiv'>
            <label>KOSDAK</label>
            <div className='chartDetail'>
              <LineGraph width="200" height="200"/>
            </div>
          </div>
        </div>

        <div className='overviewDiv fullWidth'>
          <label>Market Overview</label>
          <BarGraph width="100" height="200" />
        </div>

        <div className='favoriteDiv fullWidth'>
          <div className='favoriteEachDiv'>
            <label>Samsung</label>
            <div className='favoriteEachNumberDiv numberUp'>
              <label>+ 5.37%</label>
            </div>
          </div>
          <div className='favoriteEachDiv'>
            <label>SK HYNIX</label>
            <div className='favoriteEachNumberDiv numberUp'>
              <label>+ 5.37%</label>
            </div>
          </div>
          <div className='favoriteEachDiv'>
            <label>SK SQUARE</label>
            <div className='favoriteEachNumberDiv numberDown'>
              <label>- 3.82%</label>
            </div>
          </div>
          <div className='favoriteEachDiv'>
            <label>DB HITECH</label>
            <div className='favoriteEachNumberDiv numberUp'>
              <label>+ 1.02%</label>
            </div>
          </div>

          <div className='favoriteEachDiv'>
            <label>Samsung</label>
            <div className='favoriteEachNumberDiv numberUp'>
              <label>+ 5.37%</label>
            </div>
          </div>
          <div className='favoriteEachDiv'>
            <label>SK HYNIX</label>
            <div className='favoriteEachNumberDiv numberUp'>
              <label>+ 5.37%</label>
            </div>
          </div>
          <div className='favoriteEachDiv'>
            <label>SK SQUARE</label>
            <div className='favoriteEachNumberDiv numberDown'>
              <label>- 3.82%</label>
            </div>
          </div>
          <div className='favoriteEachDiv'>
            <label>DB HITECH</label>
            <div className='favoriteEachNumberDiv numberUp'>
              <label>+ 1.02%</label>
            </div>
          </div>
        </div>
        
        <div className='stockDiv fullWidth'>
          <div className='stockEachDiv halfWidth'>
            <label>KOSPI</label>
            <KospiGrid />
          </div>
          <div className='stockEachDiv halfWidth'>
            <label>KOSDAK</label>
            <KosdakGrid />
          </div>
        </div>

        <div className='newsDiv fullWidth'>
          <label>NEWS</label>
          <div className='newsEachDiv'>
            <NewsGrid />
          </div>
        </div>

      </main>

      <footer>
        <div className='footerDiv'>

        </div>
      </footer>

      <style jsx>{`
        .header{
          height: 80px;
          top: 0px;
          box-shadow: rgb(0 0 0 / 10%) 0px 1px 5px 0px;
        }
        .header #headerIcon{
          margin: 10px;
          cursor: pointer;
        }
        .header #headerIcon:hover{
          margin: 8px;
        }
        .header h2{
          font-size: 18px;
          line-height: 2.8;
          color: #565353;
          white-space: pre;
        }
        .header #titleDiv{
          height: 100%;
          display: inline-flex;
          box-shadow: 0 0px 0px 0 rgb(0 77 165 / 7%);
        }
        .header #menuDiv{
          height: 100%;
          box-shadow: 0 0px 0px 0 rgb(0 77 165 / 7%);
        }
        .header #menuDiv nav{
          height: 100%;
          text-align: right;
        }

        @media (max-width: 1024px){
          .header #menuDiv nav{
            display: none;
          }
        }

        .header #menuDiv nav button{
          height: 100%;
          padding: 10px;
          margin-left: 10px;
          border: 0;
          background: #fff;
          cursor: pointer;
          font-weight: bold;
          font-size: 15px;
        }
        .header #menuDiv nav button:hover{
          color:#525bc9;
        }
        .header #menuDiv nav button:active{
          background-color:#eee;
        }
        .chartDiv{
          height: auto;
          background: #eee;
          margin: 0 auto;
          text-align: center;
          margin-top: 10px;
        }
        .chartDiv .chartEachDiv{
          background-color: #fff;
          width: 40%;
          min-width: 400px;
          height: inherit;
          display: inline-block;
          margin: 0px 10px 0px 10px;
        }
        .chartDiv .chartEachDiv .chartDetail{
          height: inherit;
        }
        .chartDiv .chartEachDiv label{
          font-size: 20px;
          font-weight: bold;
          color: #5a4f4f;
        }
        .favoriteDiv{
          height: auto;
          margin: 0 auto;
          text-align: center;
          margin-top: 50px;
          display: table;
        }
        .favoriteDiv .favoriteEachDiv{
          height: inherit;
          margin: 0 auto;
          width: 20%;
          display: inline-block;
          border: 1px solid #eee;
          cursor: pointer;
        }
        .favoriteDiv .favoriteEachDiv:hover{
          animation-duration: 1s;
          animation-name: favoriteColorAnime;
        }
        @keyframes favoriteColorAnime {
          from {
            background-color: #fff;
          }
        
          to {
            background-color: #eee;
          }
        }

        .favoriteDiv .favoriteEachDiv .favoriteEachNumberDiv{
          height: 100px;
          margin: 20px;
          
          display: flex;
        }
        
        .favoriteDiv label{
          font-weight: bold;
          font-size: 20px;
          color: #5a4f4f;
        }

        .favoriteDiv .favoriteEachDiv .favoriteEachNumberDiv label{
          width: 100%;
          text-align: center;
          font-weight: bold;
          font-size: 30px;
          color: #fff;
          line-height: 3;
          cursor: pointer;
        }

        .overviewDiv{
          height: auto;
          margin: 0 auto;
          text-align: center;
          margin-top: 50px;
        }

        .overviewDiv label{
          font-weight: bold;
          font-size: 20px;
          color: #5a4f4f;
        }

        .stockDiv{
          height: auto;
          margin-top: 50px;
          display: flex;
        }
        
        .stockDiv .stockEachDiv{
          padding: 20px;
        }

        .stockDiv .stockEachDiv label{
          font-size: 20px;
          color: #5a4f4f;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .newsDiv{
          height: auto;
          margin-top: 50px;
          display: inline-block;
          text-align: center;
          margin-botton: 10px;
        }

        .newsDiv label{
          font-size: 20px;
          color: #5a4f4f;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .newsDiv .newsEachDiv{
          padding: 0px 20px 0px 20px;
        }

        .fullWidth{
          width: 100%;
          float: left;
          box-shadow: 0 3px 20px 0 rgb(0 77 165 / 7%);
        }

        .halfWidth{
          width: 50%;
          float: left;
          box-shadow: 0 3px 20px 0 rgb(0 77 165 / 7%);
        }

        .footerDiv{
          width: 100%;
          height: 300px;
        }

        .numberUp{
          background-color: #ff6b6b;
        }
        .numberDown{
          background-color: #6262e9;
        }
      `}</style>

      <style jsx global>{`
        
      `}</style>
    </div>
  )
}
