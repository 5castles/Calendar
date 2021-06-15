const todayInfo = document.querySelector(".js-date-info-box"),
    day = todayInfo.querySelector(".day"),
    date = todayInfo.querySelector(".date"),
    month = todayInfo.querySelector(".month"),
    year = todayInfo.querySelector(".year");

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

function getDate(){
    const makeDate = new Date();
    const dayNum = makeDate.getDay();
    //Obj 프로퍼티 키값 읽기 참고 https://poiemaweb.com/js-object#3-%EA%B0%9D%EC%B2%B4-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-%EC%A0%91%EA%B7%BC
    day.innerText = dayObj[dayNum];     
    date.innerText = makeDate.getDate();
    const monthNum = makeDate.getMonth();
    month.innerText = monthObj[monthNum];
    year.innerText = makeDate.getFullYear();
}


function init(){
    getDate();
}

init();


/* 
달력만들기(요일별 라벨 만들기...)


"현재 월의 1일이 무슨 요일인지 판별하고"// 해당 요일 라벨링에 1일 표기하기
const verifyDay = new Date(1995, 11, 1);
const dayOfFirstDate = dayObj.[verifyDay.getDay()];
*/