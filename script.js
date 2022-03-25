//sets up the theme switcher toggle
const html = document.querySelector('html')
const themeToggle = document.getElementById('theme-toggle')

//holds list of todo list node
const todoNodeList = document.getElementById('node-list')

//will be used to get the input text from input form
const todoInputDescription = document.getElementById('todo-input-form')

//will be used to create a todo node
const createTodoBtn = document.getElementById('create-todo')


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
    textContent: this.children[0].children[1].textContent
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
    
    //updates original moved node with dropped infor
    dragSrcEl.children[0].children[0].checked = this.children[0].children[0].checked
    dragSrcEl.children[0].children[1].textContent = this.children[0].children[1].textContent

    //updates the drop target with checked status and text content
    this.children[0].children[0].checked = nodeInfo.checked
    this.children[0].children[1].textContent = nodeInfo.textContent
  }
}

function dragEnd(e) {
  this.style.opacity = '1'
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}
 
let listItems = getAllNodes();

listItems.forEach(item => addEventsDragAndDrop(item))


/* --- Will used to handle the creation of todo nodes --- */


//will create a todo node
function appendTodoNode(event){
  event.preventDefault()

  const todoDescription = todoInputDescription.value

  //only create node if user inputed something
  if(todoDescription.length){
    const todoNode = createTodoNode(todoDescription)
    todoNodeList.appendChild(todoNode)

    //clears the text input field
    todoInputDescription.value = ''
  }
}

//will be used to create a todo <li> node
function createTodoNode(description){
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

  //build the todo node
  label.appendChild(checkBox)
  label.appendChild(pTag)
  label.appendChild(deleteBtn)
  liNode.appendChild(label)

  //makes the node draggable
  addEventsDragAndDrop(liNode)

  return liNode
}

createTodoBtn.addEventListener('click', appendTodoNode)