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
  .then(json => renderToys(json))
};

// BEFORE RENDERING CSS TO PAGE
// function renderToys(toys) {
//   const main = document.getElementById('toy-collection');
//   toys.forEach(toy => {
//     const div = document.createElement('div');
//     div.setAttribute("class", "card");
//     div.innerHTML += `<p>Toy Name ${toy.name}</p>
//                       <img src=${toy.image} >
//                       <p> Likes ${toy.likes}</p>`;
//     main.appendChild(div)
//   })
// }

function renderToys(toys) {
  const main = document.getElementById('toy-collection');
  toys.forEach(toy => {
    const div = document.createElement('div');
    div.setAttribute("class", "card");
    div.innerHTML += `<h2>${toy.name}</h2>
                      <img src="${toy.image}" class="toy-avatar" />
                      <p>${toy.likes} Likes </p>
                      <button class="like-btn">Like <3</button>`;
    main.appendChild(div)
  });
};

fetchToys()