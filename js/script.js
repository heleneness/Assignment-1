const filter = ["created", "edited"];
const baseUrl = "https://swapi.dev/api";
const menuBar = document.getElementById("menuBar");
const content = document.getElementById("content");


// Fetch data from URL, iterate data, exclude species and starships

fetch(baseUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (const key in data) {
      if (key !== "species" && key !== "starships") {
        
        let menuItem = document.createElement("a");
        menuItem.innerText = key;
        menuItem.href = data[key];
        menuItem.className = "menuItem";
        menuItem.addEventListener("click", menuClick);
        menuBar.appendChild(menuItem);
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });


// Handle menu

async function menuClick(e) {
  e.preventDefault();

  document.querySelector(".active")?.classList.remove("active");
  e.target.classList.add("active");

  const data = await getData(e.target.href);
  showData(data);

  document.querySelector(".intro")?.classList.add("hidden");
}

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}


// Iterate result in the data

function showData(data) {
  content.innerHTML = "";

  data.results.slice(0, 6).forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";


    // Images

    const image = document.createElement("img");
    const imageName = item.name ? `${item.name}.png` : `${item.title}.png`;
    const imageTitle = item.name ? `${item.name}.png` : `${item.title}.png`;
    image.src = `../assets/${imageName}`;
    image.title = imageTitle;

    card.appendChild(image);

    for (const [key, value] of Object.entries(item)) {
      try {
        if (
          typeof value === "object" ||
          filter.includes(key) ||
          value.includes("https")||
          key === "species" ||
          key === "starships"
        ) {
          continue;
        } else {
          const p = document.createElement("p");
          p.innerHTML = `${titleCase(key)}: ${value}`;
          card.appendChild(p);
          content.appendChild(card);
        }
      } 
      
      catch (error) {
      }
    }
  });
}


// Display data

async function showAllData(data) {
  clearContent(content);

  const card = document.createElement("div");
  card.className = "card";
  content.appendChild(card);

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object") {
      const title = document.createElement("p");
      title.innerHTML = key;

      const indented = document.createElement("div");
      indented.className = "indented";
      indented.appendChild(title);

      for (const item in value) {
        const p = document.createElement("p");

        p.innerHTML = value[item];
        indented.appendChild(p);
      }

      card.appendChild(indented);
    } else {
      const p = document.createElement("p");
      p.innerHTML = `${key}: ${value}`;

      card.appendChild(p);
    }
  }
}

function clearContent(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Styling background gradient based on scroll position

const titleCase = (s) =>
  s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());

window.onscroll = () => {
  let scrollTop = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);

  document.getElementById(
    "scroller"
  ).style.backgroundImage = `linear-gradient(to bottom, rgb(249, 226, 43) ${scrollPercentRounded}%, #0000 ${scrollPercentRounded}%)`;
};
