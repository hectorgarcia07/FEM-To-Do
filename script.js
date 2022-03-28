//sets up the theme switcher toggle
const html = document.querySelector('html')
const themeToggle = document.getElementById('theme-toggle')

//holds list of todo list node
const todoNodeList = document.getElementById('node-list')

//will be used to get the input text from input form
const todoInputDescription = document.getElementById('todo-input-form')

//will be used to create a todo node
const createTodoBtn = document.getElementById('create-todo')

//will be used to update the number of todos left
const todoNumLeft = document.getElementsByClassName('todo-num-items')

const todoAll = document.getElementById('todo-all')
const todoActive = document.getElementById('todo-active')
const todoComplete = document.getElementById('todo-complete')

const clearAllComplete = document.getElementsByClassName('todo-clear')

/* --- Will be used to control the dark/light theme --- */


//sets the theme to dark mode if users current OS prefrence is set to dark
//light mode is the default
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.dataset.theme = 'dark-theme'
}else{
  html.dataset.theme = 'light-theme'
}

//toggles the theme switcher
themeToggle.addEventListener('click', event => {
  if(html.dataset.theme == 'light-theme'){
    html.dataset.theme = 'dark-theme'
  }else{
    html.dataset.theme = 'light-theme'
  }
})

//checks the theme on the OS level and switches theme accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const newColorScheme = event.matches ? "dark" : "light";
  html.dataset.theme = newColorScheme === 'dark' ? 'dark-theme' : 'light-theme'
});


/* --- Will be used to handle drag and drop events --- */

function getAllNodes(){
  let nodes = document.querySelectorAll("#node-list > li")
  return Array.prototype.slice.call(nodes)
}

function dragStart(e) {
  //save the checked state of the node and the the inner text
  const nodeInfo = { 
    checked: this.children[0].children[0].checked,
    textContent: this.children[0].children[1].textContent,
    id: this.children[0].children[0].dataset.id
  }

  this.style.opacity = '0.4'
  dragSrcEl = this
  e.dataTransfer.effectAllowed = 'move'

  //stores it as a json string for later retrival
  e.dataTransfer.setData('text/json', JSON.stringify(nodeInfo))
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    const nodeInfo = JSON.parse(e.dataTransfer.getData('text/json'))
    
    const thisChecked = this.children[0].children[0].checked
    const thisDescription = this.children[0].children[1].textContent
    const thisID =  this.children[0].children[0].dataset.id

    //update the new positions and save it to local storage
    const todoStorage = JSON.parse(localStorage.getItem('todos'))
    const firstTodoNode = {checked: nodeInfo.checked, description: nodeInfo.textContent, id: nodeInfo.id}
    const secondTodoNode = {checked: thisChecked, description: thisDescription, id: thisID}
 
    const updatedTodoPosition = todoStorage.map(todo => {
      if(todo.id === firstTodoNode.id){
        return secondTodoNode
      }
      else if(todo.id === secondTodoNode.id){
        return firstTodoNode
      }
      return todo
    })
 
     //save the new positions of the todo node
    localStorage.setItem('todos', JSON.stringify(updatedTodoPosition))
    /* 
    //updates original moved node with dropped infor
    dragSrcEl.children[0].children[0].checked = this.children[0].children[0].checked
    dragSrcEl.children[0].children[1].textContent = this.children[0].children[1].textContent
    dragSrcEl.children[0].children[0].id = thisID

    //updates the drop target with checked status and text content
    this.children[0].children[0].checked = nodeInfo.checked
    this.children[0].children[1].textContent = nodeInfo.textContent */

    const currentActiveOption = document.querySelector('.active-option')

    //renders based on what the selected filter option is
    if(currentActiveOption.textContent === 'Active'){
      showActiveTodos()
    }
    else if(currentActiveOption.textContent === 'Compleated'){
      showCompletedTodos()
    }
    else if(currentActiveOption.textContent === 'All'){
      showAllTodos()
    }    
  }
}

