import "../scss/main.scss";

console.log("Hi, I'm Kamil - nice to meet you 🚀");

const search = document.querySelector(".search-value--js");
const button = document.querySelector(".search-button--js");


button.addEventListener("click", () => {
  if (search.value) {
    console.log(search.value);
    fetch("https://images-api.nasa.gov/search?q="+search.value+"&media_type=image")
      .then((resp) => resp.json())
      .then((resp) => {         
        const container = document.querySelector('.resluts-list--js');
        for (let item of resp.collection.items){
          const results = item.links[0].href;      
          const template = `<img class="search__img" src="${results}" />`
          container.innerHTML += template;
          }
        })
      .catch((error) => {
        console.log("nie udało się pobrać");
      });
  }
});