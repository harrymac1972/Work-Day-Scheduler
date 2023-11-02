// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


class Row{
  
  createTimeRows() {
    var mainCon = $("#main-con");    
    mainCon.attr("class","container-fluid px-5");
    for (var militaryTime=9; militaryTime<18; militaryTime++){
      var miliTm = militaryTime;
      this.createTimeRowOuterDiv(miliTm);
    }
  }

  createTimeRowOuterDiv(miliTm){
    var rowDiv = $("<div>");
    var hour = "hour-" + miliTm;
    rowDiv.attr("id",hour);
    var outClassStr = "row time-block ";
    outClassStr += clock.getTimeRowTense(miliTm);
    rowDiv.attr("class",outClassStr);
    $("#main-con").append(rowDiv);
    this.createTimeRowTimeDiv(miliTm,rowDiv);
  }

  createTimeRowTimeDiv(miliTm,rowDiv){
    var timeDiv = $("<div>");
    var time = "in-time-" + miliTm;
    timeDiv.attr("id",time);
    var timeClassStr = "col-2 col-md-1 hour text-center py-3";
    timeDiv.attr("class",timeClassStr);
    timeDiv.text(clock.getAmPmTime(miliTm));
    $(rowDiv).append(timeDiv);
    this.createTimeRowTextArea(rowDiv);
  }

  createTimeRowTextArea(rowDiv){    
    var textArea = $("<textarea>");
    textArea.attr("class","col-8 col-md-10 description");
    textArea.attr("rows",3);
    $(rowDiv).append(textArea);
    this.createTimeRowButton(rowDiv);
  }

  createTimeRowButton(rowDiv){
    var timeBtn = $("<btn>");
    timeBtn.attr("class","btn saveBtn col-2 col-md-1");
    timeBtn.attr("aria-label","save");
    $(rowDiv).append(timeBtn);
    var italicStuff = $("<i>");
    italicStuff.attr("class","fas fa-save");
    italicStuff.attr("aria-hidden","true");
    $(timeBtn).append(italicStuff);
  }

}
var row = new Row();


class Clock{

  getAmPmTime(miliTm){
    if (miliTm < 12){
      var rtnStr = miliTm + " AM";
    } else {
      if (miliTm > 12){
        miliTm -= 12;
      }
      var rtnStr = miliTm + " PM";
    }
    return rtnStr;
  }

  getNowHour(){
    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    return nowHour;
  }

  getTimeRowTense(miliTm){
    var nowHour = this.getNowHour();
    if (miliTm < nowHour){
      return "past";
    }
    if (miliTm == nowHour){
      return "present";
    }
    return "future";
  }

}
var clock = new Clock();




function main(){
  row.createTimeRows();
}

main();













$(function () {
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
});




/* {<div id="hour-9" class="row time-block past">
<div class="col-2 col-md-1 hour text-center py-3">9AM</div>
<textarea class="col-8 col-md-10 description" rows="3"> </textarea>
<button class="btn saveBtn col-2 col-md-1" aria-label="save">
  <i class="fas fa-save" aria-hidden="true"></i>
</button>
</div>}*/
