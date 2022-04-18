const openCatalog = document.querySelector('.check_next__block');
const recordCards = document.querySelector('.record__cards')

openCatalog.addEventListener('click', (e) => {
    window.location = './catalog.html';
});

async function appendRecords() {
    const url = 'data.json';
    const res = await fetch(url);
    const records = await res.json();
    for (let i = 0; i < 4; i++) {
        const recordBlock = document.createElement('div');
        recordBlock.classList.add('cards__item');
        recordCards.append(recordBlock);
        const image = new Image();
        image.src = records[i].img;
        recordBlock.append(image);
        const recordName = document.createElement('p');
        recordName.classList.add('card__title');
        recordName.textContent = records[i].name;
        recordBlock.append(recordName);
        const recordPrice = document.createElement('p');
        recordPrice.classList.add('card__price');
        recordPrice.textContent = records[i].price;
        recordBlock.append(recordPrice);
        recordBlock.addEventListener('click', (e) => {
            localStorage.setItem('record', i);
            window.location = './record.html';
        });
    }
}