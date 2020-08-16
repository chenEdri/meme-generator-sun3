'use strict';


var gLineToggle = false;
var gCanvas = document.getElementById('myCanvas');
var gCtx;
var gMeme = {};
var gKeywords = {};
var gCurrPage =[];
var gStickers=['💋','🎶','✌','🍕','🍟','🍔','🥗','🍗','🥩','🥨','🎆','🕶','👳‍♂️','🚲','🎂'];

// changing size off the screen handle

const x = window.matchMedia("(max-width: 680px)");
onResize(x);
x.addListener(onResize);

const y = window.matchMedia("(max-width: 450px)");
onResize2(y);
y.addListener(onResize2);


function onInit() {
    gCurrPage.push('main');
    gCtx = gCanvas.getContext('2d');
    creatInitialKeyWords();
    creatInitialImgObject();
    creatMemeObject();
    renderImages(gImgs);
    renderSearchBar();
    renderStickers();
    loadMemesFromStorage();
}

//MEDIA FUNCTIONS
function onResize(x) {
    const elCanvas = document.getElementById('myCanvas');
    if (x.matches) {
        elCanvas.style.width = '330px';
        elCanvas.style.height = '330px';
    } else {
        elCanvas.style.width = '540px';
        elCanvas.style.height = '550px';
    }
}

function onResize2(y) {
    const elCanvas = document.getElementById('myCanvas');
    if (y.matches) {
        elCanvas.style.width = '250px';
        elCanvas.style.height = '250px';
    }
}


//FRONT PAGE FUNCTIONS
function renderSearchBar(){
    const elKeyBar = document.getElementById('keywords-bar');
    loadKeysFromLocalServer();
    var htmlStr='';
    if (gKeySearched !== null){
        htmlStr=gKeySearched.map(key=>`<span class ="${key.key}" onClick="onSortByKeyPress(this)" onmouseover="onHoverStyle(this)" 
        onmouseout="cleanBgc(this)">${key.key}</span>`);
        elKeyBar.innerHTML=htmlStr.join('');
        gKeySearched.forEach(key => {
            var elKey = document.querySelector(`.${key.key}`);
            elKey.style.fontSize = `${key.size}px`;
        });
    }else{
        getDefaultKeys();
        htmlStr=`<span>family</span>
        <span>politic</span>
        <span>funny</span>
        <span>animals</span>
        <span>dogs</span>`;
        elKeyBar.innerHTML=htmlStr;
    }
}


function renderImages(images) {
    const elImagContainer = document.querySelector('.main-pic-container');
    var htmlStr = images.map(img=>`<img id=${img.id} src="${img.url}" alt="pic" onclick = "onOpenMemeGeneratorModal(this)">`);
    elImagContainer.innerHTML = htmlStr.join('');
}



function onOpenMemeGeneratorModal(elImg) {
    openMemeGeneratorModal(elImg);
}

function onOpenMyMemsModal(){
    openMyMemsModal();
}

function onSortByKey(keyValue) {
    sortImgsByKeyVal(keyValue);
}

function onSortByKeyPress(elBtn){
    updateKeySearchBar(elBtn.innerText);
    sortImgsByKeyVal(elBtn.innerText)
}

function onHoverStyle(elKey){
    elKey.style.cursor='pointer';
    elKey.style.backgroundColor = 'rgb(201,191,202)';
}

function cleanBgc(elKey){
    elKey.style.backgroundColor = 'white';
}

// MEME-CANVAS PAGE FUNCTIONS


function renderCanvas() {
    clearCanvas();
    drawImgFromlocal();
    createTextBox();
    drawText();
}

function renderStickers(){
    const elStickerCon = document.querySelector('.stickers-container');
    let htmlStr = gStickers.map(sticker=>{
        return `<span onclick="onAddStickerToCanvas(this)">${sticker}</span>`;
    });
    elStickerCon.innerHTML = htmlStr.join('');
}


function onAddletter(elTxt) {
    addletter(elTxt);
}

function onDeleteText() {
    deleteText();
    renderCanvas();
}


function onIncreaseFont() {
    increaseFontSize();
}

function onDecreaseFont() {
    decreaseFontSize();
}

function onMoveUp() {
    moveUp();
}

function onMoveDown() {
    moveDown()
}

function onTextRight() {
    moveTextRight();
}

function onTextMiddle() {
    moveTextCenter();
}

function onTextLeft() {
    moveTextLeft();
}

function onChangeTextColor(elColor) {
    changeTextColor(elColor);
}

function onChangeFontType(elFontType) {
    changeFontType(elFontType);
}

function onAddTextLine() {
    addTextLine();
}

function onSwitchUp() {
    switchLinesUp();
}

function onSwitchDown() {
    switchLinesDown();
}

function onToggleSwitch() {
    if (gLineToggle) switchLinesUp();
    else switchLinesDown();
    gLineToggle = !gLineToggle;
}

function onSaveImg(elLink) {
    clearCanvas();
    drawImgFromlocal();
    drawText();
    saveImgToLocalServer();
    downloadCanvas(elLink);
}

function onAddTextBox() {
    createTextBox();
}

function onShareToFB(elForm, ev) {
    uploadImg(elForm, ev);
}

function onGoBackToMainPage() {
    goBackToMain();
}

function onAddStickerToCanvas(elBtn) {
    addStickerToCanvas(elBtn.innerText);
}

//MOUSE AND TOUCH EVENTS

function onHandleMouseDown(ev) {
    handleMouseDown(ev);
}

function onHandleMouseMove(ev) {
    handleMouseMove(ev);
}

function onHandleMouseOut(ev) {
    handleMouseOut(ev);
}

function onHandleMouseUp(ev) {
    handleMouseUp(ev);
}

function onHandleTouchMove(ev){
    handleTouchMove(ev);
}


function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}