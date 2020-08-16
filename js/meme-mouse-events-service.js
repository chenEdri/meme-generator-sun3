'use strict';

// variables to save last mouse position
var gStartX;
var gStartY;

// this var will hold the index of the hit-selected text
var gSelectedTextIdx = -1;


function textHittest(x, y, textIndex) {
    return (x >= 10 && x <= gCanvas.width - 20 &&
        y >= gMeme.line[textIndex].placeInCanvas.y - 40 &&
        y <= gMeme.line[textIndex].placeInCanvas.y + 30);
}


function handleMouseDown(ev) {
    ev.preventDefault();
    var { offsetX, offsetY } = ev;
    gStartX = offsetX;
    gStartY = offsetY;
    for (var i = 0; i < gMeme.line.length; i++) {
        if (textHittest(gStartX, gStartY, i)) {
            gSelectedTextIdx = i;
            gCurrIdx = gSelectedTextIdx;
        }
    }
    renderCanvas();
}


// done dragging
function handleMouseUp(ev) {
    ev.preventDefault();
    gSelectedTextIdx = -1;
}

function handleMouseOut(ev) {
    ev.preventDefault();
    gSelectedTextIdx = -1;
}


function handleMouseMove(ev) {
    if (gSelectedTextIdx < 0) {
        return;
    }
    ev.preventDefault();
    if (_checkBorderXLimits(ev)) {
        var { offsetX, offsetY } = ev;
        gCurrIdx = gSelectedTextIdx;
        var mouseX = offsetX;
        var dx = mouseX - gStartX;
        gStartX = mouseX;
        gMeme.line[gSelectedTextIdx].placeInCanvas.x += dx;
    } if (_checkBorderYLimits()) {
        var { offsetX, offsetY } = ev;
        var mouseY = offsetY;
        var dy = mouseY - gStartY;
        gStartY = mouseY;
        gMeme.line[gSelectedTextIdx].placeInCanvas.y += dy;
    }
    renderCanvas();
}

function handleTouchMove(ev){
    if (gSelectedTextIdx < 0) {
        return;
    }
    ev.preventDefault();
    if (_checkBorderXLimits(ev)) {
        var { offsetX, offsetY } = ev;
        gCurrIdx = gSelectedTextIdx;
        var mouseX = offsetX;
        var dx = mouseX - gStartX;
        gStartX = mouseX;
        gMeme.line[gSelectedTextIdx].placeInCanvas.x += dx;
    } if (_checkBorderYLimits()) {
        var { offsetX, offsetY } = ev;
        var mouseY = offsetY;
        var dy = mouseY - gStartY;
        gStartY = mouseY;
        gMeme.line[gSelectedTextIdx].placeInCanvas.y += dy;
    }
}

function _checkBorderXLimits(ev) {
    var widthTxt = gCtx.measureText(gMeme.line[gSelectedTextIdx].txt).width;
    var {offsetX} = ev;
    if(gMeme.line[gCurrIdx].align === 'center') return (offsetX + (widthTxt) < gCanvas.width && offsetX/2- (widthTxt/2) > 0);
    else return (gStartX + widthTxt < gCanvas.width && offsetX - widthTxt > 0);
}
function _checkBorderYLimits() {
    var heightTxt = gMeme.line[gSelectedTextIdx].size;
    return (gStartY + heightTxt < gCanvas.height && gStartY - heightTxt >= 0)
}


