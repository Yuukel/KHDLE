function disableEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
}
document.addEventListener('keydown', disableEnterKey);

import characters from './data/characters.json' with { type : 'json' };

let bestScore = localStorage.getItem('bestScore') || 0;
if(bestScore == 0){
    localStorage.setItem('bestScore', 0);
    bestScore = 0;
}
document.getElementById('current-highscore').textContent = "Meilleur score : " + bestScore;

const livesDiv =  document.getElementById("lives");

const fullLife = document.createElement("i")
fullLife.classList.add("fa-solid","fa-heart");

const emptyLife = document.createElement("i");
emptyLife.classList.add("fa-regular","fa-heart");

let lives = 7;
function setLives(){
    livesDiv.innerHTML = "";
    for(let i = 0 ; i < lives ; i++){
        livesDiv.appendChild(fullLife.cloneNode(true));
    }
    for(let j = 0 ; j < 7-lives ; j++){
        livesDiv.appendChild(emptyLife.cloneNode(true));
    }
}

let currentScore = 0;
let randomNumber;
function startGame(){
    setLives();
    randomNumber = Math.floor(Math.random()*characters.length);
    while(characters[randomNumber].nom == "") randomNumber =  Math.floor(Math.random()*characters.length);
    console.log(characters[randomNumber]);
}

const guessBtn = document.getElementById("guessButton");
const guessField = document.getElementById("guessField");
const table = document.querySelector("tbody");
const summary = document.querySelector(".summary");
function checkGuess(event){
    event.preventDefault();
    if(guessField.value == "") return;
    let checkableGuess = false;
    let index;
    for(let i = 0 ; i < characters.length ; i++){
        if(guessField.value.toLowerCase() == characters[i].nom.toLowerCase()){
            if([...table.rows].every(row => row.cells[0].id.toLowerCase() !== guessField.value.toLowerCase())){
                checkableGuess = true;
                index = i;
            }
        }
    }

    if(checkableGuess == true){
        if(characters[index] == characters[randomNumber]){
            winRound();
        } else{
            lives--;
        }
        let tr = document.createElement("tr");
        let nom = document.createElement("td");
        let genre = document.createElement("td");
        let type = document.createElement("td");
        let role = document.createElement("td");
        let arme = document.createElement("td");
        let mondeOrigine = document.createElement("td");
        let premiereApparition = document.createElement("td");
        let licence = document.createElement("td");
        
        nom.classList.add("cube","character");
        var img = document.createElement("img");
        img.src = './data/img/' + characters[index].nom.toLowerCase().split(" ").join("") + '.png';
        img.alt = characters[index].nom;
        nom.appendChild(img);
        nom.id = characters[index].nom;

        genre.classList.add("cube");
        if(characters[index].genre == characters[randomNumber].genre){
            genre.classList.add("correct");
            summary.cells[1].textContent = characters[index].genre;
            summary.cells[1].classList.remove("empty");
            summary.cells[1].classList.add("correct");
        } else genre.classList.add("wrong");
        genre.textContent = characters[index].genre;

        let isSame;

        type.classList.add("cube");
        isSame = true;
        if(characters[index].type.length == characters[randomNumber].type.length){
            for(let i = 0 ; i < characters[index].type.length ; i++){
                if(characters[index].type[i] != characters[randomNumber].type[i]) isSame = false;
            }
            if(isSame){
                type.classList.add("correct");
                summary.cells[2].textContent = characters[index].type;
                summary.cells[2].classList.remove("empty");
                summary.cells[2].classList.add("correct");
            } 
        }
        if(isSame == false || characters[index].type.length != characters[randomNumber].type.length){
            let almost = false;
            for(let i = 0 ; i < characters[index].type.length ; i++){
                if(characters[randomNumber].type.includes(characters[index].type[i])) almost = true;
            }
            if(almost) type.classList.add("almost");
            else type.classList.add("wrong");
        }
        type.textContent = characters[index].type;

        role.classList.add("cube");
        isSame = true;
        if(characters[index].role.length == characters[randomNumber].role.length){
            for(let i = 0 ; i < characters[index].role.length ; i++){
                if(characters[index].role[i] != characters[randomNumber].role[i]) isSame = false;
            }
            if(isSame){
                role.classList.add("correct");
                summary.cells[3].textContent = characters[index].role;
                summary.cells[3].classList.remove("empty");
                summary.cells[3].classList.add("correct");
            }
        }
        if(isSame == false || characters[index].role.length != characters[randomNumber].role.length){
            let almost = false;
            for(let i = 0 ; i < characters[index].role.length ; i++){
                if(characters[randomNumber].role.includes(characters[index].role[i])) almost = true;
            }
            if(almost) role.classList.add("almost");
            else role.classList.add("wrong");
        }
        role.textContent = characters[index].role;

        arme.classList.add("cube");
        isSame = true;
        if(characters[index].arme.length == characters[randomNumber].arme.length){
            for(let i = 0 ; i < characters[index].arme.length ; i++){
                if(characters[index].arme[i] != characters[randomNumber].arme[i]) isSame = false;
            }
            if(isSame){
                arme.classList.add("correct");
                summary.cells[4].textContent = characters[index].arme;
                summary.cells[4].classList.remove("empty");
                summary.cells[4].classList.add("correct");
            }
        }
        if(isSame == false || characters[index].arme.length != characters[randomNumber].arme.length){
            let almost = false;
            for(let i = 0 ; i < characters[index].arme.length ; i++){
                if(characters[randomNumber].arme.includes(characters[index].arme[i])) almost = true;
            }
            if(almost) arme.classList.add("almost");
            else arme.classList.add("wrong");
        }
        arme.textContent = characters[index].arme;

        mondeOrigine.classList.add("cube");
        if(characters[index].mondeOrigine == characters[randomNumber].mondeOrigine){
            mondeOrigine.classList.add("correct");
            summary.cells[5].textContent = characters[index].mondeOrigine;
            summary.cells[5].classList.remove("empty");
            summary.cells[5].classList.add("correct");
        } else mondeOrigine.classList.add("wrong");
        mondeOrigine.textContent = characters[index].mondeOrigine;

        premiereApparition.classList.add("cube");
        if(characters[index].premiereApparition == characters[randomNumber].premiereApparition){
            premiereApparition.classList.add("correct");
            summary.cells[6].textContent = characters[index].premiereApparition;
            summary.cells[6].classList.remove("empty");
            summary.cells[6].classList.add("correct");
        } else premiereApparition.classList.add("wrong");
        premiereApparition.textContent = characters[index].premiereApparition;

        licence.classList.add("cube");
        if(characters[index].licence == characters[randomNumber].licence){
            licence.classList.add("correct");
            summary.cells[7].textContent = characters[index].licence;
            summary.cells[7].classList.remove("empty");
            summary.cells[7].classList.add("correct");
        } else licence.classList.add("wrong");
        licence.textContent = characters[index].licence;
        
        var elements = [nom, genre, type, role, arme, mondeOrigine, premiereApparition, licence];

        table.insertBefore(tr, table.firstChild);
        addElements(tr, elements);

        setLives();
        guessField.value = "";

        if(lives == 0) gameOver();
    }
}

