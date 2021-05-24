class Board{
    constructor(){
      this.generateMap();
    }
    generateMap(){
        this.attempted = []
        this.arr = [];
        var j = 0;
        while(j < 81){
            this.arr.push(0)
            j++;
        }
        var i = 0;
        while(i < 81 && i >-1){
            let randomInt = Math.ceil(Math.random()*9)
            if(!this.attempted[i]){
                this.attempted.push([]);
            }
            while(this.attempted[i].includes(randomInt)){
                randomInt += (randomInt == 9) ? (-8) : 1;
            }
            while(this.attempted[i].length < 9){
               if(
                   this.getFullQuadrant(i).includes(randomInt) |
                   this.getFullRow(i).includes(randomInt) |
                   this.getFullColumn(i).includes(randomInt)
                ){
                    this.attempted[i].push(randomInt)
                    randomInt += (randomInt == 9) ? (-8) : 1;
                }else{
                    break;
                }
            }
            if(this.attempted[i].length < 9){
                this.arr[i] = randomInt
                i++;
            }else{
                this.arr[i] = 0;
                i--;
                this.attempted.pop()
            }
        }
    }
    getFullQuadrant(i=0){
        const p = i - ((i%9)%3) - (i - (i%9))%27;
        return [this.arr[p],this.arr[p+1],this.arr[p+2],this.arr[p+9],this.arr[p+10],this.arr[p+11],this.arr[p+18],this.arr[p+19],this.arr[p+20]];
    }
    getFullRow(i=0){
        const y = Math.floor(i/9)*9;
        return [this.arr[y],this.arr[y+1],this.arr[y+2],this.arr[y+3],this.arr[y+4],this.arr[y+5],this.arr[y+6],this.arr[y+7],this.arr[y+8]];
    }
    getFullColumn(i=0){
        const x = i%9;
        return [this.arr[x],this.arr[x+9],this.arr[x+18],this.arr[x+27],this.arr[x+36],this.arr[x+45],this.arr[x+54],this.arr[x+63],this.arr[x+72]];
    }
}




const difficulties={
    filled:-1,
    easy:0.4,
    medium:0.5,
    hard:0.65,
    expert:0.8
}

const board = new Board();
const numbers = document.querySelectorAll(".number-btn");
const notesBtn = document.getElementById("notes-btn");
const generateBtn = document.getElementById("generate-map");
const solveBtn = document.getElementById("solve-map");
const scene = document.getElementById("scene");
const body = document.querySelector("body");

let notesMode = false;


function generateMap(){
    board.generateMap()
    populateSquares(board.arr)
    checkAll()
}

function checkFilled(inds = []){
    const elements = []
    for(let index of inds){
        const element = document.getElementById(index)
        if(element.getAttribute("filled") == "true"){
            elements.push(element)
        }
        
    }
    return elements
}

function getAllNeighbors(i = 0){
    const p = i - ((i%9)%3) - (i - (i%9))%27;
    const y = Math.floor(i/9)*9;
    const x = i%9;
    const yInds = [y,y+1,y+2,y+3,y+4,y+5,y+6,y+7,y+8];
    const pInds = [p,p+1,p+2,p+9,p+10,p+11,p+18,p+19,p+20];
    const xInds = [x,x+9,x+18,x+27,x+36,x+45,x+54,x+63,x+72];
    const allInds = [...yInds,...pInds,...xInds];
    const elements = [];
    allInds.forEach(index=>{
        elements.push(document.getElementById(index))
    })
    return elements;
}


function checkQuadrant(i = 0){
    const p = i - ((i%9)%3) - (i - (i%9))%27;
    const inds = [p,p+1,p+2,p+9,p+10,p+11,p+18,p+19,p+20];
    const elements = checkFilled(inds);
    if(elements.length < inds.length) return elements;
    elements.forEach(element=>{
        element.setAttribute("data-quadrant-filled",true)
    })
    return elements;
}

