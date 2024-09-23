document.querySelector("form").addEventListener("submit", (event) => {
  //to avoid page refresh
  event.preventDefault();

  const { value } = document.querySelector("input");
  let header = document.querySelector("h1");
  if (value.includes("@")) {
    header.innerHTML = "Form Submit";
  } else {
    header.innerHTML = "Invalid Email";
  }
});

//TODO:
// window.stuffLoaded = true;
