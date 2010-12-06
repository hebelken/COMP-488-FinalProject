use stocks_yahoo_NYSE;


// Query to find date for moving average...
// > db.A_prices.find({stock_symbol: "AA", date: {$lte: "1990-10-15"}}).sort({date: -1})[199].date


var beginDate = '2001-01-01';
var endDate = '2001-03-01';

var map1 = function () {
  var delta = 0;
  delta = Math.abs(this.close - this.open)  
  emit(this.stock_symbol, {delta: delta});
};


var reduce1 = function (key, values) {

  var avg = 0;
  var sum = 0;
  for (var n in values)
      sum += values[n].delta; 
  avg = sum / values.length
  return {delta: avg};
};


var result1 = db.A_prices.mapReduce(map1, reduce1, { query: {date: {$gte: beginDate, $lte: endDate}}});

// Get the answer from result1. Note the find() call:   
var answer = db[result1.result].find().sort({value: -1}).limit(5);
var symbolArray = new Array();
answer.forEach(function(i) {symbolArray.push(i._id); /*print (i._id + ": " + i.value.delta);*/});



// simple moving average

var map2 = function () {
 var windowSize = 1;
 var array = db.A_prices.find({stock_symbol: this.stock_symbol, date: {$lte: this.date}}).sort({date: -1}).limit(windowSize);
 var answer = array.toArray();
  emit(this.date, {symbol: this.stock_symbol, avg: answer});
}

var reduce2 = function (key, values) {

  // Now compute the moving average:
  var sum = 0;

  for (var n = 0; n<values[0].avg.length; n++) {
	sum += values[0].avg[n].close;
  }
  var answer = sum / values[0].avg.length;

  // Return the result, using the same keys as before!!
  return {symbol: values[0].avg[0].stock_symbol, avg: answer};
}


var movingAvgs = new Array();
for (var k = 0; k<5; k++){

  var result2 = db.A_prices.mapReduce(map2, reduce2, { query: {stock_symbol: symbolArray[k], date: {$gte: beginDate, $lte: endDate}}});
  movingAvgs.push(db[result2.result].find())
}


// fetch candle stick

var candleInfo = db.A_prices.find({stock_symbol: symbolArray[0], date: {$gte: beginDate, $lte: endDate}});
var candleArray = candleInfo.toArray();


// output

var array1 = movingAvgs[0].toArray();
print("#" + array1[0].value.symbol)
print("# Date	SMA	open	low	high	close")
for (var g in array1){
	print(array1[g]._id + "	" + array1[g].value.avg + "	" + candleArray[g].open + "	" + candleArray[g].low + "	" + candleArray[g].high + "	" + candleArray[g].close);
}

//movingAvgs[1];
//movingAvgs[2];
//movingAvgs[3];
//movingAvgs[4];
  