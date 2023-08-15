
const calendar = document.querySelector("#calendar");
const monthBanner = document.querySelector("#month");
let navigation = 0;
let clicked = null;
// let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];

var events = [{date: "2023-07-14", time: "9:33:00 AM", lateMinutes: 33},
{date: "2023-07-17", time: "9:15:00 AM", lateMinutes: 15},
{date: "2023-07-18", time: "9:36:00 AM", lateMinutes: 36}]

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function loadCalendar() {
    const btnNext = document.querySelector("#btnNext");
  
    if (navigation === 0) {
      btnNext.disabled = true;
    } else {
      btnNext.disabled = false;
    }
    
  const dt = new Date();

  if (navigation != 0) {
    dt.setMonth(new Date().getMonth() + navigation);
  }
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;
  calendar.innerHTML = "";
  const dayInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayofMonth = new Date(year, month, 1);
  const dateText = firstDayofMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const dayString = dateText.split(", ")[0];
  const emptyDays = weekdays.indexOf(dayString);

  for (let i = 1; i <= dayInMonth + emptyDays; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");
    const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
    const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
    // const dateText = `${dateVal}-${monthVal}-${year}`;
    const dateText = `${year}-${monthVal}-${dateVal}`;
    if (i > emptyDays) {
      dayBox.innerText = i - emptyDays;
      //Event Day
      const eventOfTheDay = events.find((e) => e.date == dateText);
      //Holiday
    //   const holidayOfTheDay = holidays.find((e) => e.hdate == dateText);

      if (i - emptyDays === day && navigation == 0) {
        dayBox.id = "currentDay";
      }

      if (eventOfTheDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        if (eventOfTheDay.lateMinutes > 40) {
          eventDiv.classList.add("more");
        } else if (eventOfTheDay.lateMinutes > 15) {
          eventDiv.classList.add("much");
        } else if (eventOfTheDay.lateMinutes > 0) {
          eventDiv.classList.add("little");
        }
        
        eventDiv.innerText = eventOfTheDay.lateMinutes;

        if(eventOfTheDay.note) {
            const noteDiv = document.createElement("span");
            noteDiv.innerText = eventOfTheDay.note;
            eventDiv.appendChild(noteDiv);
        }



        dayBox.appendChild(eventDiv);
      }
    //   if (holidayOfTheDay) {
    //     const eventDiv = document.createElement("div");
    //     eventDiv.classList.add("event");
    //     eventDiv.classList.add("holiday");
    //     eventDiv.innerText = holidayOfTheDay.holiday;
    //     dayBox.appendChild(eventDiv);
    //   }
    } else {
      dayBox.classList.add("plain");
    }
    calendar.append(dayBox);
  }
}
function buttons() {
  const btnBack = document.querySelector("#btnBack");
  const btnNext = document.querySelector("#btnNext");

  btnBack.addEventListener("click", () => {
    navigation--;
    loadCalendar();
  });
  btnNext.addEventListener("click", () => {
    navigation++;
    loadCalendar();
  });

}



buttons();
loadCalendar();
