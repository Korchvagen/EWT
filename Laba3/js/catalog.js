const recordsContainer = document.querySelector('.records__block');
const search = document.querySelector('.input-search');
const genreSortBtn = document.querySelector('.genre-btn');
const genreList = document.querySelector('.genre__list');
const genreArrow = document.querySelector('.genre-arrow');
const genreSpan = document.querySelector('.ganre-span');
const cleanGenreBtn = document.querySelector('.clean-genre');

const priceSortBtn = document.querySelector('.price-btn');
const priceInputBlock = document.querySelector('.input-price');
const priceArrow = document.querySelector('.price-arrow');
const priceSpan = document.querySelector('.price-span');
const lowerPrice = document.querySelector('.lower-price');
const upperPrice = document.querySelector('.upper-price');
const cleanPriceBtn = document.querySelector('.clean-price');

const yearSortBtn = document.querySelector('.year-btn');
const yearList = document.querySelector('.year__list');
const yearArrow = document.querySelector('.year-arrow');
const yearSpan = document.querySelector('.year-span');
const cleanYearBtn = document.querySelector('.clean-year');

const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const basketBtn = document.querySelector('.basket-btn');
const indicator = document.querySelector('.indicator');
const basketContainer = document.querySelector('.basket-items');
const closeBasketBtn = document.querySelector('.close-basket');
let array;
let basketItems = [];

async function displayRecords() {
    const url = 'data.json';
    const res = await fetch(url);
    const records = await res.json();
    array = records;
    search.value = '';
    for (let i = 0; i < array.length; i++) {
        const recordBlock = document.createElement('div');
        recordBlock.classList.add('record__block');
        recordsContainer.append(recordBlock);
        const image = new Image();
        image.src = array[i].img;
        recordBlock.append(image);
        const recordName = document.createElement('p');
        recordName.classList.add('record__name');
        recordName.textContent = array[i].name;
        recordBlock.append(recordName);
        const recordPrice = document.createElement('p');
        recordPrice.classList.add('record__price');
        recordPrice.textContent = array[i].price;
        recordBlock.append(recordPrice);
        recordBlock.addEventListener('click', (e) => {
            localStorage.setItem('record', i);
            window.location = './record.html';
        });
    }
    showGenreList();
    showYearList();
    checkLocalStorage();
}

search.oninput = function () {
    let value = this.value.trim().toLowerCase();
    const records = document.querySelectorAll('.record__name');
    if (value !== '') {
        records.forEach(item => {
            let string = item.textContent.toLowerCase();
            if (string.search(value) == -1) {
                item.closest('div').classList.add('hide');
            }
            else {
                item.closest('div').classList.remove('hide');
            }
        });
    }
    else {
        records.forEach(item => {
            item.closest('div').classList.remove('hide');
        });
    }
}

genreSortBtn.addEventListener('click', e => {
    genreArrow.classList.toggle('active');
    genreList.classList.toggle('active');
});

function showGenreList() {
    let genres = [];
    for (let i = 0; i < array.length; i++) {
        let recordGenres = array[i].genre.split(',').map(item => item.trim());
        for (let j = 0; j < recordGenres.length; j++) {
            if (genres.includes(recordGenres[j])) {
                continue;
            }
            else {
                genres.push(recordGenres[j]);
            }
        }
    }
    genres = genres.sort();
    genres.forEach(item => {
        const genreListItem = document.createElement('li');
        genreListItem.classList.add('genre__list__item');
        const genreItem = document.createElement('p');
        genreItem.classList.add('genre__item');
        genreItem.textContent = item;
        genreListItem.append(genreItem);
        genreList.append(genreListItem);
        genreListItem.addEventListener('click', e => {
            genreList.classList.remove('active');
            genreArrow.classList.remove('active');
            genreSpan.textContent = item;
            showChosenGenre(item);
        });
    });
}

function showChosenGenre(chosenGenre) {
    cleanGenreBtn.classList.add('active');
    const records = document.querySelectorAll('.record__block');
    records.forEach(item => {
        item.classList.add('hide-by-genre');
    });
    array.forEach((item, index) => {
        if (item.genre.includes(chosenGenre)) {
            const recordBlock = document.createElement('div');
            recordBlock.classList.add('record__block');
            recordsContainer.append(recordBlock);
            const image = new Image();
            image.src = item.img;
            recordBlock.append(image);
            const recordName = document.createElement('p');
            recordName.classList.add('record__name');
            recordName.textContent = item.name;
            recordBlock.append(recordName);
            const recordPrice = document.createElement('p');
            recordPrice.classList.add('record__price');
            recordPrice.textContent = item.price;
            recordBlock.append(recordPrice);
            recordBlock.addEventListener('click', (e) => {
                localStorage.setItem('record', index);
                window.location = './record.html';
            });
        }
    });
}

cleanGenreBtn.addEventListener('click', e => {
    const records = document.querySelectorAll('.record__block');
    records.forEach(item => {
        item.classList.remove('hide-by-genre');
    });
    genreSpan.textContent = 'Жанр';
    cleanGenreBtn.classList.remove('active');
})

priceSortBtn.addEventListener('click', e => {
    priceArrow.classList.toggle('active');
    priceInputBlock.classList.toggle('active');
});

lowerPrice.oninput = function(){
    cleanPriceBtn.classList.add('active');
    let value = parseInt(this.value.trim());
    const records = document.querySelectorAll('.record__price');
    if (!isNaN(value)) {
        records.forEach(item => {
            let price = parseInt(item.textContent.replace(/[^\d]/g, ''));
            if (price >= value) {
                item.closest('div').classList.remove('hide-by-lower-price');
            }
            else {
                item.closest('div').classList.add('hide-by-lower-price');
            }
        });
    }
    else {
        records.forEach(item => {
            item.closest('div').classList.remove('hide-by-lower-price');
        });
    }
}

