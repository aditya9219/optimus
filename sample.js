/*use 6 arguments for running in seconds, use 5 arguments to run after a minute or more
*1Seconds
*2Minutes
*3Hours
*4Day-of-Month
*5Month
*6Day-of-Week
*7Year (optional field)
*/
var scheduler = require('node-schedule');//to use node scheduler

var secondlyJobPerMin = scheduler.scheduleJob('*/30 * * * * *', function(){
 console.log('it will run after 30 one second');
});

var MorethanOneMinute = scheduler.scheduleJob('*/1 * * * *', function(){
  console.log('it will run every minute');
});
 var midnight = scheduler.scheduleJob('1 0 * * *',function(){  // midnight (00:01) every day
 console.log('it will run in midnight (00:01) every day');
});
var every_Saturday = scheduler.scheduleJob('45 23 * * 6',function(){  // every_Saturday at 11:45 pm
 console.log('it will run in midnight (00:01) every day');
});
var everyMonthFirstDayMidnight = scheduler.scheduleJob('0 0 1 * *',function(){  // Run once a month at midnight of the first day of the month
 console.log('it will everyMonthFirstDayMidnight');
});
var  julySecondAt2pm= scheduler.scheduleJob('0 14 2 7 *',function(){  // Run on july second at 2pm
 console.log('it will Run on july second at 2pm');
});
