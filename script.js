//const howLongWatch = prompt("Ваш опыт наблюдения звезд","1 год")
//const myExperience = document.getElementById("myExperience")
//myExperience.innerText = howLongWatch
/*const galaxyInfo = {
    name: "andromeda",
    distance: 150,
    diameter: 750
}
galaxyInfo.type = "ellipse"

console.log(galaxyInfo)
console.log(galaxyInfo.name)
console.log(galaxyInfo['distance'])*/

/*const name = prompt('O namae wa nan des ka?','daremo');
alert(`hello ${name}`)*/

const vvar = [1,3,5,5,6,6]
for(item of vvar) {
    console.log(item)
}

const person = {
    name: "Anna",
    age: 19,
    gender: "female"
}

for(keye in person){
    console.log(keye + ": " + person[keye])
}


const getRandomInRange = (min, max) => {
    return Number((Math.random()*(max - min) + min))
}

function GenerateGameData() {
    const actionCount = getRandomInRange(1,4)
    const operators = ["+", "-"]
    let gameOperators = []
    for(let i = 0; i < actionCount; i++) {
        const index = (Math.random() * 100).toFixed() % operators.length
        gameOperators.push(operators[index])
    }
    console.log(gameOperators)

    let numbersToOperate = []
    for(let i = 0; i < actionCount + 1; i++) {
        numbersToOperate.push((Math.random() * 100).toFixed())
    }
    console.log(numbersToOperate)
    
    let result = Number(numbersToOperate[0])
    let taskStr = `${result}`
    for(let j = 1; j < numbersToOperate.length; j++) {
    taskStr += gameOperators[j-1] + numbersToOperate[j]
    if(gameOperators[j-1] == "+") {
        result += Number(numbersToOperate[j])
    } else {
        result -= Number(numbersToOperate[j])
    }
    }
    console.log(taskStr) 
    console.log(result) 
    console.log("eval" + eval(taskStr))

    return {"taskStr" : taskStr, "answer": result}
}


//const gameElements = document.getElementById("myGame").children
let gameInProccess = false
let currentGame = null

const button = document.getElementById("gameButton")
const userAnswerField = document.getElementById("userAnswer")
const startGame = () => {
    const taskField = document.getElementById("task")
    if(!gameInProccess) {
        currentGame = GenerateGameData()
    
        task.innerText = currentGame.taskStr
        task.hidden = false
        
        userAnswerField.hidden = false
        button.innerText = "Проверить"      
    } else {
        const userAnser = Number(userAnswerField.value)
        const correctAnswer = currentGame.answer
        if(userAnser == correctAnswer) {
            taskField.innerText ="Правильный ответ"
        } else {
            taskField.innerText =`Ошибка! Правильный ответ: ` + correctAnswer
        }
        userAnswerField.value = null
        userAnswerField.hidden = true
       
        button.innerText = "Сыграть еще раз"
    }
    gameInProccess = !gameInProccess
}

button.addEventListener("click", startGame)
userAnswerField.addEventListener("keydown", (e) => {
    console.log(e.key)
    if(e.key === "Enter") {
        startGame()
    } else if (e.key === "Escape") {
        userAnswerField.blur()
        currentGame = null
        gameInProccess = false
        userAnswerField.value = null
        userAnswerField.hidden = true
        document.querySelector("#myGame h2").innerText = "Сыграть в игру"
        document.getElementById("task").hidden = true
        button.innerText = "Начать игру"
    }
})


const blockGameState = {
    count: 0,
    changeSelectedBlocksCount(value) {
       this.count += value
       counter.innerText = this.count
    }
}

const onBlockClicked = (e)=> {
    if(e.target.className === "") {
        e.target.className="chosenBlock"
        blockGameState.changeSelectedBlocksCount(1)
    } else {
        e.target.className=""
        blockGameState.changeSelectedBlocksCount(-1)
    }
}

const counter = document.querySelector(".blocksGame span")
const blocks = document.querySelectorAll(".blocks > div")
for(let i =0; i < blocks.length;i++) {
    blocks[i].addEventListener("click", onBlockClicked)
}




const postsBlock = document.querySelector(".postsContainer")
const showPostsButton = document.querySelector(".postsExample button")

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response)=>{
        console.log(response)
        return response.json()

    })
    .then(data => {
        for(item of data) {
            addPost(item.title, item.body)
        }
    })
    .catch((error)=>{
        alert(error.message)
    })
}

function addPost(title, body) {
    const postTitle = document.createElement("h3")
    const postBody = document.createElement("span")
    const postP = document.createElement("p")

    postTitle.innerText = title
    postBody.innerText = body

    postP.append(postTitle)
    postP.append(postBody)
    postsBlock.append(postP)
}

function createPost(title, body, userId) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify({
            title,
            body,
            userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        
    })
    .then((response)=>{
        console.log(response)
        return response.json()
    })
    .catch((error)=>{
        alert(error.message)
    })
}

//createPost("title", "body", 111)
showPostsButton.onclick = () => { getPosts() }