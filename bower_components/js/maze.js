function avatar(x,y,imagex,imagey,gridNumber){
	this.img = document.getElementById('avatar');
	this.cellX = x;
	this.cellY = y;
	this.imagex = imagex;
	this.imagey = imagey;
    this.gridNumber = gridNumber;
}

function cell(x,y,row,col,gridNumber,status = null){
	this.x = x;
	this.y = y;
    this.row = row;
    this.col = col;
	this.status = status;
	this.visited = 0;
    this.gridNumber = gridNumber;
    this.top = 1;
    this.bottom = 1;
    this.left = 1;
    this.right = 1;
}

//remove grid lines
function clearTop(cell1){
    context.clearRect(cell1.x+1,cell1.y-2,colWidth-2,3);
    cellArray[cell1.gridNumber].top = 0;
    cellArray[cell1.gridNumber - 1].bottom = 0;
}

function clearBottom(cell1){
    context.clearRect(cell1.x+2,cell1.y+colHeight-2,colWidth-2,3);
    cellArray[cell1.gridNumber].bottom = 0;
    cellArray[cell1.gridNumber + 1].top = 0;
}

function clearRight(cell1){
context.clearRect(cell1.x+colWidth-2,cell1.y,3,colHeight-2);
cellArray[cell1.gridNumber].right = 0;
cellArray[cell1.gridNumber + grid].left = 0;
}

function clearLeft(cell1){
context.clearRect(cell1.x-2,cell1.y,3,colHeight-2);
cellArray[cell1.gridNumber].left = 0;
cellArray[cell1.gridNumber - grid].right = 0;
}

function timer() {
    timeToComplete++;
    document.getElementById('timer').innerHTML = timeToComplete;
}
 
var timeToComplete = 0;
var numberOfMoves = 0;
var myTimer;
var endingCell;
var finished = 0;
grid = parseInt(grid);
//array of cells
var cellArray = [];
var x = 0;
var z = 0;
for(x; x < grid; x++){
	var y = 0;
    for(y; y < grid; y++) {
        cellArray[z] = new cell(colWidth*x,colHeight*y, y, x, z);

        z++;

    }
}
//load vertical lines
x=0;
for (x; x <= grid; x++) {
context.beginPath();
context.moveTo(colWidth*x,0);
context.lineTo(colWidth*x,canvas.height);
context.stroke();
}

//load horizontal lines
var y=0;
for (y; y <= grid; y++) {
context.beginPath();
context.moveTo(0,colHeight*y);
context.lineTo(canvas.width,colHeight*y);
context.stroke();
}

console.log(cellArray);
//get random starting cell

var randomCell = Math.floor(Math.random()*grid*grid);
var startingCell = cellArray[randomCell];
startingCell.status = 'start';
console.log(startingCell);


//build path
currentCell = startingCell;
var cellVisitedOrder = [];
var p = 0;
cellVisitedOrder[p] = currentCell;
while (currentCell != 0) {

var surroundingCells = [];
var nonVisitiedCells = [];
var nextPossibleCells = [];

//set currentCell to visited
cellArray[currentCell.gridNumber].visited = 1;

//grab the surrounding cells
if(currentCell.col != 0) {
    leftCell = cellArray[currentCell.gridNumber - grid];
    surroundingCells.push(leftCell);
}
if(currentCell.row != 0) {
    topCell = cellArray[currentCell.gridNumber - 1];
    surroundingCells.push(topCell);
}
if(currentCell.row != grid-1) {
    bottomCell = cellArray[currentCell.gridNumber + 1];
    surroundingCells.push(bottomCell);
}
if(currentCell.col != grid-1) {
    rightCell = cellArray[currentCell.gridNumber + grid];
    surroundingCells.push(rightCell);
}

//Check to see if cells have been visited
surroundingCells.forEach(function(cell){
    if( cell.visited == 0) {
        nonVisitiedCells.push(cell);
    }
});

//decide where to go next
if(nonVisitiedCells.length == 0) {
    nextCell =  cellVisitedOrder[p-1];
    if(p > grid*(grid/3) && isEmpty(endingCell)){
        endingCell = cellVisitedOrder[p];
    }
    p = p-1;
} else {
    p++;

    nextCell = nonVisitiedCells[Math.floor(Math.random()*(nonVisitiedCells.length))];
    cellVisitedOrder[p] = nextCell;
    if(cellVisitedOrder[p].gridNumber - cellVisitedOrder[p-1].gridNumber == -1){
        clearTop(cellVisitedOrder[p-1]);
    }
    if(cellVisitedOrder[p].gridNumber - cellVisitedOrder[p-1].gridNumber == 1){
        clearBottom(cellVisitedOrder[p-1]);
    }
    if(cellVisitedOrder[p].gridNumber - cellVisitedOrder[p-1].gridNumber == grid){
        clearRight(cellVisitedOrder[p-1]);
    }
    if(cellVisitedOrder[p].gridNumber - cellVisitedOrder[p-1].gridNumber == -grid){
        clearLeft(cellVisitedOrder[p-1]);
    }
}


if (isEmpty(nextCell)){
currentCell = 0;
} else {
    currentCell = nextCell;
}

//console.log("cellVisited");
//console.log(cellVisitedOrder);
//console.log("surrounding");
//console.log(surroundingCells);
//console.log("non visited");
//console.log(nonVisitiedCells);
//console.log("next cell");
//console.log(nextCell);
}
if(!isEmpty(endingCell)){
    cellArray[endingCell.gridNumber].status = "end";
}
//cellArray[cellVisitedOrder[cellVisitedOrder.length - 1].gridNumber].status = "end";
//console.log(cellArray[cellVisitedOrder[cellVisitedOrder.length - 1].gridNumber]);