upperPrice.oninput = function(){
    cleanPriceBtn.classList.add('active');
    let value = parseInt(this.value.trim());
    const records = document.querySelectorAll('.record__price');
    if (!isNaN(value)) {
        records.forEach(item => {
            let price = parseInt(item.textContent.replace(/[^\d]/g, ''));
            if (value >= price) {
                item.closest('div').classList.remove('hide-by-upper-price');
            }
            else {
                item.closest('div').classList.add('hide-by-upper-price');
            }
        });
    }
    else {
        records.forEach(item => {
            item.closest('div').classList.remove('hide-by-upper-price');
        });
    }
}

cleanPriceBtn.addEventListener('click', e => {
    const records = document.querySelectorAll('.record__block');
    records.forEach(item => {
        item.classList.remove('hide-by-lower-price');
        item.classList.remove('hide-by-upper-price');
    });
    lowerPrice.value = '';
    upperPrice.value = '';
    priceInputBlock.classList.remove('active');
    cleanPriceBtn.classList.remove('active');
})

yearSortBtn.addEventListener('click', e => {
    yearArrow.classList.toggle('active');
    yearList.classList.toggle('active');
});

function showYearList(){
    let years = array.map(item => {
        return item.year;
    });
    years = years.filter((item, index) => years.indexOf(item) === index);
    years = years.sort((a, b) => b - a);
    years.forEach(item => {
        const yearListItem = document.createElement('li');
        yearListItem.classList.add('year__list__item');
        const yearItem = document.createElement('p');
        yearItem.classList.add('year__item');
        yearItem.textContent = item;
        yearListItem.append(yearItem);
        yearList.append(yearListItem);
        yearListItem.addEventListener('click', e => {
            yearList.classList.remove('active');
            yearArrow.classList.remove('active');
            yearSpan.textContent = item;
            showChosenYear(item);
        });
    });
}

function showChosenYear(chosenYear) {
    cleanYearBtn.classList.add('active');
    const records = document.querySelectorAll('.record__block');
    records.forEach(item => {
        item.classList.add('hide-by-year');
    });
    array.forEach((item, index) => {
        if (item.year === chosenYear) {
            const recordBlock = document.createElement('div');
            recordBlock.classList.add('record__block');
            recordsContainer.append(recordBlock);
            const image = new Image();
            image.src = item.img;
            recordBlock.append(image);
            const recordName = document.createElement('p');
            recordName.classList.add('record__name');
            recordName.textContent = item.name;
            recordBlock.append(recordName);
            const recordPrice = document.createElement('p');
            recordPrice.classList.add('record__price');
            recordPrice.textContent = item.price;
            recordBlock.append(recordPrice);
            recordBlock.addEventListener('click', (e) => {
                localStorage.setItem('record', index);
                window.location = './record.html';
            });
        }
    });
}

cleanYearBtn.addEventListener('click', e => {
    const records = document.querySelectorAll('.record__block');
    records.forEach(item => {
        item.classList.remove('hide-by-year');
    });
    yearSpan.textContent = 'Год выхода альбома';
    cleanYearBtn.classList.remove('active');
})

function checkLocalStorage(){
    let basketItem = localStorage.getItem('basketItem');
    if(basketItem != null){
        basketItems.push(array[basketItem]);
    }
    if(basketItems.length !== 0){
        indicator.classList.add('active');
    }
}

basketBtn.addEventListener('click', e => {
    body.classList.add('active');
    overlay.classList.add('active');
    showBasketItems();
})

function showBasketItems(){
    let basketItem = localStorage.getItem('basketItem');
    if(basketItem != null){
        const basketItemBlock = document.createElement('div');
        basketItemBlock.classList.add('basket-item');
        const basketItemImage = document.createElement('div');
        basketItemImage.classList.add('basket-item-image');
        basketItemImage.style.backgroundImage = `url(${array[basketItem].img})`;
        basketItemBlock.append(basketItemImage);
        const basketItemName = document.createElement('p');
        basketItemName.classList.add('basket-item-name');
        basketItemName.textContent = array[basketItem].name;
        basketItemBlock.append(basketItemName);
        basketContainer.append(basketItemBlock);
        const basketControls = document.createElement('div');
        basketControls.classList.add('basket-controls');
        const minusBtn = document.createElement('div');
        minusBtn.classList.add('minus-btn');
        const itemCounter = document.createElement('p');
        itemCounter.classList.add('item-counter');
        itemCounter.textContent = 1;
        const plusBtn = document.createElement('div');
        plusBtn.classList.add('plus-btn');
        basketControls.append(minusBtn, itemCounter, plusBtn);
        basketItemBlock.append(basketControls);
        const basketItemPrice = document.createElement('p');
        basketItemPrice.classList.add('basket-item-price');
        basketItemPrice.textContent = array[basketItem].price;
        basketItemBlock.append(basketItemPrice);
        const deleteItemBtn = document.createElement('div');
        deleteItemBtn.classList.add('delete-item-btn');
        basketItemBlock.append(deleteItemBtn);
    }
    // for(let i = 0; i < basketItems.length; i++){
        
    // }
}

closeBasketBtn.addEventListener('click', e => {
    body.classList.remove('active');
    overlay.classList.remove('active');
    // removeBasketItems();
})

overlay.addEventListener('click', e => {
    body.classList.remove('active');
    overlay.classList.remove('active');
})

// function removeBasketItems(){
//     while (basketContainer.firstChild) {
//         basketContainer.removeChild(basketContainer.firstChild);
//       }
// }