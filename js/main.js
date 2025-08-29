function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let darkmode = getCookie("theme");

  if (darkmode === "true") {
    document.body.classList.add("darkmode");
    document.getElementsByClassName("darkmodeimage")[0].src = "imgs/sun.png";
  } else {
    document.body.classList.remove("darkmode");
    document.getElementsByClassName("darkmodeimage")[0].src = "imgs/moon.png";
  }
}

function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("darkmode");

  var img = document.getElementsByClassName("darkmodeimage")[0];

  if (body.classList.contains("darkmode")) {
    img.src = "imgs/sun.png";
    setCookie("theme", "true", 365);
  } else {
    img.src = "imgs/moon.png";
    setCookie("theme", "false", 365);
  }
}

function toggleSocialMenu() {
  var socialMenu = document.getElementById("socialMenu");

  socialMenu.classList.toggle("hidden");
}

async function loadGames() {
  const res = await fetch("/api/games");
  const games = await res.json();

  const container = document.getElementById("gameList");
  container.innerHTML = "";

  games.forEach((game, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<a href="game.html?id=${i}">${game.name} (${game.category})</a>`;
    container.appendChild(div);
  });
}