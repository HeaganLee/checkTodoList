let nowMonth = new Date();
let today = new Date();
today.setHours(0,0,0,0);

class Calendar{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new Calendar();
        }
        return this.#instance;
    }

    addEventClick() {
        const pastCalendar = document.querySelector(".past-calendar");
        const nextCalendar = document.querySelector(".next-calendar");

        pastCalendar.onclick = () => {
            this.prevCalendar();
        }

        nextCalendar.onclick = () => {
            this.nextCalendar();
        }
    }

    buildCalendar() {
        let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
        let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

        let tbody_Calendar = document.querySelector(".Calendar > tbody");
        document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
        document.getElementById("calMonth").innerText = this.leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

        while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
            tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
        }

        let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

        for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
            let nowColumn = nowRow.insertCell();        // 열 추가
        }

        for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

            let nowColumn = nowRow.insertCell();        // 새 열을 추가하고


            let newDIV = document.createElement("p");
            newDIV.innerHTML = this.leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
            nowColumn.appendChild(newDIV);

            if (nowDay.getDay() == 6) {                 // 토요일인 경우
                nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
            }

            if (nowDay < today) {                       // 지난날인 경우
                newDIV.className = "pastDay";
            }
            else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                newDIV.className = "today";
                newDIV.onclick = this.choiceDate(newDIV); 
            }
            else {                                      // 미래인 경우
                newDIV.className = "futureDay";
                newDIV.onclick = this.choiceDate(newDIV);
            }
        }
    }

    choiceDate(newDIV) {
        if (document.getElementsByClassName("choiceDay")[0]){
            document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
        }
        newDIV.classList.add("choiceDay");
    }

    prevCalendar() {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth - 1, nowMonth.getDate);
        this.buildCalendar();
    }

    nextCalendar() {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth + 1, nowMonth.getDate);
        this.buildCalendar();
    }

    leftPad(value) {
        if(value < 10) {
            value = "0" + value;
            return value;
        }
        return value;
    }

}