async function addElements(tr, elements){
    for (let i = 0; i < elements.length; i++) {
        tr.appendChild(elements[i]);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Création liste pour la zone de recherche
const list = document.getElementById('list');
guessField.addEventListener('input', () => {
    const search = guessField.value.toLowerCase();
    list.innerHTML = "";
    if(search){
        const charList = characters.filter(character => character.nom.toLowerCase().startsWith(search));
        let addList = false;
        charList.forEach(character => {
            addList = [...table.rows].every(row => row.cells[0].id.toLowerCase() !== character.nom.toLowerCase());
            if(addList){
                const charItem = document.createElement('div');
                charItem.classList.add('char-item');
                charItem.textContent = character.nom;
                charItem.addEventListener('click', () => {
                    guessField.value = character.nom;
                    list.innerHTML = "";
                    list.style.display = 'none';
                });
                list.appendChild(charItem);
            }
        });
        list.style.display = 'block';
    } else{
        list.style.display = 'none';
    }
})

// Retirer la liste si on clique autre part
document.addEventListener('click', (event) => {
    if(event.target !== guessField){
        list.style.display = 'none';
    }
})

function winRound(){
    guessField.disabled = true;
    guessBtn.disabled = true;
    document.querySelector('.end-infos').style.display = 'flex';
    document.getElementById('end-text').textContent = "GG, le perso à deviner était bien : " + characters[randomNumber].nom;
    document.getElementById('endButton').textContent = "Manche suivante";
    document.getElementById('endButton').addEventListener('click', nextRound);
    currentScore++;
    document.getElementById('current-score').textContent = "Score actuel : " + currentScore;
    if(currentScore > bestScore){
        bestScore = currentScore;
        document.getElementById('current-highscore').textContent = "Meilleur score : " + bestScore;
        localStorage.setItem('bestScore', bestScore);
    }
}

function gameOver(){
    guessField.disabled = true;
    guessBtn.disabled = true;
    document.querySelector('.end-infos').style.display = 'flex';
    document.getElementById('end-text').textContent = "Dommage... le perso à deviner était : " + characters[randomNumber].nom;
    document.getElementById('endButton').textContent = "Recommencer la partie";
    document.getElementById('endButton').addEventListener('click', newGame);
}

function nextRound(){
    // Faire la fonction pour démarrer le round d'après
    guessField.disabled = false;
    guessBtn.disabled = false;
    document.querySelector('.end-infos').style.display = 'none';
    lives = 7;
    setLives();
    randomNumber = Math.floor(Math.random()*characters.length);
    table.innerHTML = "";

    for(let i = 0 ; i < 8 ; i++){
        summary.cells[i].textContent = "";
        summary.cells[i].classList.remove("correct");
        summary.cells[i].classList.add("empty");
    }
}

function newGame(){
    // Faire la fonction pour redémarrer le jeu
    nextRound();
    currentScore = 0;
    document.getElementById('current-score').textContent = "Score actuel : " + currentScore;
}

guessBtn.addEventListener('click', checkGuess);

document.getElementById('showSummary').addEventListener('change', () => {
    if(document.getElementById('showSummary').checked == true){
        document.querySelector(".summary").style.display = 'revert';
    } else{
        document.querySelector(".summary").style.display = 'none';
    }
});

startGame();