//load sprite
var avatar = new avatar(startingCell.x,startingCell.y,startingCell.x + colWidth/4,startingCell.y + colHeight/4, startingCell.gridNumber)
context.drawImage(avatar.img,avatar.imagex,avatar.imagey,colHeight/2,colWidth/2);

//color in ending cell
context.fillStyle="blue";
context.fillRect(endingCell.x+(colWidth/4),endingCell.y+(colHeight/4),colWidth/2,colHeight/2);

//movement
canvas.addEventListener( "keydown", doKeyDown, true);

function doKeyDown(e) {
    //start timer
    if(numberOfMoves == 0) {
        timeToComplete = 0;
        clearInterval(myTimer);
        myTimer = setInterval(function(){ timer() },1000);
    }
    if( finished != 1){
	//right
    if(39 === e.keyCode ){
      
    	if (avatar.cellX <= canvas.width - (colWidth*1.1) && cellArray[avatar.gridNumber].right != 1) {
            context.clearRect(avatar.cellX+1,avatar.cellY+1,colWidth-2,colHeight-2);
            avatar.cellX = avatar.cellX + colWidth;
            avatar.imagex = avatar.imagex + colWidth;
            context.drawImage(avatar.img,avatar.imagex,avatar.imagey,colHeight/2,colWidth/2);
            avatar.gridNumber = avatar.gridNumber + grid;
            numberOfMoves++;
        }
    }
    //left
    if(37 === e.keyCode ){

    	if (avatar.cellX > 0 && cellArray[avatar.gridNumber].left != 1) {
            context.clearRect(avatar.cellX+1,avatar.cellY+1,colWidth-2,colHeight-2);
            avatar.cellX = avatar.cellX - colWidth;
            avatar.imagex = avatar.imagex - colWidth;
            context.drawImage(avatar.img,avatar.imagex,avatar.imagey,colHeight/2,colWidth/2);
            avatar.gridNumber = avatar.gridNumber - grid;
            numberOfMoves++;
        }
    }
    //up
    if(38 === e.keyCode ){

    	if (avatar.cellY > 0 && cellArray[avatar.gridNumber].top != 1) {
            context.clearRect(avatar.cellX+1,avatar.cellY+1,colWidth-2,colHeight-2);
            avatar.cellY = avatar.cellY - colHeight;
            avatar.imagey = avatar.imagey - colHeight;
            context.drawImage(avatar.img,avatar.imagex,avatar.imagey,colHeight/2,colWidth/2);
            avatar.gridNumber = avatar.gridNumber - 1;
            numberOfMoves++;
        }
    }
    //down
    if(40 === e.keyCode ){

    	if (avatar.cellY <= canvas.height - (colHeight*1.1) && cellArray[avatar.gridNumber].bottom != 1) {
            context.clearRect(avatar.cellX+1,avatar.cellY+1,colWidth-2,colHeight-2);
            avatar.cellY = avatar.cellY + colHeight;
            avatar.imagey = avatar.imagey + colHeight;
            context.drawImage(avatar.img,avatar.imagex,avatar.imagey,colHeight/2,colWidth/2);
            avatar.gridNumber = avatar.gridNumber + 1;
            numberOfMoves++;
        }
    }
    if(cellArray[avatar.gridNumber].status == "end"){
        finished = 1;
        console.log("end");
    }
    //console.log(avatar);
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
return true;
}
