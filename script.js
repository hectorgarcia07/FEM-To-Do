//sets up the theme switcher toggle
const html = document.querySelector('html')
const themeToggle = document.getElementById('theme-toggle')

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

nodes.forEach(node => {
    node.addEventListener('dragstart', dragStart)
    node.addEventListener('drop', dropped)
    node.addEventListener('dragenter', cancelDefault)
    node.addEventListener('dragover', cancelDefault)
})
