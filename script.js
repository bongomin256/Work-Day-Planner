var dayDisplayEl = $('#currentDay');
var textEl = $('.daily-text')
var hourlyEl = $('.hour') 

var saveBtn = $('.saveBtn');

// display function to display the current day, Month and date.
function displayDay() {
    var today = moment().format('dddd, MMMM Do');
    dayDisplayEl.text(today);
};

// This function check what time we are at and update the colors
function hourCheck() {
    var timeBlock = $(".time-block");

    //loop over the timeBlock
    for(var i = 0; i < timeBlock.length; i++) {
        // var blockHour = parseInt($(this).attr('id').split('-')[1]);
        var hourDiv = timeBlock[i].children[0].id;
        //converting 
        var parseHourDiv = parseInt(hourDiv)
        var currentHour = moment().hour()
        var currentTimeBlock = timeBlock[i].children[1]
            
        // check if we've moved past this time
        if (parseHourDiv < currentHour) {

            $(currentTimeBlock).addClass('past');
        } else if (parseHourDiv === currentHour) {
            $(currentTimeBlock).removeClass('past');
            $(currentTimeBlock).addClass('present');
        } else {
            $(currentTimeBlock).removeClass('past');
            $(currentTimeBlock).removeClass('present');
            $(currentTimeBlock).addClass('future');
        }
    };
};
hourCheck();

// This function gets saved in the local storage .
function getItem() {
    
    //creating a variable timeBlock that will hold all the elements with a class time-block
    var timeBlock = $(".time-block");
    console.log(timeBlock[0].children[0].textContent)

    // using for loop to check if there is anything in the local storage 
    for(var i = 0; i < timeBlock.length; i++) {
       var savedText = localStorage.getItem(timeBlock[i].children[0].textContent)
       //changing the text area to what have been saved already
       timeBlock[i].children[1].value = savedText
    }
}
//calling the getItem function
getItem()


function saveText(event) {
    //creating a varibale which is going to save what we are targetting to save in the local storage
    var myEvent = event.target.parentElement.parentElement.children

    //saving all the changes made in the local storage.
    localStorage.setItem(myEvent[0].textContent, myEvent[1].value);

}

// adding event handler to the saveBtn
saveBtn.on('click', saveText)

// calling the displayDay function and setting the time and date
setInterval(displayDay, 1000);