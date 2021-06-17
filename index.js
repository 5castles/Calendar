const todayInfo = document.querySelector(".js-date-info-box"),
    day = todayInfo.querySelector(".day"),
    date = todayInfo.querySelector(".date"),
    month = todayInfo.querySelector(".month"),
    year = todayInfo.querySelector(".year"),
    calendarArea = document.querySelector(".js-calendar-area"),
    calendarBox = calendarArea.querySelector(".js-calendar-box"),
    dayColumn = calendarBox.getElementsByClassName("day-column"),
    previousMonth = calendarArea.querySelector(".pre-month-btn"),
    nextMonth = calendarArea.querySelector(".next-month-btn");


const dayObj = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
}
const monthObj = {
    0: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AUG",
    8: "SEP",
    9: "OCT",
    10: "NOV",
    11: "DEC"
}

const monthObjReverse ={
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11
}

const daysInMonth = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}

//Obj 프로퍼티 키값 읽기 -  Obj[key값]
function getTodayInfo(){
    const makeDate = new Date();
    const dayNumNow = makeDate.getDay(); // 0~6
    const dateNow = makeDate.getDate();
    const monthNumNow = makeDate.getMonth(); //0~11
    const yearNow = makeDate.getFullYear();
    day.innerText = dayObj[dayNumNow];     
    date.innerText = dateNow;
    month.innerText = monthObj[monthNumNow];
    year.innerText = yearNow;
    //현재 월의 1일이 무슨 요일인지 판별 후 해당 요일 라벨링에 1일 표기하기
    checkDay(yearNow, monthNumNow);

}


function checkDay(year, month){
    const check = new Date(year, month);
    const dayOfFirstDate = check.getDay();     // 현재 달의 첫째날 요일!!
    const currentMonth = check.getMonth();
    paintFirstWeek(dayOfFirstDate, currentMonth) 
} 

function paintFirstWeek(dayNumber, month){
    //달력 요일 id 와 대조 -> 일치하는 요일에 "1일" 표기
    //dayColumn[i].addEventListner("change", handleChange);
    const theFirstDay = [];
    for(i=0; i<7; i++){
        const day = dayColumn[i];
        if(parseInt(day.id) === dayNumber){
            const firstDate = document.createElement("span");
            firstDate.innerText = "1";
            day.appendChild(firstDate);
            theFirstDay.push(firstDate.parentNode);
        } else if(parseInt(day.id) < dayNumber){
            const noMatch = document.createElement("span");
            noMatch.innerText = "-";
            day.appendChild(noMatch);
        } else if(parseInt(day.id) > dayNumber){
            //(요일number - 1일의 요일Number)의 값만큼 1에 더하기.   
            const num = parseInt(day.id) - parseInt(theFirstDay[0].id);
            const days = document.createElement("span");
            days.innerText = 1+num;
            day.appendChild(days)            
        }
    }
    const totalDays = daysInMonth[month]; //  monthNumber 를 인자로 넣어야한다. !- 수정했음일단.
    paintTheRest(totalDays);
 
}

function paintTheRest(total){
    const notNull = [];
    for(i=0; i<7; i++){
        const day = dayColumn[i];
        const count = day.lastChild.innerText;

        if(parseInt(count) !== null && (parseInt(count)+7) <= total){
            const number = document.createElement("span");
            number.innerText = parseInt(count) +7;
            day.appendChild(number);
            notNull.push(i);
            while((parseInt(day.lastChild.innerText)+7) <= total){
                const number = document.createElement("span");
                number.innerText = parseInt(day.lastChild.innerText) +7;
                day.appendChild(number);
            }
        } 

    }
    const dayNumOfFirstdate = notNull[0]
    for(j=0; j<dayNumOfFirstdate; j++){
        const day = dayColumn[j];
        const number = document.createElement("span");
        number.innerText = 8 - (dayNumOfFirstdate-j)
        day.appendChild(number);
        while((parseInt(day.lastChild.innerText))+7 <= total){
            const number = document.createElement("span");
            number.innerText = parseInt(day.lastChild.innerText) +7;
            day.appendChild(number);
        }
    }
    addEventListenerClickedUpdate();
}


//다음 달, 이전 달 보기 버튼 클릭시, 현재 캘린더 클린 
function cleanCalendar(){
    for(i=0; i<7; i++){
        
        let yes = dayColumn[i];

        while(yes.firstElementChild !== yes.lastElementChild){
            yes.removeChild(yes.lastChild)
        }        
    }
}


