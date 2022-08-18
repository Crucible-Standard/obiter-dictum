const { logger, format } = require("sst");
const finvizor = require("finvizor");
const util = require("util");

function getChartOne(req) {
  /*eslint-disable */
  return new Promise(async (resolve) => {
    /*eslint-enable */
    if (
      (req.query.ticker && req.query.ticker.length > 0) ||
      (req.body.text && req.body.text.length > 0)
    ) {
      const args = req.query.ticker || req.body.text;
      const returnstring = `https://api.wsj.net/api/kaavio/charts/big.chart?nosettings=1&symb=${args}&type=4&time=1&freq=9&style=320&lf=1&lf2=0&lf3=0&size=3&height=335&width=579&mocktick=1&rr=${new Date().getTime()}`;

      resolve(returnstring);
    } else {
      resolve(
        `Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/stock/chart1?ticker=AMD`
      );
    }
  });
}

function getChartTwo(req) {
  /*eslint-disable */
  return new Promise(async (resolve) => {
    /*eslint-enable */
    if (
      (req.query.ticker && req.query.ticker.length > 0) ||
      (req.body.text && req.body.text.length > 0)
    ) {
      const args = req.query.ticker || req.body.text;
      const returnstring = `https://charts.finviz.com/chart.ashx?width=400&height=151&t=${args}&p=i5&ty=c&s=l&rr=${new Date().getTime()}`;

      resolve(returnstring);
    } else {
      resolve(
        `Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/chart/finviz/day?ticker=AMD`
      );
    }
  });
}

function getFinVizChartWeek(req) {
  /*eslint-disable */
  return new Promise(async (resolve) => {
    /*eslint-enable */
    if (
      (req.query.ticker && req.query.ticker.length > 0) ||
      (req.body.text && req.body.text.length > 0)
    ) {
      const args = req.query.ticker || req.body.text;
      const returnstring = `https://charts.finviz.com/chart.ashx?width=400&height=151&t=${args}&p=i15&ty=c&s=l&rr=${new Date().getTime()}`;

      resolve(returnstring);
    } else {
      resolve(
        `Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/chart/finviz/week?ticker=AMD`
      );
    }
  });
}

function getFinVizChartYear(req) {
  /*eslint-disable */
  return new Promise(async (resolve) => {
    /*eslint-enable */
    if (
      (req.query.ticker && req.query.ticker.length > 0) ||
      (req.body.text && req.body.text.length > 0)
    ) {
      const args = req.query.ticker || req.body.text;
      const returnstring = `https://charts.finviz.com/chart.ashx?width=400&height=151&t=${args}&p=i100&ty=c&s=l&rr=${new Date().getTime()}`;

      resolve(returnstring);
    } else {
      resolve(
        `Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/chart/finviz/year?ticker=AMD`
      );
    }
  });
}

function getStockInfo(req) {
  /*eslint-disable */
  return new Promise(async (resolve) => {
    /*eslint-enable */
    if (
      (req.query.ticker && req.query.ticker.length > 0) ||
      (req.body.text && req.body.text.length > 0)
    ) {
      const args = req.query.ticker || req.body.text;
      try {
        const stock = await finvizor.stock(args);
        stock.change =
          stock.change < 0 ? `📉 (${stock.change})%` : `📈 ${stock.change}%`;
        stock.targetPrice =
          stock.targetPrice < stock.price
            ? `${stock.targetPrice} 🚩`
            : `${stock.targetPrice} ✅`;
        stock.rsi =
          stock.rsi > 70
            ? `📉 ${stock.rsi} Overbought 🚩`
            : stock.rsi < 30
            ? `📈 ${stock.rsi} Oversold ✅`
            : `${stock.rsi}`;
        console.log(util.inspect(stock));
        const sma20a = (stock.sma20 - stock.price)>0 ? `${stock.sma20 - stock.price} (${stock.sma20}) 🚩` : `${stock.sma20 - stock.price} (${stock.sma20})  ✅`;
        const sma50a = (stock.sma50 - stock.price)>0 ? `${stock.sma50 - stock.price} (${stock.sma50}) 🚩` : `${stock.sma50 - stock.price} (${stock.sma50})  ✅`;
        const sma200a = (stock.sma200 - stock.price)>0 ? `${stock.sma200 - stock.price} (${stock.sma200}) 🚩` : `${stock.sma200 - stock.price} (${stock.sma200})  ✅`;
        const returnstring = `> *${stock.ticker}* - *${stock.name}*
> *Current Price:* ${stock.price}	${stock.change}
> *Relative Strength Index (RSI):* ${stock.rsi}
> *52-week Range:* ${stock.range52W.low} - ${stock.range52W.high}
> *Target Price:* ${stock.targetPrice}
> *Market Cap:* ${format.formatMoney(stock.marketCap)}
> *Current Volume:* ${stock.volume}
> *Average Volume:* ${stock.avgVolume}
> *Sector:* ${stock.sector}
> *Industry:* ${stock.industry}
> *Country:* ${stock.country}
> *Insider Ownership:* ${stock.insiderOwn}%
> *Shares Outstanding:* ${stock.shsOutstand}
> *Shares Float:* ${stock.shsFloat}
> *sma20:* ${stock.sma20} (${stock.sma20a})
> *sma50:* ${stock.sma50} (${stock.sma50a})
> *sma200:* ${stock.sma200} (${stock.sma200a})`;
        resolve(returnstring);
      } catch (error) {
        logger.error(`Error ${error}`);
        resolve("Are you trying to make me crash?");
      }
    } else {
      resolve(
        `Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/stock/info?ticker=SNDL`
      );
    }
  });
}

module.exports = {
  getStockInfo,
  getChartOne,
  getChartTwo,
  getFinVizChartWeek,
  getFinVizChartYear,
};
