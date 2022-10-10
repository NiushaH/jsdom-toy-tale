document.addEventListener("click", (event)=>{ console.log(" 👀👀👀 :: You Just Clicked on == ", event.target) } )


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  // .then(json => console.log(json))
  .then(json => renderToys(json))
}

function renderToys(toys) {
  const main = document.getElementById('toy-collection');
  toys.forEach(toy => {
    const div = document.createElement('div')
    div.innerHTML = toy.image, toy.name, toy.likes
    main.appendChild(div)
  })
}
