const { logger, format } = require('sst');
const finvizor = require('finvizor');
const fetch = require("node-fetch");
const fs = require('fs');
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());
const imgurUploader = require('imgur-uploader');

const sharp = require('sharp');
 
 

const main = async () => {
  const stock = await finvizor.stock('AAPL')
  console.log(stock)
}

function getChartOne (req) {
  return new Promise(async (resolve, reject) => {
		if (((req.query.ticker) && req.query.ticker.length > 0) || ((req.body.text) && req.body.text.length > 0)) {
			const args = req.query.ticker || req.body.text;
			const returnstring = `https://api.wsj.net/api/kaavio/charts/big.chart?nosettings=1&symb=${args}&type=4&time=1&freq=9&style=320&lf=1&lf2=0&lf3=0&size=3&height=335&width=579&mocktick=1&rr=${new Date().getTime()}`

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
			const returnstring = `https://charts.finviz.com/chart.ashx?width=400&height=151&t=${args}&p=i5&ty=c&s=l&rr=${new Date().getTime()}`

			resolve(returnstring);
		} else {
			resolve(`Please use the endpoint with a get param of 'ticker'. example https://orbiter-dictum.herokuapp.com/stock/chart2?ticker=AMD`);
		}
  });
}

function getHeatMap (req) {
  return new Promise(async (resolve, reject) => {
		const url = ``;
		let returnstring = ``;
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				logger.warn(
					`Error fetching ${response.status}, ${response.message}`
				);
				resolve("Are you trying to make me crash?");
			}
		} catch (error) {
			logger.error(`Error trying to getEvents ${error}`);
			resolve("Are you trying to make me crash?");
		}


		resolve(returnstring);
  });
}

function getHeatMapTwo (req) {
  return new Promise(async (resolve, reject) => {
		let  returnstring = ``;
		try {
			// puppeteer usage as normal
			// NOTE: this configuration does not normally work on heroku, but you can get it to work with buildpacks that equal outside the ~300mb limit for free open source software. 
			// also overall its a terrible idea, although if you had to make it work, a good caching strategy makes up for bad code. 
			puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
				// open the browser and prepare a page
				const page = await browser.newPage();

				// set the size of the viewport, so our screenshot will have the desired size
				await page.setViewport({
					width: 1280,
					height: 800
				});

				page.goto('https://finviz.com/map.ashx?t=sec');
				
				await page.waitForTimeout(500);

				await page.screenshot({ path: 'map.png', fullPage: true });

				// close the browser 
				await browser.close();

				sharp('map.png').extract({ width: 1050, height: 640, left: 210 , top: 170 }).toFile('mapc.png')
					.then(async (new_file_info) => {
						await imgurUploader(fs.readFileSync('mapc.png'),
							{title: `Heat Map ${new Date().getTime()}`}
						).then(data => {
							resolve(data.link);
					}).catch(function(err) {
						logger.error("An error occured" + err);
				});
				}).catch(function(err) {
						logger.error("An error occured"+ err);
				});

				logger.info(`All done, check the screenshot. ✨`);
			});

		} catch (error) {
			logger.error(`An error occured`);
		}
  });
}

function getHeatMapThree (req) {
  return new Promise(async (resolve, reject) => {
		let  returnstring = ``;
		try {
			puppeteer.launch().then(async browser => { // { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
				// open the browser and prepare a page
				const page = await browser.newPage();

				// set the size of the viewport, so our screenshot will have the desired size
				await page.setViewport({
					width: 1280,
					height: 800
				});

				await page.goto('https://finance.yahoo.com/most-active/heatmap/');
				

				await page.screenshot({ path: 'map.png', fullPage: true });

				// close the browser 
				await browser.close();

				sharp('map.png').extract({ width: 1240, height: 720, left: 20 , top: 630 }).toFile('mapc.png')
					.then(async (new_file_info) => {
						await imgurUploader(
							fs.readFileSync('mapc.png'),
							{title: `Heat Map ${new Date().getTime()}`
						}
					).then(data => {
						resolve(data.link);
					}).catch(function(err) {
						logger.error("An error occured" + err);
				});
				}).catch(function(err) {
						logger.error("An error occured"+ err);
				});
				logger.info(`All done, check the screenshot. ✨`);
			});

		} catch (error) {
			logger.error(`An error occured`);
		}
  });
}

function getStockInfo (req) {
  return new Promise(async (resolve, reject) => {
		if (((req.query.ticker) && req.query.ticker.length > 0) || ((req.body.text) && req.body.text.length > 0)) {
			const args = req.query.ticker || req.body.text;
			try { 
				const stock = await finvizor.stock(args);
				stock.change = (stock.change < 0) ? `📉 (${stock.change})%` : `📈 ${stock.change}%`;
				// stock.targetPrice = (stock.targetPrice < stock.price) ? `🚨 ${stock.targetPrice}` : `✔️ ${stock.targetPrice}`;
				const returnstring = 
`> *${stock.ticker}* - *${stock.name}*
> *Current Price:* ${stock.price}	${stock.change}
> *52-week Range:* ${stock.range52W.low} - ${stock.range52W.high}
> *Target Price:* ${stock.targetPrice}
> *Current Volume:* ${stock.volume}
> *Average Volume:* ${stock.avgVolume}
> *Sector:* ${stock.sector}
> *Industry:* ${stock.industry}
> *Country:* ${stock.country}
> *Insider Ownership:* ${stock.insiderOwn}%
> *Shares Outstanding:* ${stock.shsOutstand}
> *Shares Float:* ${stock.shsFloat}
> *Short Ratio:* ${stock.shortRatio}`;
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

module.exports = {getStockInfo, getChartOne, getChartTwo, getHeatMapTwo, getHeatMapThree}