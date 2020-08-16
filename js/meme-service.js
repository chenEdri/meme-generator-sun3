'use strict';


var gTextBox = { leftBorder: 10, rightBorder: gCanvas.width - 20, topBorder: 5, buttumBorder: 0 }
var gCurrIdx = 0;
var gCurrImg = '';
var gSortedByYval = [];
var gBoxHeight = 60;
var gButoomBorder = 40;
var gStickerIdx =[];

function creatMemeObject() {
    gMeme = {
        selectedImgId: gCurrImg,
        selectedLineIdx: gCurrIdx,
        maxLines: 0,
        line: [
            {
                txt: 'tap here!',
                size: 40,
                align: 'center',
                font: 'impact',
                color: 'white',
                placeInCanvas: { x: (gCanvas.width / 2), y: 70 },
            }
        ]
    }
}

function drawImgFromlocal() {
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
}

function drawText() {
    for (let i = 0; i <= gMeme.maxLines; i++) {
        var x = gMeme.line[i].placeInCanvas.x;
        var y = gMeme.line[i].placeInCanvas.y;
        var text = gMeme.line[i].txt;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = gMeme.line[i].color;
        gCtx.font = `${gMeme.line[i].size}px ${gMeme.line[i].font}`;
        gCtx.textAlign = gMeme.line[i].align;
        gCtx.fillText(text, x, y);
        gCtx.strokeText(text, x, y);
    }
}


function addletter(elTxt) {
    gMeme.line[gCurrIdx].txt = elTxt;
    renderCanvas();
}

function createTextBox() {
    if (gMeme.line[gCurrIdx].txt === 'tap here!') drawText();
    const yPos = gMeme.line[gCurrIdx].placeInCanvas.y - gButoomBorder;
    gCtx.beginPath();
    gCtx.rect(10, yPos, gCanvas.width - 20, gBoxHeight);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function deleteText() {
    gMeme.line[gCurrIdx].txt = '';
    var elTxt = document.getElementById('meme-text');
    elTxt.value = '';
    if (gCurrIdx === 0) {
        renderCanvas();
        return;
    }
    gMeme.line.splice(gCurrIdx, 1);
    gCurrIdx--;
    gMeme.maxLines--;
    if(gMeme.maxLines !== 9) _showAddButton();
    renderCanvas();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, 540, 550);
}

function increaseFontSize() {
    gMeme.line[gCurrIdx].size += 2;
    gBoxHeight += 2;
    gButoomBorder += 2;
    renderCanvas();
}

function decreaseFontSize() {
    gMeme.line[gCurrIdx].size -= 2;
    gBoxHeight -= 2;
    gButoomBorder -= 2;
    renderCanvas();
}

function moveUp() {
    gMeme.line[gCurrIdx].placeInCanvas.y -= 15;
    renderCanvas();
}

function moveDown() {
    gMeme.line[gCurrIdx].placeInCanvas.y += 15;
    renderCanvas();
}

function moveTextRight() {
    gMeme.line[gCurrIdx].placeInCanvas.x = gCanvas.width - 30;
    gMeme.line[gCurrIdx].align = 'start';
    var elTxt = document.getElementById('meme-text');
    elTxt.style.textAlign = 'right';
    elTxt.style.direction = 'rtl';
    var elCanvas = document.getElementById('myCanvas');
    elCanvas.dir = 'rtl';
    renderCanvas();
}

function moveTextCenter() {
    gMeme.line[gCurrIdx].placeInCanvas.x = (gCanvas.width / 2);
    gMeme.line[gCurrIdx].align = 'center';
    var elTxt = document.getElementById('meme-text');
    elTxt.style.textAlign = 'center';
    renderCanvas();
}

function moveTextLeft() {
    gMeme.line[gCurrIdx].placeInCanvas.x = 30;
    gMeme.line[gCurrIdx].align = 'start';
    var elTxt = document.getElementById('meme-text');
    elTxt.style.direction = 'ltr';
    elTxt.style.textAlign = 'left';
    var elCanvas = document.getElementById('myCanvas');
    elCanvas.dir = 'ltr';
    renderCanvas();
}

function changeTextColor(elColor) {
    gMeme.line[gCurrIdx].color = elColor;
    renderCanvas();
}

function changeFontType(fontType) {
    gMeme.line[gCurrIdx].font = fontType;
    renderCanvas();
}

