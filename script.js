const heading = document.getElementById("heading");
const imgContainer = document.getElementById("current-image-container");
const searchForm = document.getElementById("search-form");
const inputDate = document.getElementById("dateInput");
const history = document.getElementById("search-history");

let currentDate = new Date().toISOString().split("T")[0];

const infoTitle = document.createElement("h2");
const infoPara = document.createElement("p");
const img = document.createElement("img");

window.addEventListener("load", () => {
  getCurrentImageOfTheDay();
});

async function getCurrentImageOfTheDay() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=IB4X8z2q7Z4Fftgr9sVTuORlpIKt7cEmliPAmFBc&date=${currentDate}`
    );
    const data = await response.json();
    console.log(data);

    const imgUrl = data?.url;
    img.src = imgUrl;
    img.classList.add("img");
    imgContainer.appendChild(img);

    const title = data?.title;
    infoTitle.textContent = title;
    imgContainer.appendChild(infoTitle);

    const para = data?.explanation;
    infoPara.textContent = para;
    imgContainer.appendChild(infoPara);
  } catch (error) {
    console.log("Error:" + error);
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputDate.value) {
    let selectedDate = new Date(inputDate.value);
    currentDate = selectedDate.toISOString().split("T")[0];
    heading.textContent = `Picture On ${currentDate}`;
    getImageOfTheDay();
    saveSearch();
    addSearchToHistory();
  }
});

async function getImageOfTheDay() {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=IB4X8z2q7Z4Fftgr9sVTuORlpIKt7cEmliPAmFBc&date=${currentDate}`
  );
  const data = await response.json();
  console.log(data);

  const imgUrl = data?.url;
  img.src = imgUrl;
  img.classList.add("img");
  imgContainer.appendChild(img);

  const title = data?.title;
  infoTitle.textContent = title;
  imgContainer.appendChild(infoTitle);

  const para = data?.explanation;
  infoPara.textContent = para;
  imgContainer.appendChild(infoPara);
}

function saveSearch() {
  let DateArr = [];
  DateArr.push(currentDate);
  localStorage.setItem(`Date ${DateArr.length}`, currentDate);
}

function addSearchToHistory() {

    const a = document.createElement("a")
    a.href = ''
    const li = document.createElement("li")
    li.textContent = currentDate;
    a.appendChild(li)
    history.appendChild(a)

    a.addEventListener("click", (event) => {
        event.preventDefault()
        currentDate = li.textContent
        heading.textContent = `Picture of The Day For ${currentDate}`;
        getImageOfTheDay();
    });
}
