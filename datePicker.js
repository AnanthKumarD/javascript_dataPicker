/*
	Building Personalized DatePicker
*/


var eventList = [
	{
		id : 1,
		date : "01-01-2019",
		val: "Break at Taj 234444444",
		time: "12:30"
	},{
		id : 2,
		date : "01-01-2019",
		val: "Lunch at Oberoi"
	},{
		id : 3,
		date : "02-01-2019",
		val: "Lunch at Oberoi"
	},{
		id : 4,
		date : "04-01-2019",
		val: "Lunch at Oberoi"
	},{
		id : 5,
		date : "28-02-2019",
		val: "Lunch at Oberoi"
	},{
		id : 6,
		date : "15-12-2018",
		val: "Lunch at Oberoi"
	}
]


var color_array = ["#ce521d","#ca4b89","#006b89","#3e2d7e","#61902c", "#faa31a", "#6e002a", "#4981b3",
                   "#980069", "#2dacbf", "#ee1d25", "#9cb46f", "#9a869e", "#ee008c", "#00a895",
                   "#7b181a", "#ffd63c", "#b46638", "#bcd634", "#f4ea00", "#32b6c0", "#e8ac1c",
                   "#ea2d50", "#3c7022", "#0085cc", "#97C83B"];


var currentDate;


// To Get the Start and End Date Of the Specified Month

var getCurrentMonth = new Date();
    getCurrentMonth.setMonth( getCurrentMonth.getMonth());

var weekVal = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function creatingDatePickerHeading(containerData,cDataMargin){
	var creatingHeader = document.createElement('div');
	for(i=0;i<weekVal.length;i++){
		var creatingHeaderVal = document.createElement('span')
		creatingHeaderVal.innerHTML = weekVal[i]
		creatingHeaderVal.className = 'weak_heading'
		creatingHeaderVal.style.margin = cDataMargin;
		creatingHeader.appendChild(creatingHeaderVal);
	}	
	document.getElementById(containerData).appendChild(creatingHeader)
}

//Call this Function to get the Current Month by Default
changeMonthView(getCurrentMonth);

//Once the User Clicks on the previous or next button from UI the below function gets called and it will change it to that partiular month
function changeMonth(id){
	if(id == "increment"){
		getCurrentMonth.setMonth( getCurrentMonth.getMonth() + 1);
	}
	if(id == "decrement"){
		getCurrentMonth.setMonth( getCurrentMonth.getMonth() - 1);
	}

	changeMonthView(getCurrentMonth)
}


function noOfDaysInaMonthForEachYear(){
	var mos=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

	for (i = 0; i < 12; i++) {
	    var lastDate = new Date(2019, i+1, 0);
	    document.write('Last day of ' + mos[i] + ' is ' + lastDate.getDate()+'<br>')
	}
}


