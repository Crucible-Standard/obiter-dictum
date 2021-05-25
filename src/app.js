const { logger, format } = require('sst');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const pkjson = require('../package.json');
const dictum = require('./models/dictum');

const app = express();

// adding helmet to enhance api security
app.use(helmet());

// using bodyParser to parse json bodies into js objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// request count resets on dynamo spin down, as intended
let requestsCount = 0;

/** set up cors middleware
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Next} next - Express Next object
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

logger.info('turning on app...');

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Next} next - Express Next object
 * // getStockInfo
 */
app.get('/stock/info', async (req, res, next) => {
  requestsCount++;
  logger.info(`/stock/info request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip}`);
  await dictum.getStockInfo(req).then((response) => {
    res.status(200).send({ response_type: 'in_channel', text: response });
    logger.debug(response);
  }).catch((error) => {
    res.status(400).send({ response_type: 'in_channel', text: response });
  });
}).post('/stock/info', async (req, res, next) => {
  requestsCount++;
  logger.info(`/stock/info request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip}`);
  await dictum.getStockInfo(req).then((response) => {
    res.status(200).send({ response_type: 'in_channel', text: response });
    logger.debug(response);
  }).catch((error) => {
    res.status(400).send({ response_type: 'in_channel', text: response });
  });
});

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Next} next - Express Next object
 * // getChartOne
 */
 app.get('/stock/chart1', async (req, res, next) => {
  requestsCount++;
  logger.info(`/stock/chart1 request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip}`);
  await dictum.getChartOne(req).then((response) => {
    res.status(200).send({ response_type: 'in_channel', text: response });
    logger.debug(response);
  }).catch((error) => {
    res.status(400).send({ response_type: 'in_channel', text: response });
  });
}).post('/stock/chart1', async (req, res, next) => {
  requestsCount++;
  logger.info(`/stock/chart1 request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip}`);
  await dictum.getChartOne(req).then((response) => {
    res.status(200).send({ response_type: 'in_channel', text: response });
    logger.debug(response);
  }).catch((error) => {
    res.status(400).send({ response_type: 'in_channel', text: response });
  });
});

app.get('/stock/chart2', async (req, res, next) => {
  requestsCount++;
  logger.info(`/stock/chart2 request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip}`);
  await dictum.getChartTwo(req).then((response) => {
    res.status(200).send({ response_type: 'in_channel', text: response });
    logger.debug(response);
  }).catch((error) => {
    res.status(400).send({ response_type: 'in_channel', text: response });
  });
}).post('/stock/chart2', async (req, res, next) => {
  requestsCount++;
  logger.info(`/stock/chart2 request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip}`);
  await dictum.getChartTwo(req).then((response) => {
    res.status(200).send({ response_type: 'in_channel', text: response });
    logger.debug(response);
  }).catch((error) => {
    res.status(400).send({ response_type: 'in_channel', text: response });
  });
});


/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Next} next - Express Next object
 */
app.get('/health', (req, res, next) => {
  requestsCount++;
  const time = process.uptime();
  const uptime = format.toDDHHMMSS(time + '');
  logger.info(`/health request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip}`);
  res.status(200).send({ data: {uptime: uptime, version: pkjson.version, requests: requestsCount} });
});

// heroku dynamically assigns your app a port, so you can't set the port to a fixed number.
const server = app.listen(process.env.PORT || 5020, function () {
  const host = server.address().address;
  const port = server.address().port;

  logger.info(`app listening at http://${host}:${port}`);
});

process.on('SIGTERM', () => {
  server.close( () => {
    process.exit(0);
  });
});


module.exports = server;