import "../scss/main.scss";

console.log("Hi, I'm Kamil - nice to meet you 🚀");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const search = document.querySelector(".search-value--js");
const button = document.querySelector(".search-button--js");
const container = document.querySelector('.resluts-list--js');



button.addEventListener("click", () => {
  container.innerHTML = "";
  if (search.value) {
    console.log(search.value);
    fetch("https://images-api.nasa.gov/search?q="+search.value+"&media_type=image")
      .then((resp) => resp.json())
      .then((resp) => {        
        for (let item of resp.collection.items){
          const results = item.links[0].href;
          const width = getRandomInt(200,400);
          const heigth = getRandomInt(200,400);      
          const template = `<img class="search__img" style="width:${width}px; heigth:${heigth}px" src="${results}" />`
          container.innerHTML += template;
          }
        })
      .catch((error) => {
        console.log("nie udało się pobrać");
      });
  }
});