function changeMonthView(getCurrentMonthVal){
	
	document.getElementById('datepickerContainer').innerHTML = '';
	document.getElementById('monthViewContainer').innerHTML = '';

	document.getElementById("year").innerHTML = getCurrentMonthVal.getFullYear();
	document.getElementById("month").innerHTML = getCurrentMonthVal.getMonth() + 1;
	document.getElementById("currentDate").innerHTML = getCurrentMonthVal.getDate()

	var date = new Date(getCurrentMonthVal), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);
	var lastDay = new Date(y, m + 1, 0);

	var noOfDaysInaMonth = []


	// To Get the Total Number Of Days in a Month
	function daysInThisMonth(date) {
	  return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
	}

	creatingDatePickerHeading('datepickerContainer','15px');
	var flag = 0, n = 1;

	/*=-----------------------------------------------------------=*/
	//Check for MonthStart Filling 
	var lastMonthDays = new Date().setMonth(getCurrentMonth.getMonth() - 1);
	var nextMonthDays = new Date().setMonth(getCurrentMonth.getMonth() + 2);

	lastMonthDays = daysInThisMonth(new Date(lastMonthDays));
	nextMonthDays = daysInThisMonth(new Date(nextMonthDays));
	//console.log(nextMonthDays,'<><><>nextMonthDays')

	monthToStart = weekVal.indexOf((firstDay+1).split(' ')[0])
	
	var counter = 1;
	//Check for MonthEnd Filling 
	/*=-----------------------------------------------------------=*/

	for(i=0;i<6;i++){

		var dayToStart = (firstDay+1).split(' ')[0];
		var totalDays = daysInThisMonth(date);

		var rowContainer = document.createElement('div');
		rowContainer.className = 'row week'+i 

		for(j=0;j<weekVal.length;j++){
			var newNode = document.createElement('div');
			newNode.className = 'col-sm-grid';			

			//Pointing In Calendar in First Row from which day to Start
			if( i == 0 && j == weekVal.indexOf(dayToStart)){
				flag = 1;
			}


			//Constructing the Date
			if(flag == 1 && n <= totalDays){
				newNode.innerHTML = n;


				var foundValue = eventList.filter(obj=>{
					//This is for Creating an Event inside a calendar based on the Date Value
					var dateVal = ('0' + n).slice(-2);
					var monthVal = ('0' + (getCurrentMonthVal.getMonth()+1)).slice(-2);

					var constructedDate = dateVal+'-'+monthVal+'-'+getCurrentMonthVal.getFullYear();

					if(obj.date === constructedDate.toString()){
						var spanList = document.createElement('span');
						var eventList = document.createElement('li');
						eventList.id = obj.date;
						eventList.innerHTML = obj.val;
						eventList.className = "eventValue";
						
						// Pick a random colour of the array
						var random_color = color_array[Math.floor(Math.random()*color_array.length)];
						eventList.style.color = random_color;
						//$(val).css("color",random_color);
						spanList.appendChild(eventList)
						newNode.appendChild(spanList); 
					}
					
				});
				//To Hightlight the current Date
				if(n == getCurrentMonthVal.getDate()){
					currentDate = (currentDate == undefined) ? n : currentDate;
					newNode.style.background = 'red';
				}
				newNode.id = n;
				newNode.addEventListener("click", this.handler.bind(this));
				//document.getElementById(n).click() = reply_click;

				n++;
			}else{
				if(monthToStart){
					console.log(monthToStart,'monthToStart',lastMonthDays)
					newNode.innerHTML = lastMonthDays - (monthToStart-1);
					monthToStart--;
				}else{
					newNode.innerHTML = counter++;
				}
					
			}

			rowContainer.appendChild(newNode); 
		}

		document.getElementById('datepickerContainer').appendChild(rowContainer); 
		// document.getElementById('datepickerContainer').style.width = "250px"; 
		// document.getElementById('datepickerContainer').style.height = "250px";
	}

	console.log('StartDay :-',firstDay,'\n LastDat :-',lastDay ,' \n ');

}

function handler(event){
	var target = event.target || event.srcElement;
    console.log(target.id,'>>>>',currentDate);

    document.getElementById(currentDate).style.background = 'white';
    document.getElementById(target.id).style.background = 'red';

    currentDate = target.id;
}



/*

var curr = new Date;
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));


*/

//monthViewContainer
function changeCalendarView(id){
	
	if(id == "monthView"){
		changeMonthView(getCurrentMonth);
	}else{
		document.getElementById('monthViewContainer').innerHTML = '';
		document.getElementById('datepickerContainer').innerHTML = '';
		console.log(id);
		if(id == "weekView"){
			creatingDatePickerHeading('monthViewContainer','55px');
			totalDataToDisplay = 7
		}
		if(id == "dayView"){
			totalDataToDisplay = 1
		}
		
		var quarterHours = ["00","30"];
		var times = [];
		for(var i = 0; i < 24; i++){
			for(var j = 0; j < 2; j++){
				var time = i + ":" + quarterHours[j];
				if(i < 10){
					time = "0" + time;
				}
				times.push(time);
			}
		}

		
		for(i=0;i<totalDataToDisplay;i++){
			var rowContainer = document.createElement('div');
			rowContainer.className = 'weekly_view '+i

			for(j=0;j<48;j++){

				var rowContainerList = document.createElement('li');
				rowContainerList.className = 'weekly_view_list '+i
				rowContainerList.innerHTML = times[j];
				rowContainerList.style.width = (id == "dayView") ?  "800px" : "150px";

				if(j%2 == 1){
					rowContainerList.style.borderBottom = '3px solid';
				}else{
					rowContainerList.style.borderBottom = '0.5px dotted';
				}
				rowContainer.appendChild(rowContainerList); 
			}
			document.getElementById('monthViewContainer').appendChild(rowContainer); 
		}
	}
	//console.log(weekGrid)
}