function dragEnd(e) {
  this.style.opacity = '1'
}

//adds the ability to drag/drop a node
function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}
 

/* --- Will used to handle the creation of todo nodes --- */


//will create a todo node
function appendTodoNode(event){
  event.preventDefault()

  const description = todoInputDescription.value

  //only create node if user inputed something
  if(description.length){
    const id = uuidv4()
    const todoNode = createTodoNode(description, false, id)
    todoNodeList.appendChild(todoNode)

    //clears the text input field
    todoInputDescription.value = ''

    //adds the node to the local storage, and saves it
    const todoStorage = JSON.parse(localStorage.getItem('todos'))
    todoStorage.push( { checked: false, description, id } )
    localStorage.setItem('todos', JSON.stringify(todoStorage))

    updateItemsLeft() //updates the number of todos left to do

    const currentActiveOption = document.querySelector('.active-option')

    //renders based on what the selected filter option is
    if(currentActiveOption.textContent === 'Active'){
      showActiveTodos()
    }
    else if(currentActiveOption.textContent === 'Compleated'){
      showCompletedTodos()
    }
    else if(currentActiveOption.textContent === 'All'){
      showAllTodos()
    }

    updateItemsLeft() //updates the number of todos left to do
  }
}

//will be used to create a todo <li> node 
//with it's description and it's checked state
function createTodoNode(description, checked, id){
  const liNode = document.createElement('li')
  const checkBox = document.createElement('input')
  const label = document.createElement('label')
  const pTag = document.createElement('p')
  const deleteBtn = document.createElement('button')

  //add style to nodes
  liNode.classList.add('todo-node')
  label.classList.add('todo-label')
  pTag.classList.add('todo-description')
  deleteBtn.classList.add('cross-svg')

  pTag.textContent = description
  liNode.draggable = true
  checkBox.type = 'checkbox'
  checkBox.checked = checked

  //adds event listener for the toggle of check
  checkBox.addEventListener('change', todoCheckedStatus)
  //adds event to remove node from local storage
  deleteBtn.addEventListener('click', removeTodoNode)

  //build the todo node
  label.appendChild(checkBox)
  label.appendChild(pTag)
  label.appendChild(deleteBtn)
  liNode.appendChild(label)

  //add the unique id as a data set to refrence the current node
  checkBox.dataset.id = id
  deleteBtn.dataset.id = id

  //makes the node draggable
  addEventsDragAndDrop(liNode)

  return liNode
}

//get all todos from local storage and render to the screen
function renderAllTodo(){
  const todos = JSON.parse(localStorage.getItem('todos'))

  //add a todo node to the todo-node-list
  todos.forEach(todo => {
    let newTodoNode = createTodoNode(todo.description, todo.checked, todo.id)
    todoNodeList.appendChild(newTodoNode)
  })

  updateItemsLeft()
}

//will be used to update the number of todos yet to be completed
function updateItemsLeft(){
  const todos = JSON.parse(localStorage.getItem('todos'))
  let count = 0

  //count the number of todos left
  todos.forEach(todo => todo.checked ? null : count++)

  Array.from(todoNumLeft).forEach(todo => {
    todo.textContent = count == 1 ? "1 item left" : `${count} items left`
  })
}

//will remove the todo node from the list and re-renders the list
function removeTodoNode(event){
  const todos = JSON.parse(localStorage.getItem('todos'))

  //returns new array list of todo nodes without the deleted todo
  const newTodo = todos.filter(todo => todo.id !== event.target.dataset.id)

  //save the updated todo in local storage
  localStorage.setItem('todos', JSON.stringify(newTodo))

  const currentActiveOption = document.querySelector('.active-option')

  //renders based on what the selected filter option is
  if(currentActiveOption.textContent === 'Active'){
    showActiveTodos()
  }
  else if(currentActiveOption.textContent === 'Compleated'){
    showCompletedTodos()
  }
  else if(currentActiveOption.textContent === 'All'){
    showAllTodos()
  }

  updateItemsLeft() //updates the number of todos left to do
}

