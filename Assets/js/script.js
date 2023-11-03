
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

  blipFeedback(miliTm) {
    var btnID = storage.getBtnID(miliTm);
    $(btnID).css("background-color", "lightblue");
    $("#feedback").text("Appointment Added to");
    $("#feedback-red").text("localStorage");
    $("#feedback-check").text("\u2713");
    setTimeout(() => {
      $(btnID).css("background-color","#06AED5");  
      $("#feedback").text("");
      $("#feedback-red").text("");
      $("#feedback-check").text("");
    }, 2050);
  }

  init() {
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

  initFeedback(mainCon) {
    var feedbackDiv = $("<div>");
    feedbackDiv.attr("id","feedback-div");
    var feedbackH6 = $("<h6>");
    feedbackH6.attr("id","feedback");
    var feedbackH6red = $("<h6>");
    feedbackH6red.attr("id","feedback-red");
    var feedbackCheck = $("<h6>");
    feedbackCheck.attr("id","feedback-check");
    mainCon.append(feedbackDiv);
    feedbackDiv.append(feedbackH6);
    feedbackDiv.append(feedbackH6red);
    feedbackDiv.append(feedbackCheck);
  }

}
var head = new Head();


class Row {

  constructor() {
    this.focusBtn = 0;
    this.focusText = 0;
  }
  
  createAll() {
    var mainCon = $("#main-con");
    mainCon.attr("class","container-fluid px-5");
    head.initFeedback(mainCon);
    for (var militaryTime=9; militaryTime<18; militaryTime++) {
      var miliTm = militaryTime;
      this.createOuterDiv(miliTm);
    }
  }

  createOuterDiv(miliTm) {
    var rowDiv = $("<div>");
    var hourId = "hour-" + miliTm;
    rowDiv.attr("id",hourId);
    var outClassStr = "row time-block ";
    outClassStr += clock.getTimeRowTense(miliTm);
    rowDiv.attr("class",outClassStr);
    $("#main-con").append(rowDiv);
    this.createTimeDiv(miliTm,rowDiv);
  }

  createTimeDiv(miliTm,rowDiv) {
    var timeDiv = $("<div>");
    var time = "in-time-" + miliTm;
    timeDiv.attr("id",time);
    var timeClassStr = "col-2 col-md-1 hour text-center py-3";
    timeDiv.attr("class",timeClassStr);
    timeDiv.text(clock.getAmPmTime(miliTm));
    $(rowDiv).append(timeDiv);
    this.createTextArea(miliTm,rowDiv);
  }

  createTextArea(miliTm,rowDiv) {
    var textArea = $("<textarea>");
    var textId = "text-" + miliTm;
    textArea.attr("id",textId);
    textArea.attr("class","col-8 col-md-10 description");
    textArea.attr("rows",3);
    $(rowDiv).append(textArea);
    this.createBtn(miliTm,rowDiv);
  }

  createBtn(miliTm,rowDiv) {
    var timeBtn = $("<btn>");
    var btnId = "btn-" + miliTm;
    timeBtn.attr("id",btnId);
    timeBtn.attr("class","btn saveBtn col-2 col-md-1");
    timeBtn.attr("aria-label","save");
    $(rowDiv).append(timeBtn);
    this.makeBtnListener(miliTm,timeBtn);
    var italicStuff = $("<i>");
    italicStuff.attr("class","fas fa-save");
    italicStuff.attr("aria-hidden","true");
    $(timeBtn).append(italicStuff);
  }

  makeBtnListener(miliTm,timeBtn) {
    timeBtn.on('click', function() {
      var keyVal = "id-" + miliTm;
      var textVal = storage.getTextFromTextArea(miliTm);
      storage.setKeyValue(keyVal,textVal);
      head.blipFeedback(miliTm);
    });
  }
  
  updateAllFromStorage() {
    for (var militaryTime=9; militaryTime<18; militaryTime++) {
      var miliTm = militaryTime;
      var key = "id-" + miliTm;
      var storedValue = storage.getValue(key);
      var textID = storage.getTextID(miliTm);
      $(textID).text(storedValue);
    }
  }

}
var row = new Row();


class Storage {

  getBtnID(row) {
    var btnID = "#btn-" + row;
    return btnID;
  }

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
  head.init();
  row.createAll();
  row.updateAllFromStorage();
}

main();


//#endregion