function checkRow(i = 0){
    const y = Math.floor(i/9)*9;
    const inds = [y,y+1,y+2,y+3,y+4,y+5,y+6,y+7,y+8];
    const elements = checkFilled(inds);
    if(elements.length < inds.length) return elements;
    elements.forEach(element=>{
        element.setAttribute("data-row-filled",true)
    })
    return elements;
}

function checkColumn(i = 0){
    const x = i%9;
    const inds = [x,x+9,x+18,x+27,x+36,x+45,x+54,x+63,x+72];

    const elements = checkFilled(inds);
    if(elements.length < inds.length) return elements;
    elements.forEach(element=>{
        element.setAttribute("data-column-filled",true)
    })
    return elements;
}

function setScene(){
    const scene = document.getElementById("scene")
    if(window.innerHeight > window.innerWidth){
        scene.style.width = window.innerWidth + "px";
        scene.style.height = window.innerWidth + "px";
    }else{
        scene.style.width = window.innerHeight + "px";
        scene.style.height = window.innerHeight + "px";
    }
}

function completeGameHandler(){
    document.querySelector(".modal-test").classList.toggle("transform-down");
}

function populateSquares(array=[0]){
    const scene = document.getElementById("scene")
    scene.innerHTML = ""
    const color = "rgb(180,200,180)";
    var i = 0;
    for(let x = 0; x < 9; x++){
        for(let y = 0; y < 9; y++){
            const div = document.createElement('div');
            div.style.border = `1px solid ${color}`;
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.borderRight = (y == 2 | y == 5) ? "1px solid black" : (y == 8) ? "none" : `1px solid ${color}`;
            div.style.borderLeft = (y == 3 | y == 6) ? "1px solid black" : `1px solid ${color}`;
            div.id = i;
            div.setAttribute("value",array[i])

            const isFilled = Math.random() > difficulties[difficulty]
            div.setAttribute("filled",isFilled)
            div.innerText = isFilled ? array[i] : "";
            div.style.borderBottom = (x == 2 | x == 5) ? "1px solid black" : (x == 8) ? "none" : `1px solid ${color}`;
            div.style.borderTop = (x == 3 | x == 6) ? "1px solid black" : `1px solid ${color}`;
            i++;
            div.addEventListener("click",e=>{
    
                if(div.getAttribute("filled") == "true") return;
                let num = document.documentElement.style.getPropertyValue("--current-value").replace(/\D/g,"");
             //if notes mode is disabled, try a square input
              if(!notesMode){
                if(div.getAttribute("value") == num){
                    //yes, it works!
                    div.innerHTML = "";
                    div.innerText=num;
                    div.setAttribute("filled",true)
                    div.setAttribute("error",false)

                    checkQuadrant(e.target.id);
                    checkRow(e.target.id);
                    checkColumn(e.target.id);

                    const neighbors = getAllNeighbors(e.target.id);
                    neighbors.forEach(element=>{
                        if(element.children.length){
                            for(let i = 0; i < element.children[0].children.length;i++){
                                if(element.children[0].children[i].innerText.includes(num)){
                                    element.children[0].children[i].remove();
                                }
                            }
                            
                        }
                        
                    })

                    const filled = document.querySelectorAll('[filled="true"]');
                    if(filled.length == 81){
                        completeGameHandler();
                    }
                    
                }else{
                    //no, it was an error!
                    if(div.innerText == num){
                        div.innerHTML = "";
                        div.setAttribute("error",false)
                    }else{
                        div.innerHTML = "";
                        div.innerText=num;
                        div.setAttribute("error",true)
                    }
                   
                }
                
              }else{
                  //WRITE A NOTE

                  //if the note is illegal, don't write it
                  const allNeighbors = [...checkQuadrant(e.target.id),...checkRow(e.target.id),...checkColumn(e.target.id)]
                  const allNeighborValues = allNeighbors.map(element=>{
                      return element.getAttribute("value")
                  })
                  if(allNeighborValues.includes(num)) return;

                  //otherwise, write it!
                  if(!div.innerText){
                    const container = document.createElement("div");
                    container.classList.add("notes-list-item")
                    container.style = `
                        display:block;
                        width:100%;
                        height:100%;
                        display:    grid;
                        grid-template-rows:33% 33% 33%;
                        grid-template-columns:33% 33% 33%;
                        font-size:min(17px, 3vw);
                        position:absolute;
                        text-align:center;
                        left:0;
                        color:rgb(150,150,150,.8);
                        top:0;
                    `
                    const text = document.createElement("span")
                    text.innerText = num;
                    container.appendChild(text);
                    div.appendChild(container)
                  }else if(!div.innerText.includes(num)){
                    const container = div.children[0]
                    const text = document.createElement("span")
                    text.innerText = num;
                    container.appendChild(text);
                  }else{
                    for(let i = 0; i < div.children[0].children.length; i++){
                        if(div.children[0].children[i].innerText.includes(num)){
                            div.children[0].children[i].remove();
                        }
                    }
                    if(div.children[0].children.length < 1){
                        div.children[0].remove();
                    }
                    
                  }
                  
                  //else, add to the child span element

              }
            })
    
            
            scene.appendChild(div)
        } 
    }
}

