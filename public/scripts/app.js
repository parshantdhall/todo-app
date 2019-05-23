const cardContainer = document.querySelector('.card-container');
let inpt = document.querySelector('input[name="name"]');

// Fetching function
let fetching = (url, reqType, data) => {

  return fetch(url, {
    method: reqType,
  }).then(res => {
    if(!res.ok ) {
      throw Error("Error");
    }
    return res.json();
  }).catch(err => {
    console.log(err);
  });
}

// Function to add Data to page
let addData = (todoText, id, completed) => {
  let card = document.createElement('li'),
      p = document.createElement('p'),
      div = document.createElement('div'),
      span1 = document.createElement('span'),
      span2 = document.createElement('span');

  card.setAttribute('class', 'card');
  card.setAttribute('data-id', id);

  // Adding done class if completed is true
  if(completed) {
    card.classList.add('done');
  }

  p.setAttribute('class', 'card__text');
  div.setAttribute('class', 'card__btns');
  span1.setAttribute('class', 'btn btn--del');
  span2.setAttribute('class', 'btn btn--edit');

  p.textContent = todoText;
  span1.innerHTML = '<i class="fas fa-trash"></i>';
  span2.innerHTML = '<i class="fas fa-pencil-alt"></i>';

  div.appendChild(span1);
  div.appendChild(span2);

  card.appendChild(p);
  card.appendChild(div);

  // Adding event listener
  card.addEventListener('click', completion.bind(card, id));
  span1.addEventListener('click', deletion.bind(span1, id, card));

  cardContainer.appendChild(card);  
}

// completion function
const completion = function(id) {
  fetching(`/api/todos/${id}`, 'PUT')
  .then(data => {
    // data.completed = !data.completed;
    this.classList.toggle('done');
  });
  // console.log(this);
}

// Deletion function
const deletion = function(id, card) {
  fetching(`/api/todos/${id}`, 'DELETE')
  .then(() => {
    console.log("deletion successful");
    // Removing child from container
    cardContainer.removeChild(card);
  })
}

// Getting todos
window.addEventListener('load', () => {
  fetching('/api/todos', 'GET')
  .then(data => {
    data.forEach(val => {
      addData(val.name, val._id, val.completed);
    });
  })
  .catch(err => {
    console.log(err);
  });
});

// POsting todos
