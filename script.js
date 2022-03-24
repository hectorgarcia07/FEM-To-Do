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


let nodes = getAllNodes()

//when the item is draging, set the refrence of the item to the event
function dragStart(e){
    let index = nodes.indexOf(e.target)
    e.dataTransfer.setData("text/plain", index)
    e.dataTransfer.dropEffect = "move";
}

function getAllNodes(){
    let nodes = document.querySelectorAll("#node-list > li")
    return Array.prototype.slice.call(nodes)
}

//event fired when you drop a node
function dropped(e){
    cancelDefault(e)

    e.dataTransfer.dropEffect = "move";
    
    let index = Number(e.dataTransfer.getData('text/plain'))
    let target = e.target
    let targetIndex = nodes.indexOf(e.target)
    let droppedNode;

    droppedNode = nodes[index]

    console.log("Dropped",droppedNode)
    console.log("Target",target)
    console.log("Nodes", nodes)
    console.log("index", index)
    console.log("targetIndex", targetIndex)

    if(targetIndex >= 0 && index != targetIndex){
        nodes[index].remove()

        if (targetIndex < index) {
            target.before(droppedNode)
        } else if(targetIndex > index) {
            target.after(droppedNode)
        }
    }

    nodes = getAllNodes()
}

function cancelDefault(e){
    e.preventDefault()
    e.stopPropagation()

    return false
}

function addDragability(node){
  node.addEventListener('dragstart', dragStart)
  node.addEventListener('drop', dropped)
  node.addEventListener('dragenter', cancelDefault)
  node.addEventListener('dragover', cancelDefault)
}

//make each node dragable and droppable
nodes.forEach( node => addDragability(node) )


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
  addDragability(liNode)

  return liNode
}

createTodoBtn.addEventListener('click', appendTodoNode)