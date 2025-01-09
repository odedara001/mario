const gameBox = document.getElementById("game-box")
const ctx = gameBox.getContext("2d")
const newGame = document.querySelector("#new-game")
const newLevel = document.querySelector("#new-level")
const levelInd = document.querySelector("#level-ind")
const marioImg = 
[
    'https://toppng.com/uploads/preview/mario-png-super-mario-3d-world-mario-11562893764idzdhhbilt.png',
    'https://e7.pngegg.com/pngimages/130/182/png-clipart-super-mario-run-video-game-princess-peach-nintendo-super-mario-game-heroes.png'
]
const villanImg = 'https://www.giantbomb.com/a/uploads/scale_small/3/34651/3469831-kamek.png'

const img = new Image(); 




newGame.disabled = true
newGame.style.display = "none"

newLevel.disabled = true
newLevel.style.display = "none"
let level = 1
let b 

// ctx.fillRect(0,0,300,20)


mario = {
    x : 0,
    y : 225,
    dir:1,
    img:0,
    valX : 4, 
    valY :0,
    height: 50,
    width: 50,
    color : "green"
}

villan_1 = {
    x : 225,
    y : 225,
    dir:1,
    valX : 0, 
    valY :2,
    height: 50,
    width: 50,
    color:"red"

}
villan_2 = {
    x : 475,
    y : 225,
    dir:-1,
    valX : 0, 
    valY :2,
    height: 50,
    width: 50,
    color:"red"
}
villan_3 = {
    x : 725,
    y : 225,
    dir:1,
    valX : 0, 
    valY :2,
    height: 50,
    width: 50,
    color:"red"

}


function updateGame(){
     ctx.clearRect(0,0,gameBox.width,gameBox.height )
 
    updateVillan(villan_1)
    updateVillan(villan_2)
    updateVillan(villan_3)


    // drawImg(mario)
    

    

    // drawMarioImg()
    // drawVillanoImg(villan_1)
    // drawVillanoImg(villan_2)
    // drawVillanoImg(villan_3)

    draw(mario)
    draw(villan_1)
    draw(villan_2)
    draw(villan_3)

    b = checkGameOver()



    if(b){
        ctx.fillStyle = "white"
        ctx.font = "100px Arial"
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText("Game Over",gameBox.width / 2, gameBox.height / 2)
       
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.strokeText("Game Over",gameBox.width / 2, gameBox.height / 2)

        newGame.disabled = false
        newGame.style.display = "block"

    }else if(checkGameWin(mario)){
        b = true

        ctx.fillStyle = "white"
        ctx.font = "100px Arial"
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText("You Won the Game",gameBox.width / 2, gameBox.height / 2)
       
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.strokeText("You Won the Game",gameBox.width / 2, gameBox.height / 2)

        newLevel.disabled = false
        newLevel.style.display = "block"

        

    }
   
    
   

    if(!b){
        requestAnimationFrame(updateGame)
    }
    

    
}
function drawVillanoImg(v){

    img.src = villanImg
    
      ctx.drawImage(img, v.x, v.y, v.width, v.height); // Draw the image on the canvas
      // Save the current state
      

}

function drawMarioImg(){

    
        img.src = marioImg[mario.img]

        ctx.save(); // Save the current state
    ctx.scale(mario.dir, 1);
    console.log(mario.dir)
          ctx.drawImage(img,
            mario.dir==1?mario.x :(-mario.x-mario.width)
            , mario.y, mario.width, mario.height); // Draw the image on the canvas
        
          ctx.restore(); 
}
function draw(ract){
  
    ctx.fillStyle = ract.color
   
    ctx.fillRect(ract.x,ract.y,ract.width,ract.height)
}

function drawLevelIdecator(){
   

    ctx.fillStyle = "white"
    ctx.font = "30px Arial"
    ctx.fillText(`Level: ${level}`, 10, 30)

    
    ctx.strokeStyle = 'black'
    ctx.lineWidth=1
    ctx.strokeText(`Level: ${level}`, 10, 30)


}


function updateVillan(villan){
    villan.x += (villan.dir*villan.valX)
    villan.y += (villan.dir*villan.valY)
    if(villan.x+villan.width > gameBox.width ){
        villan.x = gameBox.width-villan.width
        villan.dir = -villan.didir 

    }
    if(villan.x < 0 ){
        villan.x = 0 
        villan.dir = -villan.dir 
    }

    if(villan.y+villan.height > gameBox.height ){
        villan.y = gameBox.height-villan.height
        villan.dir = -villan.dir
    }
    if(villan.y < 0 ){
        villan.y = 0 
        villan.dir = -villan.dir 
    }

}
function updateMario(box,dir){
    box.x += (dir*box.valX)
    
    if(box.x+box.width > gameBox.width ){
        box.x = gameBox.width-box.width
        
    }
    if(box.x < 0 ){
        box.x = 0 
    }

}

function checkGameOver(){

    if(checkCollision(mario, villan_1) || checkCollision(mario, villan_2) || checkCollision(mario, villan_3)){
        return true
    }


}

function checkCollision(box1,box2){

    if((box1.x >= box2.x) && (box1.x <= (box2.x + box2.width) )){
        if( box1.y >= box2.y && ( box1.y <= (box2.y + box2.height) ) ){
            return true;
        }
        if( (box1.y+box1.height) >= box2.y && ( (box1.y+box1.height) <= (box2.y + box2.height) ) ){
            return true;
        }
    }

    if(( (box1.x+box1.width) >= box2.x) && ( (box1.x+box1.width) <= (box2.x + box2.width) )){
        if( box1.y >= box2.y && ( box1.y <= (box2.y + box2.height) ) ){
            return true;
        }
        if( (box1.y+box1.height) >= box2.y && ( (box1.y+box1.height) <= (box2.y + box2.height) ) ){
            return true;
        }
    }
    return false;
}

function checkGameWin(box){

    if(box.x + box.width >= gameBox.width){
        return true
    }
    return false

}


document.addEventListener("keydown", (event)=>{

    if(event.key === "ArrowRight"){
        mario.dir=1
        updateMario(mario,1)

    }
    if(event.key === "ArrowLeft"){
        mario.dir=-1
        updateMario(mario,-1)
    }

    if(mario.img == 1){
        mario.img = 0
    }else {
        mario.img = 1
    }

})

newGame.addEventListener("click",()=>{

    level = 1;
    levelInd.textContent = `Level: ${level}`

    mario.valX = 4
    mario.x = 0
    mario.y = 225

    villan_1.valY = 2
    villan_1.x = 225
    villan_1.y = 225

    villan_2.valY = 2
    villan_2.x = 475
    villan_2.y = 225



    villan_3.valY = 2
    villan_3.x = 725
    villan_3.y = 225

    newGame.disabled = true
    newGame.style.display = "none"

  
    updateGame()

})

newLevel.addEventListener("click", ()=>{
    level += 1
    levelInd.textContent = `Level: ${level}` 

    mario.valX +=3
    mario.x = 0
    mario.y = 225

    villan_1.valY +=2
    villan_1.x = 225
    villan_1.y = 225

    villan_2.valY +=2
    villan_2.x = 475
    villan_2.y = 225



    villan_3.valY +=2
    villan_3.x = 725
    villan_3.y = 225

    newLevel.disabled = true
    newLevel.style.display = "none"

    // console.log(villan_1.valY, villan_2.valY, villan_3.valY)

    updateGame()

})

levelInd.textContent = `Level: ${level}`
 updateGame()


   