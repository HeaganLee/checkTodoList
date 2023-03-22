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
        let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
        let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);

        let tbody_Calendar = document.querySelector(".Calendar > tbody");
        document.getElementById("calYear").innerText = nowMonth.getFullYear();
        document.getElementById("calMonth").innerText = this.leftPad(nowMonth.getMonth() + 1);

        while (tbody_Calendar.ariaRowSpan.length > 0) {
            tbody_Calendar.deleteRow(tbody_Calendar.ariaRowSpan.length -1);
        }

        let nowRow = tbody_Calendar.insertRow();

        for (let j = 0; j < firstDate.getDay(); j++) {
            let nowColumn = nowRow.insertCell();

            let newDIV = document.createElement("p");
            newDIV.innerHTML = this.leftPad(nowDay.getDate());
            nowColumn.appendChild(newDIV);

            if (nowDay.getDay() == 6) {
                nowRow = tbody_Calendar.insertRow();
            }

            if (nowDay < today) {
                newDIV.className = "pastDay";
            }else if(nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()){
                newDIV.className = "today";
                newDIV.onclick = function() {this.choiceDate(this);}
            }else{
                newDIV.className = "futureDay";
                newDIV.onclick = function () {this.choiceDate(this);}
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