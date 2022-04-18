const recordImage = document.querySelector('.record__image__container');
const recordName = document.querySelector('.name');
const recordGenre = document.querySelector('.genre');
const recordFormat = document.querySelector('.format');
const recordYear = document.querySelector('.year');
const recordPrice = document.querySelector('.price');
const basketBtn = document.querySelector('.add-to-basket-btn');
const tracklistContainer = document.querySelector('.tracklist__container');
const backToCatalogBtn = document.querySelector('.back__to__catalog');
const slider = document.querySelector('.can__be__interesting');
const interestingContainer = document.querySelector('.visible__part');
const leftBtn = document.querySelector('.left__swipe');
const rightBtn = document.querySelector('.right__swipe');

backToCatalogBtn.addEventListener('click', e => {
    window.location = './catalog.html'
});

async function displayRecordInfo() {
    const url = 'data.json';
    const res = await fetch(url);
    const records = await res.json();
    const recordNum = localStorage.getItem('record');
    const image = new Image();
    image.classList.add('record__image');
    image.src = records[recordNum].img;
    recordImage.append(image);
    recordName.textContent = records[recordNum].name;
    recordGenre.textContent = records[recordNum].genre;
    recordFormat.textContent = records[recordNum].format;
    recordYear.textContent = records[recordNum].year;
    recordPrice.textContent = records[recordNum].price;
    let code = 65;
    for(let i = 0; i < records[recordNum].tracklist.length; i++){
        const side = document.createElement('p');
        side.classList.add('side');
        side.textContent = 'Side ' + String.fromCharCode(code);
        tracklistContainer.append(side);
        records[recordNum].tracklist[i].forEach((item, index) => {
            const song = document.createElement('p');
            song.classList.add('tracklist__item');
            song.textContent = String.fromCharCode(code) + ++index + '. ' + item;
            tracklistContainer.append(song);
        });
        code++;
    }
    interestingRecords(records, records[recordNum].name, records[recordNum].genre)
}

basketBtn.addEventListener('click', e => {
    let basketItem =  localStorage.getItem('record');
    localStorage.setItem('basketItem', basketItem);
})

let interestingArr = [];

function interestingRecords(records, name, genre){
    let genres = genre.split(',').map(item => item.trim());
    for(let i = 0; i < records.length; i++){
        for(let j = 0; j < genres.length; j++){
            if(records[i].genre.includes(genres[j]) && records[i].name !== name){
                interestingArr.push(records[i]);
                break;
            }
        }
    }
    if(interestingArr.length === 0){
        for(let i = 0; i < 10; i++){
            let num = Math.floor(Math.random() * (records.length - 0) + 0);
            if(interestingArr.includes(records[num]) || records[num].name === name){
                i--;
            }
            else{
                interestingArr.push(records[num]);
            }
        }
    }
    if(interestingArr.length <= 4){
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }
    for(let i = 0; i < interestingArr.length; i++){
        const recordBlock = document.createElement('div');
        recordBlock.classList.add('interesting__record');
        interestingContainer.append(recordBlock);
        const image = new Image();
        image.src = interestingArr[i].img;
        recordBlock.append(image);
        const interRecordTitle = document.createElement('p');
        interRecordTitle.classList.add('record__title');
        interRecordTitle.textContent = interestingArr[i].name;
        recordBlock.append(interRecordTitle);
        const interRecordPrice = document.createElement('p');
        interRecordPrice.classList.add('record__price');
        interRecordPrice.textContent = interestingArr[i].price;
        recordBlock.append(interRecordPrice);
        recordBlock.addEventListener('click', (e) => {
            let recordIndex;
            records.forEach((item, index) => {
                if(item.name === interestingArr[i].name){
                    recordIndex = index;
                }
            });
            localStorage.setItem('record', recordIndex);
            window.location = './record.html';
        });
    }
}

const width = 300;
let index = 0;
leftBtn.addEventListener('click', e => {
    index--;
    
    if(index < 0){
        index = interestingArr.length - 4;
    }
    moveSlider();
});
rightBtn.addEventListener('click', e => {
    index++;
    if(index === interestingArr.length - 3){
        index = 0;
    }
    moveSlider();
})

function moveSlider(){
    interestingContainer.style.transform = `translateX(-${width*index}px)`;
}