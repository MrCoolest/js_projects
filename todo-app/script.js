const form = document.getElementById("form");
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos){
     todos.forEach(todo =>{
          console.log(todo)
          addtodo(todo);
     });
}

form.addEventListener("submit",(e)=>{
     e.preventDefault();

     addtodo();
     
});


function addtodo(todo){
     let todoText = input.value;

     if(todo){
          todoText = todo.text;
     }

     if(todoText){
          const todoE1 = document.createElement('li');
          if(todo && todo.completed ){
               todoE1.classList.add('completed');
          }
          todoE1.innerText = todoText;
          todoE1.addEventListener('click',() => {
               todoE1.classList.toggle("completed");
          updateL5();

          } );

          todoE1.addEventListener('contextmenu', (e)=>{
               e.preventDefault();
               todoE1.remove();
          updateL5();

          })
          todosUL.appendChild(todoE1); 
          input.value = "";
          updateL5();
     }
}

function updateL5(){
     const todosEl = document.querySelectorAll('li');

     const todos = [];

     todosEl.forEach(todoEl => {
          todos.push({
               text : todoEl.innerText,
               completed : todoEl.classList.contains('completed')
          })
     });

     localStorage.setItem('todos', JSON.stringify(todos));
}