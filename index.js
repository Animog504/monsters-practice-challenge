/*
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Monstr</title>
  </head>
  <body>
    <h1>Monstr Inc.</h1>
    <div id='create-monster'></div>
    <div id='monster-container'></div>
    <button id="back"><=</button>
    <button id="forward">=></button>
    <script src='index.js'></script>
    <!-- <script src='demo.js'></script> -->
  </body>
</html>
*/
//-------------------------------
const MAXIMUMMONSTERS = 50;
let pageCount = null;
//-------------------------------
document.addEventListener('DOMContentLoaded', function(){
  // fetch the monsters
  // parse their data
  // place the data in forms/html/template
  // render said data; render() needs to be it's own function for future purposes
  // add event listeners


  pageCount = 1;
  createMonsterMaker();
  fetchMonsters();
  //parseMonsters();

})

function createMonsterMaker(){
  const createDiv = document.getElementById('create-monster')
  const newMonsterTemplate = `
    <form id="create-monster">
      <label>Name:</label><input type="TEXT" data-id="name-field">
      <label>Age:</label><input type="TEXT" data-id="age-field">
      <label>Description:</label><input type="TEXT" data-id="desc-field">
      <input type='submit' value='Create'/>
    </form>
  `
  createDiv.innerHTML = newMonsterTemplate
}//createMonsterMaker
function fetchMonsters(){
  console.log(`fetching from: ${pageCount}`)
  fetch(`http://localhost:3000/monsters?_limit=${MAXIMUMMONSTERS}&_page=${pageCount}`)
  .then(res => res.json())
  .then(parseMonsters)
}//fetchMonsters()

function parseMonsters(monsters){
  const monsterContainer = document.getElementById('monster-container')
  monsterContainer.innerHTML = ""
  // monster has: name, age, description, id
  let monsterName = null
  let monsterAge = null
  let monsterDesc = null
  let monsterID = null

  for(let monster of monsters){
    monsterName = monster.name
    monsterAge = monster.age
    monsterDesc = monster.description
    monsterID = monster.id


    const monsterTemplate = makeMonsterTemplate(monsterName,monsterAge,monsterDesc,monsterID)

    monsterContainer.innerHTML += monsterTemplate


  }//for (iterating through monsters data)

  addEventListeners()
}//parseMonsters()

function addEventListeners(){
  // add event listeners that allow:
  // the creation of a monster by taking input from the text fields
  // the forward/backward buttons.

  const forwardButton = document.getElementById('forward')
  const backwardButton = document.getElementById('back')

  forwardButton.addEventListener("click",forwardButtonClicked)
  backwardButton.addEventListener("click",backwardButtonClicked)

  //----

  const monsterForm = document.getElementById('create-monster')
  monsterForm.addEventListener("submit",function(e){
    e.preventDefault()

    const monsterName = monsterForm.querySelector("input[data-id='name-field']")
    const monsterAge = monsterForm.querySelector("input[data-id='age-field']")
    const monsterDesc = monsterForm.querySelector("input[data-id='desc-field']")
    if(monsterName.value && monsterAge.value && monsterDesc.value){

      createNewMonster(monsterName.value,parseFloat(monsterAge.value),monsterDesc.value) //AR takes care of the id?
    }else{
      alert('One or more fields are missing inputs!')
    }//ifelse testing if fields have values


  })//eventListener


}//addEventListeners
function createNewMonster(name, age, desc){
  debugger
  console.log('about to post');
  fetch(`http://localhost:3000/monsters`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'age': age,
        'description': desc
      })
  })//.catch(error => console.error(error))
  .then(console.log("Hello World"))
  // .then(console.log)
  // .then(console.log('posted'))





}//createNewMonster()
function makeMonsterTemplate(name,age,desc,id)
{
  const template = `
    <div id="${id}">
      <h2><label for="name">Name: </label>${name}</h2>
      <p><label for="age"><b>Age: </b></label>${age}</p>
      <p><label for="description"><b>description: </b></label>${desc}</p>
    </div>
  `
  return template;
}

function forwardButtonClicked(){
  pageCount += 1;

  fetchMonsters();
}//forwardButtonClicked
function backwardButtonClicked(){
  if(pageCount > 1)
  {
    pageCount -= 1;
    fetchMonsters();
  }else{
    alert("can't go back any further!")
  }
}//bakwardButtonClicked
