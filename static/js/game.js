/**
 * Created by peterjaap on 11/1/2014.
 */

var stage;
var queue;
var game;

window.addEventListener('resize', redrawCanvas, false);

$(document).ready(function () {
    createjs.Ticker.addEventListener("tick", tick);

    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.addEventListener('complete', init);
    queue.loadManifest([{id:'village',src:'images/fortress.png'}]);
});

function redrawCanvas() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    stage = new createjs.Stage('gamecanvas');
    game.drawBridges();
    game.drawVillages();
}

function tick() {
    stage.update();
}

function init() {
    stage = new createjs.Stage('gamecanvas');
    game = new Game();
    redrawCanvas();
}

function Game() {
    /* Define positions of villages */
    this.villages = Array();
    this.villages[1] = {top:5,left:13 };
    this.villages[2] = {top:36, left:19 };
    this.villages[3] = {top:64, left:11 };
    this.villages[4] = {top:5, left:48 };
    this.villages[5] = {top:23, left:38 };
    this.villages[6] = {top:49, left:41 };
    this.villages[7] = {top:79, left:33 };
    this.villages[8] = {top:21, left:64 };
    this.villages[9] = {top:38, left:61 };
    this.villages[10] = {top:78, left:63 };
    this.villages[11] = {top:9, left:78 };
    this.villages[12] = {top:40, left:82 };
    this.villages[13] = {top:57, left:75 };
    this.villageWidth = 0.1;
    this.villageHeight = 0.12;

    /* Define the bridges that connect the villages
     * From and to refers to index key in the this.villages object above
     */
    this.bridges = Array();
    this.bridges[1] = {from:1, to:3};
    this.bridges[2] = {from:3, to:7};
    this.bridges[3] = {from:1, to:2};
    this.bridges[4] = {from:2, to:3};
    this.bridges[5] = {from:1, to:5};
    this.bridges[6] = {from:5, to:2};
    this.bridges[7] = {from:2, to:7};
    this.bridges[8] = {from:1, to:4};
    this.bridges[9] = {from:5, to:8};
    this.bridges[10] = {from:4, to:11};
    this.bridges[11] = {from:8, to:11};
    this.bridges[12] = {from:11, to:12};
    this.bridges[13] = {from:4, to:8};
    this.bridges[14] = {from:5, to:6};
    this.bridges[15] = {from:6, to:7};
    this.bridges[16] = {from:6, to:10};
    this.bridges[17] = {from:6, to:9};
    this.bridges[18] = {from:7, to:10};
    this.bridges[19] = {from:10, to:13};
    this.bridges[20] = {from:9, to:13};
    this.bridges[21] = {from:12, to:13};
    this.bridges[22] = {from:8, to:12};
    this.bridges[23] = {from:8, to:9};
}

Game.prototype.drawVillages = function() {
    /* Loop through villages */
    for(i=1;i<this.villages.length;i++) {
        /* Get and calculate village positions and edges */
        var x = stage.canvas.clientWidth * (this.villages[i]['left']/100);
        var y = stage.canvas.clientHeight * (this.villages[i]['top']/100);
        var width = stage.canvas.clientWidth * this.villageWidth;
        var height = stage.canvas.clientHeight * this.villageHeight;

        /* Add image to stage */
        var village = new createjs.Bitmap(queue.getResult('village'));
        console.log('Adding village to stage on position ' + x + ', ' + y + ' dimensions ' + width + 'x' + height);
        village.x = x;
        village.y = y;
        bounds = village.getBounds();
        village.scaleX = width / bounds.width;
        village.scaleY = height / bounds.height;
        stage.addChild(village);
    }
}

Game.prototype.drawBridges = function() {
    /* Loop through bridges */
    for(i=1;i<this.bridges.length;i++) {
        var width = stage.canvas.clientWidth * this.villageWidth;
        var height = stage.canvas.clientHeight * this.villageHeight;

        /* Get x and y positions for source and target villages from villages object */
        from = this.villages[this.bridges[i]['from']];
        to = this.villages[this.bridges[i]['to']];

        var from_x = stage.canvas.clientWidth * (from['left']/100) + height/2;
        var from_y = stage.canvas.clientHeight * (from['top']/100) + height/2;

        var to_x = stage.canvas.clientWidth * (to['left']/100) + height/2;
        var to_y = stage.canvas.clientHeight * (to['top']/100) + height/2;

        /* Draw line */
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(1);
        line.graphics.beginStroke('#000');

        console.log('Drawing a line from ' + from_x + 'x' + from_y + ' to ' + to_x + 'x' + to_y);
        line.graphics.moveTo(from_x,from_y);
        line.graphics.lineTo(to_x,to_y);
        line.graphics.endStroke();
        stage.addChild(line);
    }
}

Game.prototype.drawStoneOfTheWiseMen = function(village_id) {
    var width = stage.canvas.clientWidth * this.villageWidth;
    var height = stage.canvas.clientHeight * this.villageHeight;

    var x = stage.canvas.clientWidth * (this.villages[village_id]['left']/100) + height/2;
    var y = stage.canvas.clientHeight * (this.villages[village_id]['top']/100) + height/2;

    this.ctx.beginPath();
    this.ctx.arc(x, y, 15, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'lightblue';
    this.ctx.fill();
}