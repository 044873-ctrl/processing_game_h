var cols=10,rows=20,cellSize=30;
var grid;
var currentPiece;
var colors=[];
var gameOver=false;
var score=0;
var dropCounter=0;
var baseDrop=30;
var tetrominoes=[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]]];
function createEmptyGrid(){var g=[];for(var r=0;r<rows;r++){var row=[];for(var c=0;c<cols;c++){row[c]=0;}g[r]=row;}return g;}
function rotateMatrix(m){var res=[];for(var r=0;r<4;r++){res[r]=[0,0,0,0];}for(var r=0;r<4;r++){for(var c=0;c<4;c++){res[c][3-r]=m[r][c];}}return res;}
function validPosition(shape,x,y){for(var r=0;r<4;r++){for(var c=0;c<4;c++){if(shape[r][c]===1){var nx=x+c;var ny=y+r;if(nx<0||nx>=cols||ny>=rows){return false;}if(ny>=0&&grid[ny][nx]!==0){return false;}}}}return true;}
function movePiece(dx){var nx=currentPiece.x+dx;if(validPosition(currentPiece.shape,nx,currentPiece.y)){currentPiece.x=nx;}}
function rotatePiece(){var ns=rotateMatrix(currentPiece.shape);if(validPosition(ns,currentPiece.x,currentPiece.y)){currentPiece.shape=ns;}}
function lockPiece(){var shape=currentPiece.shape;for(var r=0;r<4;r++){for(var c=0;c<4;c++){if(shape[r][c]===1){var gx=currentPiece.x+c;var gy=currentPiece.y+r;if(gy>=0&&gy<rows&&gx>=0&&gx<cols){grid[gy][gx]=currentPiece.id;}}}}clearLines();spawnPiece();}
function clearLines(){var lines=0;for(var r=rows-1;r>=0;r--){var full=true;for(var c=0;c<cols;c++){if(grid[r][c]===0){full=false;break;}}if(full){lines++;grid.splice(r,1);var newRow=[];for(var c=0;c<cols;c++){newRow[c]=0;}grid.unshift(newRow);r++;}}if(lines>0){score+=lines*100;}}
function randomTetromino(){var idx=Math.floor(Math.random()*tetrominoes.length);var shape=tetrominoes[idx];return {shape:shape,x:3,y:-1,id:idx+1};}
function spawnPiece(){currentPiece=randomTetromino();if(!validPosition(currentPiece.shape,currentPiece.x,currentPiece.y)){gameOver=true;}}
function setup(){createCanvas(cols*cellSize,rows*cellSize);grid=createEmptyGrid();colors=[color(0,240,240),color(240,240,0),color(160,0,240),color(255,160,0),color(0,0,240),color(0,240,0),color(240,0,0),color(200,120,200)];textSize(18);spawnPiece();}
function draw(){background(30);stroke(50);for(var r=0;r<rows;r++){for(var c=0;c<cols;c++){var v=grid[r][c];if(v!==0){fill(colors[v-1]);}else{fill(20);}rect(c*cellSize,r*cellSize,cellSize,cellSize);}}if(currentPiece&& !gameOver){var shape=currentPiece.shape;for(var r=0;r<4;r++){for(var c=0;c<4;c++){if(shape[r][c]===1){var gx=currentPiece.x+c;var gy=currentPiece.y+r;if(gy>=0){fill(colors[currentPiece.id-1]);rect(gx*cellSize,gy*cellSize,cellSize,cellSize);}}}}var dropInterval=keyIsDown(DOWN_ARROW)?5:baseDrop;dropCounter++;if(dropCounter>=dropInterval){dropCounter=0;var ny=currentPiece.y+1;if(validPosition(currentPiece.shape,currentPiece.x,ny)){currentPiece.y=ny;}else{lockPiece();}}}fill(255);noStroke();text('Score: '+score,8,20);if(gameOver){fill(255,50,50);textSize(32);textAlign(CENTER,CENTER);text('Game Over',width/2,height/2);textSize(18);textAlign(LEFT,BASELINE);}}
function keyPressed(){if(gameOver){return;}if(keyCode===LEFT_ARROW){movePiece(-1);}else if(keyCode===RIGHT_ARROW){movePiece(1);}else if(keyCode===UP_ARROW){rotatePiece();}else if(keyCode===DOWN_ARROW){var ny=currentPiece.y+1;if(validPosition(currentPiece.shape,currentPiece.x,ny)){currentPiece.y=ny;}else{lockPiece();}}}
