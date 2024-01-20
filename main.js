let overview = ["main", "films", "people", "planets", "vehicles"];

function color() {
  return "hsl(" + Math.floor(Math.random() * 360) + "deg,100%,40%)";
}


let urls = {
  main: "index.html",
  films: "films.html",
  people: "people.html",
  planets: "planets.html",
  vehicles: "vehicles.html",
};

for (let i = 0; i < overview.length; i++) {
  let circleBox = document.createElement("div");
  circleBox.className = "circleBox";

  let div = document.createElement("div");
  div.id = overview[i];
  div.className = "circles";
  div.style.background =
    "radial-gradient(circle at 33% 66%," + color() + "," + color() + ")";
  div.innerHTML = overview[i].toUpperCase();

  div.addEventListener("click", function () {
    window.location.href = urls[overview[i]];
  });

  let info = document.createElement("div");
  info.className = "info";

  document.querySelector("#menu-container").appendChild(circleBox).append(div, info);
}
