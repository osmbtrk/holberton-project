let clickedCard = null;
let preventClick = false;
let combosFound = 0;

const imgs = [
    'html',
    'css',
    'holberton',
    'php',
    'python',
    'c',
    'mysql',
    'js',
]
const cards = [...document.querySelectorAll('.card')];
for (let img of imgs){
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${img}`
    cardA.setAttribute('data-img', img);

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${img}`
    cardB.setAttribute('data-img', img);
}

function onCardClicked(e) {
    const target = e.currentTarget;
    if(
        preventClick ||
        target === clickedCard ||
        target.className.includes('done')
    ){
        return;
    }
    target.className = target.className
        .replace('img-hidden','')
        .trim();
    target.className += ' done';

    if(!clickedCard){
        clickedCard= target;
    }else if(clickedCard){
        if(
            clickedCard.getAttribute('data-img') !==
            target.getAttribute('data-img')
        ){
            preventClick = true;
            setTimeout(() => {
                clickedCard.className =
                 clickedCard.className.replace('done','').trim() +
                  ' img-hidden';
                target.className =
                 target.className.replace('done','').trim() +
                  ' img-hidden';
                clickedCard = null;
                preventClick = false;
            },500);
        }else{
            combosFound++;
            clickedCard = null;
            if(combosFound === 8){
                var thumbnailElement = document.getElementById("win");
                thumbnailElement.className = "modal-overlay";
            }
        }
    }
}