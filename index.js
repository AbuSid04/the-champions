// javascript
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{getDatabase , ref , push, onValue , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://the-champions-a59dc-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Endorsemnts")

const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
const ulEl = document.getElementById("ul-el")

btnEl.addEventListener("click", function(){
    let inputValue = inputEl.value

    push(endorsementsInDB, inputValue)

    clearInputField()

})

function appendToEndorsementsFromDB(item){
    let itemKey = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationInDB = ref(database,`Endorsemnts/${itemKey}`)
        remove(exactLocationInDB)
    })
    ulEl.append(newEl)
}

function clearInputField() {
    inputEl.value = ""
}

onValue(endorsementsInDB,function(snapshot){
    if (snapshot.exists()) {
        let endorseArray = Object.entries(snapshot.val())
        clearEndoresment()
        for (let i = 0; i < endorseArray.length; i++) {
            let currentEndorse = endorseArray[i];
            let currentEndorseKeys = currentEndorse[0];
            let currentEndorseValues = currentEndorse[1];
            
            appendToEndorsementsFromDB(currentEndorse)
        }
    }
    else{
        ulEl.textContent = "There are no Endorsement at the moment!"
    }
})

function clearEndoresment(){
    ulEl.textContent = ""
}