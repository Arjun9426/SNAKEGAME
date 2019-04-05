mydiv2 = document.getElementById("mydiv2");
function init(){
    canvas=document.getElementById("mycanvas");
    

    pen=canvas.getContext("2d");
    H=canvas.height;
    W=canvas.width;
    food=getrandomfood();
    score=0;
    game_over=0;
    snake={
        length:5,
        color:"yellow",
        direction:"right",
        cells:[],
        createsnake:function(){
            for(var i=this.length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
    }
    snake.createsnake();
    function keypressed(e){
        console.log("you presses a key");
        if(e.key=="ArrowRight"){
            if(snake.direction!="left")
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            if(snake.direction!="right")
            snake.direction="left";
        }
        else if(e.key=="ArrowUp"){
            if(snake.direction!="down")
            snake.direction="up";
        }
        else if(e.key=="ArrowDown") {
            if(snake.direction!="up")
            snake.direction="down";
        }
    }
    document.addEventListener("keydown",keypressed);
}
function  draw(){
    console.log("Draw");
    pen.clearRect(0,0,W,H);
    for(var i=0;i<snake.cells.length;i++){
        pen.fillStyle="Red";
        pen.strokeStyle="Black";
        pen.lineWidth=5;
        pen.strokeRect(snake.cells[i].x*10,snake.cells[i].y*10,10,10)
        pen.fillRect(snake.cells[i].x*10,snake.cells[i].y*10,10,10);
    }
    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    pen.fillStyle="White";
    pen.font="14px Roboto";
    pen.fillText("SCORE : " + score,10, 10);
    mydiv2.innerHtml="SCORE : " + score;
}
function update(){
    console.log("Update");
    var headx=snake.cells[0].x;
    var heady=snake.cells[0].y;
    for(var i=1;i<snake.cells.length;i++){
        if(snake.cells[i].x==headx && snake.cells[i].y==heady){
            alert("Game Over");
            game_over=1;
        }
    }
    if(headx <0 || headx*10>=W || heady<0 || heady*10 >=H){
        alert("Game Over");
        game_over=1;
    }
    if(headx==food.x && heady==food.y){
        food=getrandomfood();
        score++;
    }
    else{
        snake.cells.pop();
    }
    if(snake.direction=="right"){
        nextx=headx+1;
        nexty=heady;
    }
    else if(snake.direction=="left"){
        nextx=headx-1;
        nexty=heady;
    }
    else if(snake.direction=="down"){
        nextx=headx;
        nexty=heady+1;
    }
    else{
        nextx=headx;
        nexty=heady-1;
    }
    snake.cells.unshift({x:nextx,y:nexty});
}
function getrandomfood(){
    var foodx=Math.round(Math.random()*(W-10)/10);
    var foody=Math.round(Math.random()*(H-10)/10);
    foodcolor=["red","orange","yellow","orchid","blue","green"];
    var i=Math.round(Math.random()*foodcolor.length);
    var obj={
        x:foodx,
        y:foody,
        color:foodcolor[i],
    };
    return obj;
}
function gameloop(){
    draw();
    update();
    if(game_over==1){
        clearInterval(fun);
    }
}
init();
var fun=setInterval(gameloop,100);
fun();