function addTextLine() {
    console.log(gMeme.maxLines);
    gMeme.maxLines++;
    gCurrIdx = gMeme.maxLines;
    gMeme.selectedLineIdx++;
    _updateNewLineInMeme();
    var elTxt = document.getElementById('meme-text');
    elTxt.value = '';
    if(gMeme.maxLines === 9) _stopAddButton();
    renderCanvas();
}

function switchLinesUp() {
    sortLines();
    var yPos = gMeme.line[gCurrIdx].placeInCanvas.y;
    var idx = _findIdxInSortedLines(yPos);
    if (idx <= 0) return;
    gCurrIdx = gSortedByYval[idx - 1].idx;
    let elTxt = document.getElementById('meme-text');
    elTxt.value = gMeme.line[gCurrIdx].txt;
    renderCanvas();
}

function switchLinesDown() {
    sortLines();
    var yPos = gMeme.line[gCurrIdx].placeInCanvas.y;
    var idx = _findIdxInSortedLines(yPos);
    if (idx === -1 || idx === gMeme.maxLines) return;
    gCurrIdx = gSortedByYval[idx + 1].idx;
    let elTxt = document.getElementById('meme-text');
    elTxt.value = gMeme.line[gCurrIdx].txt;
    renderCanvas();
}

function _updateNewLineInMeme() {
    var yMaxPos = gCanvas.height;
    gMeme.line[gCurrIdx] = {
        txt: 'tap here!',
        size: 40,
        align: 'center',
        font: 'impact',
        color: 'white',
        placeInCanvas: { x: (gCanvas.width / 2), y: gMeme.line[gCurrIdx - 1].placeInCanvas.y },
    }
    if (gCurrIdx === 1) gMeme.line[gCurrIdx].placeInCanvas.y = yMaxPos - 60;
    if (gCurrIdx === 2) gMeme.line[gCurrIdx].placeInCanvas.y = yMaxPos/2;
    else if (gCurrIdx > 2 && gCurrIdx<6) gMeme.line[gCurrIdx].placeInCanvas.y -= 40;
    else if(gCurrIdx === 6) gMeme.line[gCurrIdx].placeInCanvas.y = yMaxPos/2 +30;
    else if (gCurrIdx > 6) gMeme.line[gCurrIdx].placeInCanvas.y += 40
}


function _findIdxInSortedLines(yPos) {
    var yPosIdx = gSortedByYval.findIndex(lineProperties => {
        return lineProperties.y === yPos;
    });
    return yPosIdx;
}

function sortLines() {
    gSortedByYval = [];
    gMeme.line.forEach(function (linesProperty, idx) {
        gSortedByYval.push({ y: linesProperty.placeInCanvas.y, idx })
    });
    gSortedByYval.sort(function (a, b) {
        return a.y - b.y;
    });
}

function saveImgToLocalServer() {
    const data = gCanvas.toDataURL();
    var img = gImgs[gMeme.selectedImgId - 1];
    gMyMems.push({ id: img.id, url: data, keywords: img.keywords });
    saveToStorage('myMems', gMyMems);
}

function goBackToMain() {
    var length = gCurrPage.length - 1;
    if (gCurrPage[length] === 'memeModal') {
        if (gCurrPage[length - 1] === 'myMemeModal') {
            gCurrPage.splice(length, 1);
            openMyMemsModal();
        } else {
            gCurrPage.splice(length, 1);
            openMain();
        }
    } else if (gCurrPage[length] === 'myMemeModal') {
        if (gCurrPage[length - 1] === 'memeModal') {
            gCurrPage.splice(length, 1);
            openMemeGeneratorModal();
        } else {
            gCurrPage.splice(length, 1);
            openMain();
        }
    }
}

function addStickerToCanvas(sticker){
    if(gCurrIdx !== 0 || gMeme.line[0].txt !== 'tap here!'){
    gMeme.maxLines++;
    gCurrIdx = gMeme.maxLines;
    gMeme.selectedLineIdx++;
    _updateNewLineInMeme();
    gMeme.line[gCurrIdx].txt = sticker;
    var elTxt = document.getElementById('meme-text');
    elTxt.value = '';
}else gMeme.line[gCurrIdx].txt = sticker;
renderCanvas();
}

function _stopAddButton(){
    document.querySelector('.add').style.display = 'none';
    const elInputTxt = document.querySelector('#meme-text');
    elInputTxt.placeholder ='YOU HAVE REACHED MAX LINES';
    gMeme.line[9].color= 'red';
}

function _showAddButton(){
    document.querySelector('.add').style.display = 'flex';
    document.querySelector('#meme-text').placeholder ='tap here!';
}