function checkAll(){
    for(let i = 0; i < 81; i++){
        checkColumn(i);
        checkQuadrant(i);
        checkRow(i)
    }
}

function togglePen(){
    notesMode = !notesMode;
    scene.classList.toggle("cursor-pen");
    body.classList.toggle("cursor-pen");
    notesBtn.classList.toggle("btn-selected")
    
   if(notesBtn.dataset.notes_enabled == "true"){
       notesBtn.setAttribute("data-notes_enabled",false)
   }else{
        notesBtn.setAttribute("data-notes_enabled",true)
   }

}


solveBtn.addEventListener('click',e=>{
    generateBtn.setAttribute("disabled",true);
    solveBtn.setAttribute("disabled",true);
    let i = 0;
    let myInterval = setInterval(()=>{
        if(i == 81){
            clearInterval(myInterval)
            generateBtn.removeAttribute("disabled")
            solveBtn.removeAttribute("disabled")
            completeGameHandler();
            return;
        }else{
            const element = document.getElementById(i);
            element.innerText = element.getAttribute("value")
            element.setAttribute("filled",true)
            element.setAttribute("error",false)
            checkQuadrant(i);
            checkRow(i);
            checkColumn(i);
            i++;
        }
    },10)
})

setScene();

window.addEventListener("resize",()=>{
    setScene()
})

document.getElementById("play-again").addEventListener("click",()=>{
   generateMap();
   document.querySelector(".modal-test").classList.toggle("transform-down");
})

document.getElementById("close-btn").addEventListener("click",()=>{
    document.querySelector(".modal-test").classList.toggle("transform-down");
})

document.getElementById("generate-map").addEventListener("click",()=>{
    generateMap();
})

document.documentElement.style.setProperty('--current-value', "'1'");

numbers.forEach(number=>{
    number.addEventListener("click",e=>{
        numbers.forEach(num=>{num.classList.remove("btn-selected")})
        number.classList.add("btn-selected")
        document.documentElement.style.setProperty('--current-value', `"${e.target.dataset.value}"`);
    })
})

const radios = document.querySelectorAll('input[type="radio"]').forEach(radio=>{
    if(radio.checked){
        difficulty = radio.value
    }
    radio.addEventListener('change',e=>{
        difficulty = e.target.value;
        console.log(difficulty)
    })
})

window.addEventListener('keypress',e=>{
    if(!e.key.match(/[1-9n]/)) return;
    if(e.key == "n"){
        togglePen();
        return;
    }
    numbers.forEach(num=>num.classList.remove("btn-selected"))
    document.querySelector(`[data-value="${e.key}"`).classList.add("btn-selected")
    document.documentElement.style.setProperty('--current-value', `"${e.key}"`);
})

window.addEventListener("mouseover",e=>{
    curEl = e.target;
})

notesBtn.addEventListener("click",()=>{
   togglePen();
})

populateSquares(board.arr);
checkAll()
