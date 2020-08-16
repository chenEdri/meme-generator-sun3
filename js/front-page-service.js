'use strict';

var gImg;
var gSticker;
var gMyMems = [];
const gImgs = [];
var gSortImgs = [];
var gKeywords;
var gKeySearched;


function creatInitialKeyWords() {
    gKeywords = [
        { key: 'happy', value: 0, size: 16 }, { key: 'funny', value: 0, size: 16 }, { key: 'politic', value: 0, size: 16 },
        { key: 'kids', value: 0, size: 16 }, { key: 'toys', value: 0, size: 16 }, { key: 'disney', value: 0, size: 16 },
        { key: 'clever', value: 0, size: 16 }, { key: 'animals', value: 0, size: 16 }, { key: 'movie', value: 0, size: 16 },
        { key: 'dogs', value: 0, size: 16 }, { key: 'cats', value: 0, size: 16 }, { key: 'love', value: 0, size: 16 }];
}

function loadMemesFromStorage() {
    gMyMems = loadFromStorage('myMems') || [];
}

function loadKeysFromLocalServer() {
    gKeySearched = loadFromStorage('keyWords');
}

function getDefaultKeys() {
    gKeySearched = gKeywords;
    saveToStorage('keyWords', gKeySearched);
}

function creatInitialImgObject() {
    gImgs.push(
        { id: 1, url: './imgs/meme-imgs (square)/1.jpg', keywords: ['politic', 'funny'] },
        { id: 2, url: './imgs/meme-imgs (square)/2.jpg', keywords: ['animals', 'dogs', 'love'] },
        { id: 3, url: './imgs/meme-imgs (square)/3.jpg', keywords: ['love', 'dogs'] },
        { id: 4, url: './imgs/meme-imgs (square)/4.jpg', keywords: ['love', 'cats', 'animals'] },
        { id: 5, url: './imgs/meme-imgs (square)/5.jpg', keywords: ['kids', 'funny', 'love'] },
        { id: 6, url: './imgs/meme-imgs (square)/6.jpg', keywords: ['politic', 'funny', 'clever'] },
        { id: 7, url: './imgs/meme-imgs (square)/7.jpg', keywords: ['kids', 'funny', 'love', 'happy'] },
        { id: 8, url: './imgs/meme-imgs (square)/8.jpg', keywords: ['movie', 'funny'] },
        { id: 9, url: './imgs/meme-imgs (square)/9.jpg', keywords: ['kids', 'funny', 'love', 'happy'] },
        { id: 10, url: './imgs/meme-imgs (square)/10.jpg', keywords: ['politic', 'happy', 'clever'] },
        { id: 11, url: './imgs/meme-imgs (square)/11.jpg', keywords: ['funny'] },
        { id: 12, url: './imgs/meme-imgs (square)/12.jpg', keywords: ['funny'] },
        { id: 13, url: './imgs/meme-imgs (square)/13.jpg', keywords: ['movie'] },
        { id: 14, url: './imgs/meme-imgs (square)/14.jpg', keywords: ['movie'] },
        { id: 15, url: './imgs/meme-imgs (square)/15.jpg', keywords: ['movie'] },
        { id: 16, url: './imgs/meme-imgs (square)/16.jpg', keywords: ['movie', 'happy', 'funny'] },
        { id: 17, url: './imgs/meme-imgs (square)/17.jpg', keywords: ['politic'] },
        { id: 18, url: './imgs/meme-imgs (square)/18.jpg', keywords: ['movie', 'kids', 'funny', 'disney', 'toys'] },
    )
}

function openMain() {
    gCurrPage.push('main');
    const elModal = document.querySelector('.meme-moadl');
    elModal.style.display = 'none';
    const elMainCon = document.querySelector('.main-canvas-cointainer');
    elMainCon.style.display = 'none';
    const elMemeModal = document.querySelector('.my-meme-modal');
    elMemeModal.style.display = 'none';
    const elPicPlatform = document.querySelector('.pic-platform');
    elPicPlatform.style.display = 'block';
    const elSearchBar = document.querySelector('.keywords');
    elSearchBar.style.display = 'flex';
    const elBackButton = document.querySelector('.back');
    elBackButton.style.display = 'none';
    renderImages(gImgs);
    renderSearchBar();
}

function openMemeGeneratorModal(elImg) {
    gCurrPage.push('memeModal');
    //OPEN AND CLOSE DIVES//
    const elModal = document.querySelector('.meme-moadl');
    elModal.style.display = 'block';
    const elMainCon = document.querySelector('.main-canvas-cointainer');
    elMainCon.style.display = 'flex';
    const elMemeModal = document.querySelector('.my-meme-modal');
    elMemeModal.style.display = 'none';
    const elPicPlatform = document.querySelector('.pic-platform');
    elPicPlatform.style.display = 'none';
    const elSearchBar = document.querySelector('.keywords');
    elSearchBar.style.display = 'none';
    const elBackButton = document.querySelector('.back');
    elBackButton.style.display = 'list-item';
    //UPLOAD IMAGE
    gImg = new Image()
    gImg.src = `${elImg.src}`;
    //SAVE OMG TO THE MEME OBJECT
    gMeme.selectedImgId = elImg.id;
    drawImgFromlocal();
}

function openMyMemsModal() {
    gCurrPage.push('myMemeModal');
    const elMemeModal = document.querySelector('.my-meme-modal');
    elMemeModal.style.display = 'grid';
    const elPicPlatform = document.querySelector('.pic-platform');
    elPicPlatform.style.display = 'none';
    const elMainCon = document.querySelector('.main-canvas-cointainer');
    elMainCon.style.display = 'none';
    const elSearchBar = document.querySelector('.keywords');
    elSearchBar.style.display = 'none';
    const elBackButton = document.querySelector('.back');
    elBackButton.style.display = 'list-item';
    if (gMyMems) renderMyMemeModal();
    else elMemeModal.innerText = 'nothing saved yet';
}

function renderMyMemeModal() {
    const elMemeCon = document.querySelector('.main-meme-cointainer');
    elMemeCon.innerHTML = '';
    var htmlStr = '';
    gMyMems.forEach(function (meme) {
        htmlStr += `<img id=${meme.id} src="${meme.url}" onclick = "onOpenMemeGeneratorModal(this)">`
    })
    elMemeCon.innerHTML += htmlStr;
}

function sortImgsByKeyVal(key) {
    if (key === '' || key === ' ') {
        renderImages(gImgs);
        return;
    }
    gSortImgs = [];
    gImgs.forEach(function (image) {
        image.keywords.forEach(function (keyword) {
            if (keyword.includes(key)) gSortImgs.push(image)
        });
    });
    renderImages(gSortImgs);
    gImgs.forEach(function(image){
        if(image.keywords.includes(key))
        updateKeyBar(key)
    });
}

function updateKeyBar(key) {
    if (key === '' || key === ' ') return;
    const idx = gKeySearched.findIndex(keyword => keyword.key === key);
    if (idx !== -1) {
        gKeySearched[idx].value++;
        gKeySearched[idx].size += 2;
    } else gKeySearched.push({ key: key, value: 0, size: 16 });
    saveToStorage('keyWords', gKeySearched);
    renderSearchBar();
}

function updateKeySearchBar(text){
    const elSearchInput= document.querySelector('.search');
    elSearchInput.placeholder = text;
}