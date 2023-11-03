
//#region CLASSES


class Clock {

  getAmPmTime(miliTm) {
    if (miliTm < 12) {
      var rtnStr = miliTm + " AM";
    } else {
      if (miliTm > 12) {
        miliTm -= 12;
      }
      var rtnStr = miliTm + " PM";
    }
    return rtnStr;
  }

  getFormattedDate() {
    var nowDate = dayjs().format('dddd, MMMM D');
    var nowOrdinal = this.getOrdinal(this.getNowMonthDay());
    var dateWithOrdinal = nowDate.concat(nowOrdinal);
    return dateWithOrdinal;
  }

  getNowHour() {
    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    return nowHour;
  }

  getNowMonthDay() {
    var nowDate = new Date();
    var nowMonthDay = nowDate.getDate();
    return nowMonthDay;
  }

  getOrdinal(monthDay) {
    var stArr = [1,21,31];
    if (stArr.includes(monthDay)) {
      return "st";
    }
    var ndArr = [2,22];
    if (ndArr.includes(monthDay)) {
      return "nd";
    }
    var rdArr = [3,23];
    if (rdArr.includes(monthDay)) {
      return "rd";
    }
    return "th";
  }

  getTimeRowTense(miliTm) {
    var nowHour = this.getNowHour();
    if (miliTm < nowHour) {
      return "past";
    }
    if (miliTm == nowHour) {
      return "present";
    }
    return "future";
  }

}
var clock = new Clock();


class Head {

  initHead() {
    var headCon = $("#head-con");
    headCon.attr("class","p-5 mb-4 text-center");
    var headTitle = $("<h1>");
    headTitle.attr("class","display-3");
    headTitle.text("Work Day Scheduler");
    $("#head-con").append(headTitle);
    var headP1 = $("<p>");
    headP1.attr("class","lead");
    headP1.text("A simple calendar app for scheduling your work day");
    $("#head-con").append(headP1);
    var headP2 = $("<p>");
    headP2.attr("id","currentDay");
    headP2.attr("class","lead");
    headP2.text(clock.getFormattedDate());
    $("#head-con").append(headP2);
  }

}
var head = new Head();


class Row {

  constructor() {
    this.focusBtn = 0;
    this.focusText = 0;
  }
  
  createListenerBtn(miliTm,timeBtn) {
    timeBtn.on('click', function() {
      var keyVal = "id-" + miliTm;
      var textVal = storage.getTextFromTextArea(miliTm);
      storage.setKeyValue(keyVal,textVal);
    });
  }
  
  createListenerText(miliTm,textArea) {
    textArea.on('click', function() {
      this.focusText = miliTm;
    });
  }
  
  createTimeRows() {
    var mainCon = $("#main-con");
    mainCon.attr("class","container-fluid px-5");
    for (var militaryTime=9; militaryTime<18; militaryTime++) {
      var miliTm = militaryTime;
      this.createTimeRowOuterDiv(miliTm);
    }
  }

  createTimeRowOuterDiv(miliTm) {
    var rowDiv = $("<div>");
    var hourId = "hour-" + miliTm;
    rowDiv.attr("id",hourId);
    var outClassStr = "row time-block ";
    outClassStr += clock.getTimeRowTense(miliTm);
    rowDiv.attr("class",outClassStr);
    $("#main-con").append(rowDiv);
    this.createTimeRowTimeDiv(miliTm,rowDiv);
  }

  createTimeRowTimeDiv(miliTm,rowDiv) {
    var timeDiv = $("<div>");
    var time = "in-time-" + miliTm;
    timeDiv.attr("id",time);
    var timeClassStr = "col-2 col-md-1 hour text-center py-3";
    timeDiv.attr("class",timeClassStr);
    timeDiv.text(clock.getAmPmTime(miliTm));
    $(rowDiv).append(timeDiv);
    this.createTimeRowTextArea(miliTm,rowDiv);
  }

  createTimeRowTextArea(miliTm,rowDiv) {
    var textArea = $("<textarea>");
    var textId = "text-" + miliTm;
    textArea.attr("id",textId);
    textArea.attr("class","col-8 col-md-10 description");
    textArea.attr("rows",3);
    $(rowDiv).append(textArea);
    this.createListenerText(miliTm,textArea);
    this.createTimeRowBtn(miliTm,rowDiv);
  }

  createTimeRowBtn(miliTm,rowDiv) {
    var timeBtn = $("<btn>");
    timeBtn.attr("class","btn saveBtn col-2 col-md-1");
    timeBtn.attr("aria-label","save");
    $(rowDiv).append(timeBtn);
    this.createListenerBtn(miliTm,timeBtn);
    var italicStuff = $("<i>");
    italicStuff.attr("class","fas fa-save");
    italicStuff.attr("aria-hidden","true");
    $(timeBtn).append(italicStuff);
  }

  updateAllFromStorage() {
    for (var militaryTime=9; militaryTime<18; militaryTime++) {
      var miliTm = militaryTime;
      var key = "id-" + miliTm;
      var storedValue = this.getValue(key);
      var textID = this.getTextID(miliTm);
      $(textID).text(storedValue);
    }
  }

}
var row = new Row();


class Storage {

  getTextFromTextArea(row) {
    var textID = this.getTextID(row);
    var textVal = $(textID).val();
    return textVal;
  }

  getTextID(row) {
    var textID = "#text-" + row;
    return textID;
  }

  getValue(key) {
    var value = localStorage.getItem(key);
    return value;
  }

  setKeyValue(key,value) {
    localStorage.setItem(key,value);
  }

}
storage = new Storage();

//#endregion

//#region INIT


function main() {
  head.initHead();
  row.createTimeRows();
  row.updateAllFromStorage();
}

main();


//#endregion


// HARRY:
// NOTE: put the listener on the div with ID as event bubbling will occur


// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });
