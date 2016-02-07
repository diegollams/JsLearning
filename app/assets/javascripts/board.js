(function (){

    self.Board  = function(width , height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    };
    self.Board.prototype = {
        get elements (){
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }
})();
(function(){
    self.Bar = function(x,y,width,heigth,board){
        this.constants = {
            SQUARE: 'square'
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.board = board;
        this.kind = this.constants.SQUARE;
        this.board.bars.push(this);
        this.speed = 10;
    };

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.x += this.speed;
        },
        toString: function(){
            return "x: " +  this.x + " y: "+ this.y;
        }
    }
})();
(function(){
    self.BoardView = function (canvas,board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.context = canvas.getContext("2d");
    };
    self.BoardView.prototype = {
        draw: function (){
            var elements = this.board.elements;
            for(var i = elements.length - 1;i >= 0;i-- ){
                draw(this.context,elements[i]);
            }

        }
    };
    function draw(context,element){
        if(element === null) return;
        switch(element.kind) {
            case 'square':
                context.fillRect(element.x,element.y,element.width,element.height);
                break;
        }
    }
})();


function main(){

    var board = new Board(400,400);
    console.log(document.getElementById('canvas'));
    var boardView = new BoardView(document.getElementById('canvas'),board);
    var bar  =  new Bar(20,100,40,100,board);
    var bar2  =  new Bar(340,100,40,100,board);
    boardView.draw();
}
//$( document ).ready(main);
$( document ).keydown(function(event){
    if(event.keyCode === 38){
        bar.up();
    }
    else if(event.keyCode == 40){
        bar.down();
    }
});

