# obiter-dictum

[![Issues](https://img.shields.io/github/issues/Crucible-Standard/obiter-dictum.svg)](https://github.com/Crucible-Standard/obiter-dictum/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Crucible-Standard/obiter-dictum/blob/main/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/Crucible-Standard/obiter-dictum/badge.svg)](https://github.com/Crucible-Standard/obiter-dictum/)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Crucible-Standard/obiter-dictum.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Crucible-Standard/obiter-dictum/alerts/) 
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Crucible-Standard/obiter-dictum.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Crucible-Standard/obiter-dictum/context:javascript)

A small financial api / tool which is used to get short delayed information about stock tickers from finviz's and other APIs. 

The main usage is to get images for discord and slack servers, however it also is used to get some bare metrics on a ticker/symbol. 

The api is default consumable to slack, and often is used for discord inlue of paid services. 



# Usage

## Querying Endpoints

Each request is fetching informatin about a specific company or asset, we pass that symbol as `ticker` which you can pass in two different ways. 

In a `GET` Request you can use the query parameter `ticker` can be passed to specify which company or asset you would like to retrieve info about. 

```
curl https://obiter-dictum-prod.herokuapp.com/stock/info?ticker=m
```

or 

In a `POST` Request `ticker` can be the value for the key `text` in the body of a `POST`, make sure to pass the `"Content-Type: application/json"` header, and valid json. 

```
curl 
  -X POST https://obiter-dictum-prod.herokuapp.com/stock/info
  -H "Content-Type: application/json"
  -d '{"text": "m"}'  
```

## REST Endpoints 

### /chart/finviz/day

When you pass the `ticker` it will return a live data image from Finviz of the Daily Chart.

#### Example Request

```
curl https://obiter-dictum-prod.herokuapp.com/chart/finviz/day?ticker=m
```

### /stock/chart1

a Different Daily chart

#### Example Request

```
curl https://obiter-dictum-prod.herokuapp.com/stock/chart1?ticker=m
```

### /chart/finviz/week

When you pass the `ticker` it will return a live data image from Finviz of the Weekly Chart.

#### Example Request

```
curl https://obiter-dictum-prod.herokuapp.com/chart/finviz/week?ticker=m
```

### /chart/finviz/year

When you pass the `ticker` it will return a live data image from Finviz of the YTD Chart.

#### Example Request

```
curl https://obiter-dictum-prod.herokuapp.com/chart/finviz/year?ticker=m
```

### /stock/info

Returns generic stock info for each symbol. This is mostly used to see the price range, relative RSI and basic infromation.

Full list of information returned: 

 * **Current Price** - returns the share price in USD, the daily percentage move, and an emoji up or down chart.
 * **Relative Strength Index (RSI)** - exactly what it says
 * **52-week Range** - The 52-week high and low range.
 * **Target Price** - based on the PT from finviz, returns the average PT, and ✅ emoji if the price is below PT, if below.   31.77 
 * **Market Cap** - total market cap in dollars
 * **Current Volume** - current day's trading volume in shares
 * **Average Volume** - current day's trading volume in shares
 * **Sector** - exactly what it says
 * **Industry** - exactly what it says
 * **Country** - exactly what it says
 * **Insider Ownership** - percentage of shares owned inside
 * **Shares Outstanding** - company's stock currently held by all its shareholders, including share blocks held by institutional investors ect...
 * **sma20** - Simple Moving Average 20 days
 * **sma50** - Simple Moving Average 50 days
 * **sma200** - Simple Moving Average 200 days

#### Example Request

```
curl https://obiter-dictum-prod.herokuapp.com/stock/info?ticker=m
```

#### Example Response 

```json
{
   "response_type":"in_channel",
   "text":"> *M* - *Macy's, Inc.*\n
   > *Current Price:* 21.19\t📈 4.46%\n
   > *Relative Strength Index (RSI):* 37.51\n
   > *52-week Range:* 15.55 - 37.95\n
   > *Target Price:* 31.77 ✅\n
   > *Market Cap:* $5,950,000,000.00\n
   > *Current Volume:* 9537007\n
   > *Average Volume:* 13570000\n
   > *Sector:* Consumer Cyclical\n
   > *Industry:* Department Stores\n
   > *Country:* USA\n
   > *Insider Ownership:* 0.2%\n
   > *Shares Outstanding:* 299270000\n
   > *Shares Float:* 298620000\n
   > *sma20:* -13.63 ✅\n
   > *sma50:* -14.74 ✅\n
   > *sma200:* -14.89 ✅"
}
```

### 

### Contributions

Just open a PR, i doubt anyone will contribute... prove me wrong.
