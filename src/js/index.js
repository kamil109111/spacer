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
container.style.setProperty('--animate-duration', '2s');
const hero = document.querySelector(".hero--js");
const input = document.querySelector(".input--js");
const loader = document.querySelector(".loader--js");



button.addEventListener("click", () => {
  container.innerHTML = "";
  if (search.value) {
    console.log(search.value);
    inputSearch.value = search.value;
    hero.classList.add("animate__animated", "animate__fadeOutUp");
    setTimeout(() => {hero.style.display = "none";}, 1000);
    setTimeout(() => {input.style.display = "flex";}, 1000);
    inputSearch.classList.add("animate__animated", "animate__zoomIn");
    inputButton.classList.add("animate__animated", "animate__zoomIn");
    fetch("https://images-api.nasa.gov/search?q="+search.value+"&media_type=image")
      .then((resp) => resp.json())
      .then((resp) => {
        let i = 0;
        for (let item of resp.collection.items) {
          i ++;
          const results = item.links[0].href;
          const title = item.data[0].title;
          const description = item.data[0].description;
          const width = getRandomInt(200, 400);
          const heigth = getRandomInt(200, 400);
          const template = 
          `
          <img class="search__img" id="${i}" onclick="openModal(${i})" style="width:${width}px; heigth:${heigth}px" src="${results}"/>
          <div id="modal${i}"  class="modal modal--js">         
          <div class="modal-content">                   
          <span class="close" onclick="closeModal(${i})" >&times;</span>
          <div class="modal-main">  
          <img class="modal-image" src="${results}"/>
          <div class="modal-text">
          <h1 class="modal-title">${title}</h1> 
          <p class="modal-description">${description}</p>
          </div>
          </div>
          </div>
          `;           
          container.innerHTML += template;          
        }
        setTimeout(container.classList.add("animate__animated", "animate__fadeInUp"), 2000);      
      })
      .catch((error) => {
        console.log("nie udało się pobrać");
      });
  }
})

inputButton.addEventListener("click", () => {

  window.scroll(0,0);
  container.classList.remove("animate__animated", "animate__fadeInUp");
  container.classList.add("animate__animated", "animate__fadeOutDown");
  setTimeout(() => { 
  if (inputSearch.value) {
    console.log(inputSearch.value);
    container.innerHTML = "";
    fetch(
      "https://images-api.nasa.gov/search?q=" +
        inputSearch.value +
        "&media_type=image"
    )
      .then((resp) => resp.json())
      .then((resp) => {
        let i = 0;
        for (let item of resp.collection.items) {
          i ++;
          const results = item.links[0].href;
          const title = item.data[0].title;
          const description = item.data[0].description;
          const width = getRandomInt(200, 400);
          const heigth = getRandomInt(200, 400);
          const template = 
          `
          <img class="search__img" id="${i}" onclick="openModal(${i})" style="width:${width}px; heigth:${heigth}px" src="${results}"/>
          <div id="modal${i}"  class="modal modal--js">         
          <div class="modal-content">                   
          <span class="close" onclick="closeModal(${i})" >&times;</span>
          <div class="modal-main">  
          <img class="modal-image" src="${results}"/>
          <div class="modal-text">
          <h1 class="modal-title">${title}</h1> 
          <p class="modal-description">${description}</p>
          </div>
          </div>
          </div>
          `;           
          container.innerHTML += template;          
        }
        container.classList.remove("animate__animated", "animate__fadeOutDown");
        setTimeout(container.classList.add("animate__animated", "animate__fadeInUp"), 2000);        
      })
      .catch((error) => {
        console.log("nie udało się pobrać");
      });
  } 
  ;}, 2000);
});




