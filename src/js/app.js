const cards = document.querySelectorAll(".data-card");
const btnDaily = document.querySelector("button#daily");
const btnWeekly = document.querySelector("button#weekly");
const btnMonthly = document.querySelector("button#monthly");

let timeframe = "weekly";

fetch("data.json")
  .then((res) => res.json())
  .then((data) => handleTimeframeChange(data))
  .catch((err) => console.error(err));

function handleTimeframeChange(data) {
  btnDaily.addEventListener("click", () => {
    timeframe = "daily";
    btnWeekly.classList.remove("active");
    btnMonthly.classList.remove("active");
    btnDaily.classList.add("active");
    changeCardData(data);
  });

  btnWeekly.addEventListener("click", () => {
    timeframe = "weekly";
    btnDaily.classList.remove("active");
    btnMonthly.classList.remove("active");
    btnWeekly.classList.add("active");
    changeCardData(data);
  });

  btnMonthly.addEventListener("click", () => {
    timeframe = "monthly";
    btnDaily.classList.remove("active");
    btnWeekly.classList.remove("active");
    btnMonthly.classList.add("active");
    changeCardData(data);
  });
}

function changeCardData(data) {
  let msg;

  switch (timeframe) {
    case "daily":
      msg = "Yesterday";
      break;

    case "weekly":
      msg = "Last Week";
      break;

    case "monthly":
      msg = "Last Month";
      break;
  }

  cards.forEach((card, i) => {
    const current = card.querySelector(".current");
    const previous = card.querySelector(".previous");

    current.innerHTML = `${data[i]["timeframes"][timeframe]["current"]}hrs`;
    previous.innerHTML = `${msg} - ${data[i]["timeframes"][timeframe]["previous"]}hrs`;
  });
}
