const { logger, format } = require('sst');
const finvizor = require('finvizor')

const main = async () => {
  const stock = await finvizor.stock('AAPL')
  console.log(stock)
}

function getChartOne (req) {
  return new Promise(async (resolve, reject) => {
		if (((req.query.ticker) && req.query.ticker.length > 0) || ((req.body.text) && req.body.text.length > 0)) {
			const args = req.query.ticker || req.body.text;
			const returnstring = `https://api.wsj.net/api/kaavio/charts/big.chart?nosettings=1&symb=${args}&type=4&time=1&freq=9&style=320&lf=1&lf2=0&lf3=0&size=3&height=335&width=579&mocktick=1&rr=1621494896124`

			resolve(returnstring);
		} else {
			resolve(`Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/stock/chart1?ticker=AMD`);
		}
  });
}

function getChartTwo (req) {
  return new Promise(async (resolve, reject) => {
		if (((req.query.ticker) && req.query.ticker.length > 0) || ((req.body.text) && req.body.text.length > 0)) {
			const args = req.query.ticker || req.body.text;
			const returnstring = `https://charts.finviz.com/chart.ashx?width=400&height=151&t=${args}&p=i5&ty=c&s=l&rr=1621494261509`

			resolve(returnstring);
		} else {
			resolve(`Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/stock/chart2?ticker=AMD`);
		}
  });
}


function getStockInfo (req) {
  return new Promise(async (resolve, reject) => {
		if (((req.query.ticker) && req.query.ticker.length > 0) || ((req.body.text) && req.body.text.length > 0)) {
			const args = req.query.ticker || req.body.text;
			try { 
				const stock = await finvizor.stock(args);

				const returnstring = 
`> -----------------------------------------------
> ${stock.ticker} - ${stock.name}
> Current Price: ${stock.price} 	  				${stock.change}
> Current Volume: ${stock.volume}						Average Volume: ${stock.avgVolume}
> Sector: ${stock.sector} 									Industry: ${stock.industry}
> Insider Ownership: ${stock.insiderOwn}%	 	Shares Outstanding: ${stock.shsOutstand}`;
				resolve(returnstring);
			} catch(error) {
				logger.error(`Error ${error}`);
				resolve('Are you trying to make me crash?');
			}
		} else {
			resolve(`Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/stock/info?ticker=SNDL`);
		}
  });
}

module.exports = {getStockInfo, getChartOne, getChartTwo}