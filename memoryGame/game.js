var score= 0
var error= 0


var cardList= [ "game1", "game2", "game3", "game4", "game5", "game6", "game7","game8", "game9", "game10"]

var cardset;
var tile = [];
var rows= 4;
var columns = 5;
var card1selected;
var card2selected;
var time=0
let timeInterval;

document.getElementById("btn").addEventListener("click", ()=>{
    resetGame();
    shuffleCards();
    startGame();
   timer();
   
})

function shuffleCards(){
    cardset= cardList.concat(cardList)
    console.log(cardset)

    for(i=0; i<cardset.length; i++){
        let j= Math.floor(Math.random()*  cardset.length)
        let temp = cardset[i]
        cardset[i]= cardset[j]
        cardset[j]= temp
    }
    console.log(cardset);
}

function startGame(){
for(let r=0; r< rows;r++){
    let row=[];
    for(let c=0; c< columns; c++){
let cardImg = cardset.pop();
row.push(cardImg)

let card= document.createElement("img")
card.id = r.toString()+ "-"+ c.toString();
card.src= cardImg + ".jpg"
card.classList.add("card")
card.addEventListener("click", selectCards)
card.style.margin="3px 4px";
card.style.borderRadius="10px"
document.getElementById("tile").append(card)
    }
    tile.push(row)
}
console.log(tile);

setTimeout(hidecards, 1000);
}

function hidecards(){
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            let card = document.getElementById(r.toString()+ "-"+ c.toString())
            card.src="question_mark.jpg"
            card.style.height="100px"
            card.style.width ="100px";
            card.style.objectFit="cover"
        }
    }
}

function selectCards(){
if (this.src.includes("question_mark")){
    if(!card1selected){
        card1selected=this;

        let coords= card1selected.id.split("-")
        let r= parseInt(coords[0])
        let c= parseInt(coords[1])
        card1selected.src= tile[r][c]+ ".jpg"
    }else if(!card2selected && this != card1selected){
        card2selected=this;

        let coords= card2selected.id.split("-")
        let r= parseInt(coords[0])
        let c= parseInt(coords[1])

        card2selected.src= tile[r][c]+ ".jpg" 
        setTimeout(update, 1000)
    }
}
}

function update(){
    if(card1selected.src != card2selected.src){
        card1selected.src = "question_mark.jpg"
        card2selected.src = "question_mark.jpg"
        error +=1
        document.getElementById("error").innerText = error
    }else{
        score +=1
        document.getElementById("score").innerText = score
    if(score=== cardList.length){
        clearInterval(timeInterval)
        alert("Congratulations! you've matched all the cards")
       
    }
}
        card1selected= null
        card2selected= null   
   
}

function timer(){
  clearInterval(timeInterval)
  time=0
  document.getElementById("timer").innerText= "Time: 0s";

timeInterval= setInterval(()=>{
    time++;
    document.getElementById("timer").innerText= "Time: "+ time + "s"
}, 1000)
}

function resetGame(){
    time=0
    score=0
    error=0

    clearInterval(timeInterval)
    document.getElementById("score").innerText=score
    document.getElementById("error").innerText=error
    document.getElementById("timer").innerText="Time: 0s"
    document.getElementById("tile").innerHTML= ""
    tile=[];
    card1selected=null
    card2selected= null
}