function moveToNextMonth(){
    cleanCalendar();
    const makeDate = new Date();
    const yearNow = makeDate.getFullYear();
    //현재 페이지의 month info 가져와서 +1 = 다음달 정보 가져오기 
    const currentMonthNumber = monthObjReverse[month.innerText];
    const makeNextMonth = new Date(yearNow, currentMonthNumber+1);

    const dayNum = makeNextMonth.getDay(); // 0~6
    const dateOfNext = makeNextMonth.getDate();
    const monthNum = makeNextMonth.getMonth(); //0~11
    const yearOfNext = makeNextMonth.getFullYear();
    
    day.innerText = dayObj[dayNum];     
    date.innerText = dateOfNext;
    month.innerText = monthObj[monthNum];
    year.innerText = yearOfNext;

    checkDay(yearOfNext, monthNum);
}

function moveToPreviousMonth(){
    cleanCalendar();
    const makeDate = new Date();
    const yearNow = makeDate.getFullYear();
    //이전 달 정보 가져오기 - 현재 페이지의 month info 가져와서 -1  
    const currentMonthNumber = monthObjReverse[month.innerText];
    const makePreviousMonth = new Date(yearNow, currentMonthNumber-1);

    const dayNum = makePreviousMonth.getDay(); // 0~6
    const dateOfPre = makePreviousMonth.getDate();
    const monthNum = makePreviousMonth.getMonth(); //0~11
    const yearOfPre = makePreviousMonth.getFullYear();
    
    day.innerText = dayObj[dayNum];     
    date.innerText = dateOfPre;
    month.innerText = monthObj[monthNum];
    year.innerText = yearOfPre;

    checkDay(yearOfPre, monthNum);
}

function colorUpdate(anything){
    for(i=0; i<7; i++){
        const dateOnCal = dayColumn[i].querySelectorAll("span")
        for(j=1; j<=dateOnCal.length -1; j++){ //dataOnCal 마지막요소에 unidentified 있는데. 이것을 제외하지 않으면 아래에서 addEventListener 함수를 실행시킬수가 없다. 왜 unidentified가 마지막에 있는지 지금은 모르지만 일단 함수를 실행시키기 위해서 -1해주었다.
            dateOnCal[j].classList.remove("clicked");
        }
    }
    anything.classList.add("clicked");
}
function clickedDateUpdate(event){
    const clicked = event.target;
    colorUpdate(clicked);
    const clickedDayNum = parseInt(clicked.parentNode.id);
    const clickedDate = clicked.innerText;

    date.innerText = clickedDate;
    day.innerText = dayObj[clickedDayNum];
    
}
function addEventListenerClickedUpdate(){
    for(i=0; i<7; i++){
        const dateOnCal = dayColumn[i].querySelectorAll("span")
        for(j=1; j<=dateOnCal.length -1; j++){ //dataOnCal 마지막요소에 unidentified 있는데. 이것을 제외하지 않으면 아래에서 addEventListener 함수를 실행시킬수가 없다. 왜 unidentified가 마지막에 있는지 지금은 모르지만 일단 함수를 실행시키기 위해서 -1해주었다.
            dateOnCal[j].addEventListener("click", clickedDateUpdate)
        
        }
    }
}

function firstColor(){
    for(i=0; i<7; i++){
        const dateOnCal = dayColumn[i].querySelectorAll("span")
        for(j=1; j<=dateOnCal.length -1; j++){ //dataOnCal 마지막요소에 unidentified 있는데. 이것을 제외하지 않으면 아래에서 addEventListener 함수를 실행시킬수가 없다. 왜 unidentified가 마지막에 있는지 지금은 모르지만 일단 함수를 실행시키기 위해서 -1해주었다.
            //달력에 날짜 빨간색 색칠업데이트 
            const makeDate = new Date();
            const dateNow = makeDate.getDate();
            if(parseInt(dateOnCal[j].innerText) === dateNow){
                colorUpdate(dateOnCal[j]);
            }
        }
    }
}
function init(){
    getTodayInfo();
    firstColor();
    previousMonth.addEventListener("click", moveToPreviousMonth);
    nextMonth.addEventListener("click", moveToNextMonth);
}

init();