var inputDate = document.querySelector('#dob');
var submitButton = document.querySelector('#check-btn');
var result = document.querySelector('.result');


function getAllDateFormats(date) {

    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;

    return [yyyymmdd, ddmmyyyy, mmddyyyy, mmddyy, ddmmyy, yymmdd];
}


function checkReverse(date) {

    return date === date.split('').reverse().join('');
}

function isPalindrome(date) {

    var listOfDates = getAllDateFormats(date);
    for (var i = 0; i < listOfDates.length; i++) {
        if (checkReverse(listOfDates[i])) {
            return true;
        }
    }

    return false;
}

function isLeapYear(year) {
    if (year % 400 == 0) {
        return true;
    }
    if (year % 100 == 0) {
        return true;
    }
    if (year % 4 == 0) {
        return true;
    }

    return false;
}

function getFutureDate(date) {

    var daysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var currmonth = Number(date.month);
    var currday = Number(date.day) + 1;
    var curryear = Number(date.year);

    if (currmonth === 2) {
        if (isLeapYear(date.year)) {
            if (currday > 29) {
                currday = 1;
                currmonth++;
            }
        }
        else {
            if (currday > 28) {
                currday = 1;
                currmonth++;
            }
        }
    }
    else {
        if (currday > daysinMonth[currmonth - 1]) {
            console.log("curr day is ", currday)
            currday = 1;
            currmonth++;
        }
    }
    if (currmonth > 12) {
        curryear++;
        currmonth = 1;
    }

    var newDate = convertDate(currday,currmonth,curryear)

    return newDate;

}


function convertDate(currday,currmonth,curryear){
    var dateInStr = { day: '', month: '', year: '' };
    if(currday <  10){
        dateInStr.day = '0' + currday
    }
    else{
        dateInStr.day = currday.toString();
    }
    if(currmonth <  10){
        dateInStr.month = '0' + currmonth
    }
    else{
        dateInStr.month = currmonth.toString();
    }

    dateInStr.year = curryear.toString();
    return dateInStr;
}


function getPastDate(date) {

    var daysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var currmonth = Number(date.month);
    var currday = Number(date.day) - 1;
    var curryear = Number(date.year);
    if (currday === 0) {
        currmonth--;
    
        if (currmonth === 0) {
          currmonth = 12;
          currday = 31;
          curryear--;
        }
        else if (currmonth === 2) {
          if (isLeapYear(curryear)) {
            currday = 29;
          }
          else {
            currday = 28;
          }
        }
        else {
          currday = daysinMonth[currmonth - 1];
        }
      }
    
    var newDate = convertDate(currday,currmonth,curryear)

    return newDate;

}
function checkFutureDate(date) {
    var count = 0;
    var futureDate = getFutureDate(date);
    // console.log("date is", futureDate)
    while (1) {
        count++;
        if (isPalindrome(futureDate)) {
            return [count, futureDate];
        }
        futureDate = getFutureDate(futureDate)
    }

}


function checkPastDate(date) {
    var count = 0;
    var pastDate = getPastDate(date);
    // console.log("past date is", pastDate)
    while (1) {
        count++;
        if (isPalindrome(pastDate)) {
            return [count, pastDate];
        }
        pastDate = getPastDate(pastDate);
    }

}

function onCLickHandler() {

    var date = inputDate.value;
    if (date === '') {
        result.classList.add('result-err');
        result.innerText = 'Enter valid input to check palindrome date';
    }
    else {
        date = date.split('-');   // 09-08-2022 ==> ['2022', '09', '08']
        //console.log(date)
        date = {
            day: date[2],
            month: date[1],
            year: date[0]
        }

        if (isPalindrome(date)) {
            result.classList.remove('result-err');
            result.innerText = 'Yippe! Your birthday is palindrome';
        }
        else {
            //check next possiblel palindrome
            var futureDate = checkFutureDate(date);

            var pastDate = checkPastDate(date);
            result.classList.remove('result-err');
            // console.log("future date is" ,futureDate,"past date is" ,pastDate)
            if(pastDate[0] < futureDate[0]){
                result.innerText = 'The nearest palindrome date is:' + ' ' + pastDate[0] + " days prior and date is " + pastDate[1].day + "/" + pastDate[1].month + "/" + pastDate[1].year; 
            }
            else
                result.innerText = 'The nearest palindrome date is:' + ' ' + futureDate[0] + " days away and date is " + futureDate[1].day + "/" + futureDate[1].month + "/" + futureDate[1].year;
        }


    }

    // console.log(date)
}


submitButton.addEventListener('click', onCLickHandler)