const cardContainer = document.querySelector('.card-container');
let inpt = document.querySelector('input');

// Fetching function
let fetching = (url, meth) => {

  return axios({
    method: meth,
    url: url,
  })
  .then((res) => {
    if(res.status == 200) {
      return res.data;
    }
  })
  .catch(err => {
    console.log(err);
  });
}

let posting = (url, meth , data) => {
  return axios({
    method: meth,
    url: url,
    data: data
  })
  .then((res) => {
    return res.data;
  })
  .catch(err => {
    console.log(err);
  });
}

// Function to add Data to page
let addData = (todoText, id, completed) => {
  let card = document.createElement('li'),
      p = document.createElement('p'),
      div = document.createElement('div'),
      span1 = document.createElement('span');
      // span2 = document.createElement('span');

  card.setAttribute('class', 'card');
  card.setAttribute('data-id', id);

  // Adding done class if completed is true
  if(completed) {
    card.classList.add('done');
  }

  p.setAttribute('class', 'card__text');
  div.setAttribute('class', 'card__btns');
  span1.setAttribute('class', 'btn btn--del');
  // span2.setAttribute('class', 'btn btn--edit');

  p.textContent = todoText;
  span1.innerHTML = '<i class="fas fa-trash"></i>';
  // span2.innerHTML = '<i class="fas fa-pencil-alt"></i>';

  div.appendChild(span1);
  // div.appendChild(span2);

  card.appendChild(p);
  card.appendChild(div);

  // Adding event listener
  card.addEventListener('click', completion.bind(card, id));
  // For deleting todo
  span1.addEventListener('click', deletion.bind(span1, id, card));
  // For updating todo
  // span2.addEventListener('click', updateTodo.bind(span2, id, card.firstChild));

  cardContainer.appendChild(card);  
}

// completion function
const completion = function(id) {
  fetching(`/api/todos/${id}`, 'GET')
  .then(data => {
    // console.log(data);
    let completed = data.completed;
    posting(`/api/todos/${data._id}`, 'PUT', {completed: !completed})
    .then(res => {
      // console.log("Horray" + res);
      this.classList.toggle('done');
    })
    .catch(err => {
      console.log(err);
    })
  });
}

// Deletion function for deleting todo
const deletion = function(id, card) {
  // e.stopPropagation();  
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

// Posting todo
inpt.addEventListener('keypress', function(e) {
  const data = {name: this.value};
  if(e.which == 13 && this.value !== "") {
    // Post the todo
    posting('/api/todos', 'POST', data)
    .then(data => {
      addData(data.name, data._id, data.completed);
      this.value = "";
    })
    .catch(err => {
      console.log(err);
    });
  }
});

// // Updating todo
// const updateTodo = function(id) {
//   fetching(`/api/todos/${id}`, 'GET')
//   .then(data => {
//     inpt.value = data.name;
//     inpt.addEventListener('', function(e) {
//       if(e.keyCode == 17) {
//         posting(`/api/todos/${data._id}`, 'PUT', {name: inpt.value})
//         .then(data => {
//           console.log(data);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//       }
//     })
//   });
// }