//will be used to toggle and save the checked and unchecked status of 
//the todo
function todoCheckedStatus(event){
  const id = event.target.dataset.id

  //get the todo list from 
  const todoStorage = JSON.parse(localStorage.getItem('todos'))

  todoStorage.find(todo => {
    if(todo.id === id){
      todo.checked = !todo.checked
      return true
    }
    return false
  })

  //save the updated todo in local storage
  localStorage.setItem('todos', JSON.stringify(todoStorage))

  updateItemsLeft()

  const currentActiveOption = document.querySelector('.active-option')

  if(currentActiveOption.textContent === 'Active'){
    showActiveTodos()
  }
  else if(currentActiveOption.textContent === 'Compleated'){
    showCompletedTodos()
  }
}

//appends the active-option to the current active filter option
function updateOptionClass(node){
  const oldOption = document.querySelector('.active-option')

  if(oldOption !== node){
    oldOption.classList.remove('active-option')
    node.classList.add('active-option')
  }
}

//will show all todo items in the local storage
function showAllTodos(){
  const todoStorage = JSON.parse(localStorage.getItem('todos'))

  //stores all todo nodes
  const todoNodes = todoStorage.map(todo => createTodoNode(todo.description, todo.checked, todo.id))

  todoNodeList.replaceChildren(...todoNodes)//renders it to the ul list

  updateOptionClass(todoAll)//updates the css class when active
}

//show only current active todo nodes
function showActiveTodos(){
  const todoStorage = JSON.parse(localStorage.getItem('todos'))

  //will store only nodes that are not checked
  const todoNodes = todoStorage
    .filter(todo => !todo.checked || false )
    .map(todo => createTodoNode(todo.description, todo.checked, todo.id))

  todoNodeList.replaceChildren(...todoNodes)//renders it to the ul list

  updateOptionClass(todoActive)//updates the css class when active
}

//will dislplay all completed todos
function showCompletedTodos(){
  const todoStorage = JSON.parse(localStorage.getItem('todos'))

  //will store only nodes that are not checked
  const todoNodes = todoStorage
    .filter(todo => todo.checked || false )
    .map(todo => createTodoNode(todo.description, todo.checked, todo.id))

  todoNodeList.replaceChildren(...todoNodes)//renders it to the ul list

  updateOptionClass(todoComplete)//updates the css class when active
}

//will clear out all completed todos and leave the ones that havent been done yet
function clearCompletedTodoNode(event){
  const todoStorage = JSON.parse(localStorage.getItem('todos'))

  //will contain only todos that havent been checked yet
  const todoNodes = todoStorage.filter(todo => !todo.checked || false )

  //save it to the local storage
  localStorage.setItem('todos', JSON.stringify(todoNodes))

  const todoDOM = todoNodes.map(todo => createTodoNode(todo.description, todo.checked, todo.id))

  todoNodeList.replaceChildren(...todoDOM)//renders it to the ul list

  //shows the appropriate items based on current filter
  const currentActiveOption = document.querySelector('.active-option')

  if(currentActiveOption.textContent === 'Active'){
    showActiveTodos()
  }
  else if(currentActiveOption.textContent === 'Compleated'){
    showCompletedTodos()
  }
  else if(currentActiveOption.textContent === 'All'){
    showAllTodos()
  }
}

//if a todo array doesn't exist, create one
if(!localStorage.getItem('todos')){
  localStorage.setItem("todos", JSON.stringify([]))
}

renderAllTodo()

createTodoBtn.addEventListener('click', appendTodoNode)

todoAll.addEventListener('click', showAllTodos)
todoActive.addEventListener('click', showActiveTodos)
todoComplete.addEventListener('click', showCompletedTodos)

for(let item of clearAllComplete){
  item.addEventListener('click', clearCompletedTodoNode)
}