function choseCharacters() {
    
}

function buildgrid(id) {
    var c_canvas = document.getElementById(id);
    var context = c_canvas.getContext("2d");
    var width = c_canvas.width - 10;
    var height = c_canvas.height - 40;
    var squareWidthSize = (width-10)/10;
    var squareHeightSize = height/6;
	rowNumber = 1;
        columnNumber = 1;
	var Columns = [];
	var Rows = [];
    for (var x = 10 ; x < width; x += squareWidthSize) {
       context.moveTo(x, 0);
       context.lineTo(x, height);
       let column = new Column(columnNumber,x);
       Columns.push(column);
       columnNumber++;
    }
console.log(Columns);
       context.moveTo(width , 0);
       context.lineTo(width , height);

    for (var y = 1; y < height; y += squareHeightSize) {
       context.moveTo(10, y);
       context.lineTo(width, y);
       let row = new Row(rowNumber,y);
       Rows.push(row);
       rowNumber++;
    }
console.log(Rows);
       context.moveTo(10, height);
       context.lineTo(width, height);
    

    context.strokeStyle = "#FFFFF";
    context.stroke();


}

function Row(rowNumber, y) {
    this.rowNumber = rowNumber;
    this.y = y;
}

function Column(ColumnNumber, x) {
    this.columnNumber = ColumnNumber;
    this.x = x;
}
