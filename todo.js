let todoItems = [];

function renderTodo(todo) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    return
  }

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("div");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
   
     <div for="${todo.id}" class="tick js-tick box" style="background: ${todo.color};">
    ${todo.text}
	 <div class="button-section">
                        <div class="delete-btn fa fa-trash delete-todo js-delete-todo"></div>
                         <div class="edit-btn fa fa-pencil edit-todo js-edit-todo"></div>
                        <div class="clearfix"></div>
                    </div>
					
   
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text,color) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
	color:color
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}
function editTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  
  var editNode = todoItems.filter(item => item.id === Number(key));
  document.getElementById('todo-input').value=editNode[0].text;
 
   document.querySelector('#addBtn').innerText  = 'Edit';
  	 document.querySelector('#hidden-input').value  = editNode[0].id;
}
function postEditTodo(key,text,color) {
const index = todoItems.findIndex(item => item.id === Number(key));
  
  todoItems[index].text= text;
  todoItems[index].color= color;
 renderTodo(todoItems[index]);
}



	    $(document).ready(function () {
const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');
  const text = input.value.trim();
  const color = document.getElementById('colorPicker').value;
  if (text !== '' && document.querySelector('#addBtn').innerText  === 'Add') {
    addTodo(text,color);
    input.value = '';
    input.focus();
  }
  if(text !=='' && document.querySelector('#addBtn').innerText  === 'Edit')
  {
	  const key=document.querySelector('#hidden-input').value;
	  const color = document.getElementById('colorPicker').value;
	  postEditTodo(key,text,color);
	input.value = '';
    input.focus();
	 document.querySelector('#hidden-input').value  = '';
	 document.querySelector('#addBtn').innerText  = 'Add';
	
  }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
  
   if (event.target.classList.contains('js-edit-todo')) {
    const itemKey = event.target.parentElement.parentElement.parentElement.dataset.key;
    editTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});
});