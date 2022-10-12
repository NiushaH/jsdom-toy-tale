document.addEventListener("click", (event)=>{ console.log(" 👀👀👀 :: You Just Clicked on == ", event.target) } )

const toyCollection = document.querySelector('#toy-collection')
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
  getToys()
  // USE QUERY SELECTOR('ELEMENT.CLASS') TO GET document.getElementbyClassName('add-toy-form')
  document.querySelector('form.add-toy-form').addEventListener("submit", postToy)
  });

  function getToys() {fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => renderToys(data))
};

function postToy(formData) {
  document.querySelector(".container").style.display = "none"
  formData.preventDefault();
  document.querySelector(".container").display = "none"

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: formData.target.name.value,
      image: formData.target.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(data => { addNewToy(data) })
  .catch(error => console.log(error))
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
// };

function renderToys(data) {
  const main = document.getElementById('toy-collection');
  data.forEach(toy => {
    // Take toys array and make HTML with them in order to add them to the DOM
    const div = document.createElement('div');
    div.setAttribute("class", "card");
    div.innerHTML += `<h2>${toy.name}</h2>
                      <img src="${toy.image}" class="toy-avatar" />
                      <p>${toy.likes} Likes </p>
                      <button data-id="${toy.id}" class="like-btn">Like <3</button>`;
    main.appendChild(div)
    btn.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    }) 
  });

};

function addNewToy(toy) {
  const main = document.getElementById('toy-collection');
  const divNewToy = document.createElement('div');
  divNewToy.id = toy.id
  divNewToy.setAttribute("class", "card")
  divNewToy.innerHTML += `<h2>${toy.name}</h2>
                          <img src="${toy.image}" class="toy-avatar" />
                          <p>${toy.likes} Likes </p>
                          <button data-id="${toy.id}" class="like-btn">Like <3</button>`;
                      //  document.querySelector('button.like-btn').addEventListener('click', (e) => {
                      //    console.log(e.target.dataset);
                      //    likes(e)
                      //  )
  main.appendChild(divNewToy)
};

// function increaseToyLikes(data) {
//   const toys = document.getElementById('toy-collection');

//   data.forEach(toy => {
//     let likeButton = document.getElementById('like-btn');
//   })
// };

// Check out e.preventDefault, e.target.dataset, and e.target.previousElementSibling
toyCollection.addEventListener('click', (e) => {
  if (e.target.className === "like-btn"){
    
    console.log(e.target.previousElementSibling.innerText)
  }
})



function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  const toyLike = e.target.likes.value

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}
    