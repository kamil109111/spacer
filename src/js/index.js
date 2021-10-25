import "../scss/main.scss";

console.log("Hi, I'm Kamil - nice to meet you 🚀");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const search = document.querySelector(".search-value--js");
const button = document.querySelector(".search-button--js");
const inputSearch = document.querySelector(".input-value--js");
const inputButton = document.querySelector(".input-button--js");
const container = document.querySelector(".resluts-list--js");
const hero = document.querySelector(".hero--js");
const input = document.querySelector(".input--js");

button.addEventListener("click", () => {
  container.innerHTML = "";
  if (search.value) {    
    console.log(search.value);
    inputSearch.value = search.value;
    hero.classList.add("animate__animated", "animate__fadeOutUp");
    setTimeout(() => {
      hero.style.display = "none";
    }, 1000);
    setTimeout(() => {
      input.style.display = "flex";
    }, 1000);
    inputSearch.classList.add("animate__animated", "animate__zoomIn");
    inputButton.classList.add("animate__animated", "animate__zoomIn");
    fetch(
      "https://images-api.nasa.gov/search?q=" +
        search.value +
        "&media_type=image"
    )
      .then((resp) => resp.json())
      .then((resp) => {
        for (let item of resp.collection.items) {
          const results = item.links[0].href;
          const width = getRandomInt(200, 400);
          const heigth = getRandomInt(200, 400);
          const template = `<img class="search__img" style="width:${width}px; heigth:${heigth}px" src="${results}" />`;
          container.innerHTML += template;
        }
        setTimeout(() => {}, 2000);
        container.classList.add("animate__animated", "animate__fadeInUp");
      })
      .catch((error) => {
        console.log("nie udało się pobrać");
      });
  }
});

inputButton.addEventListener("click", () => {   
  container.classList.remove("animate__animated", "animate__fadeInUp");  
  container.classList.add("animate__animated", "animate__fadeOutDown");
  container.innerHTML = "";  
  if (inputSearch.value) {    
    console.log(inputSearch.value);
    fetch(
      "https://images-api.nasa.gov/search?q=" +
        inputSearch.value +
        "&media_type=image"
    )
      .then((resp) => resp.json())
      .then((resp) => {
        for (let item of resp.collection.items) {
          const results = item.links[0].href;
          const width = getRandomInt(200, 400);
          const heigth = getRandomInt(200, 400);
          const template = `<img class="search__img" style="width:${width}px; heigth:${heigth}px" src="${results}" />`;
          container.innerHTML += template;
        }
        container.classList.remove("animate__animated", "animate__fadeOutDown");      
        setTimeout(() => {}, 2000);
        container.classList.add("animate__animated", "animate__fadeInUp");
      })
      .catch((error) => {
        console.log("nie udało się pobrać");
      });
  }

});
