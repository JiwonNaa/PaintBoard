const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width")
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");
const destroBtn = document.getElementById("destro-btn")
const inputFile = document.getElementById("file");
const eraseBtn = document.getElementById("erase-btn");
const inputText = document.getElementById("text");
const saveBtn = document.getElementById("save");

const ctx = canvas.getContext("2d");

/* 상수 */
const CANVAS_WIDTH=800;
const CANVAS_HEIGHT=800;

canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth=lineWidth.value;
ctx.lineCap="round"
let isPainting=false;
let isFilling=false;

function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
  isPainting=true;
}
function cancelPainting(){
  isPainting= false;
  ctx.beginPath();
}

function onLisneWidthChange(event){
  ctx.lineWidth=event.target.value;
}

function onColorChange(event){
  ctx.strokeStyle=event.target.value;
  ctx.fillStyle=event.target.value;
}

function onColorClick(event){
  ctx.strokeStyle=event.target.dataset.color;
  ctx.fillStyle=event.target.dataset.color;
}
function onModeClick(){
  if(isFilling){
    isFilling=false;
    modeBtn.innerText="Fill"
  }else{
    isFilling=true;
    modeBtn.innerText="Draw"
  }
}

function onCanvasClick(){
  if(isFilling){
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  }
}

function onDestroClick(){
  ctx.fillStyle ="white";
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraseClick(){
  ctx.strokeStyle="white";
  isFilling=false;
  modeBtn.innerText="Fill"
}
function onFileChange(event){
  const file=event.target.files[0];
  const url= URL.createObjectURL(file);
  const image = new Image();
  image.src=url;
  image.onload=function(){
    ctx.drawImage(image, 200,200,400,400);
    inputFile.value=null;
  }
}
function onDoubleClick(event){
  const text = inputText.value;
  if(text !==""){
    ctx.save();
    ctx.lineWidth=1;
    ctx.font="100px";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore; 
  }
}

function onSaveClick(){
  const url = canvas.toDataURL();
  const a= document.createElement("a");
  a.href =url;
  a.download ="myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click",onCanvasClick);
lineWidth.addEventListener("change",onLisneWidthChange);  
color.addEventListener("change",onColorChange);

colorOptions.forEach((color) => color.addEventListener("click",  onColorClick));

modeBtn.addEventListener("click",onModeClick);
destroBtn.addEventListener("click", onDestroClick);
inputFile.addEventListener("change",onFileChange);
eraseBtn.addEventListener("click",onEraseClick);
saveBtn.addEventListener("click", onSaveClick);