function disableEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
}
document.addEventListener('keydown', disableEnterKey);

import characters from './characters.json' with { type : 'json' };

let bestScore = localStorage.getItem('bestScore') || 0;
if(bestScore == 0){
    localStorage.setItem('bestScore', 0);
    bestScore = 0;
}
document.getElementById('current-highscore').textContent = "Meilleure score : " + bestScore;

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
    // while(characters[randomNumber].nom == "") randomNumber =  Math.floor(Math.random()*characters.length);
    // console.log(characters[randomNumber]);
}

const guessBtn = document.getElementById("guessButton");
const guessField = document.getElementById("guessField");
const table = document.querySelector("tbody");
function checkGuess(event){
    event.preventDefault();
    if(guessField.value == "") return;
    let bool = false;
    let index;
    for(let i = 0 ; i < characters.length ; i++){
        if(guessField.value.toLowerCase() == characters[i].nom.toLowerCase()){
            bool = true;
            index = i;
        }
    }

    if(bool == true){
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
        let mondeOrigine = document.createElement("td");
        let premiereApparition = document.createElement("td");
        let licence = document.createElement("td");
        
        nom.classList.add("cube");
        if(characters[index].nom == characters[randomNumber].nom) nom.classList.add("correct");
        else nom.classList.add("wrong");
        nom.textContent = characters[index].nom;

        genre.classList.add("cube");
        if(characters[index].genre == characters[randomNumber].genre) genre.classList.add("correct");
        else genre.classList.add("wrong");
        genre.textContent = characters[index].genre;

        let isSame;

        type.classList.add("cube");
        isSame = true;
        if(characters[index].type.length == characters[randomNumber].type.length){
            for(let i = 0 ; i < characters[index].type.length ; i++){
                if(characters[index].type[i] != characters[randomNumber].type[i]) isSame = false;
            }
            if(isSame) type.classList.add("correct");
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
            if(isSame) role.classList.add("correct");
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

        mondeOrigine.classList.add("cube");
        if(characters[index].mondeOrigine == characters[randomNumber].mondeOrigine) mondeOrigine.classList.add("correct");
        else mondeOrigine.classList.add("wrong");
        mondeOrigine.textContent = characters[index].mondeOrigine;

        premiereApparition.classList.add("cube");
        if(characters[index].premiereApparition == characters[randomNumber].premiereApparition) premiereApparition.classList.add("correct");
        else premiereApparition.classList.add("wrong");
        premiereApparition.textContent = characters[index].premiereApparition;

        licence.classList.add("cube");
        if(characters[index].licence == characters[randomNumber].licence) licence.classList.add("correct");
        else licence.classList.add("wrong");
        licence.textContent = characters[index].licence;
        
        var elements = [nom, genre, type, role, mondeOrigine, premiereApparition, licence];

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

const list = document.getElementById('list');
guessField.addEventListener('input', () => {
    const search = guessField.value.toLowerCase();
    list.innerHTML = "";
    if(search){
        const charList = characters.filter(character => character.nom.toLowerCase().startsWith(search));
        charList.forEach(character => {
            const charItem = document.createElement('div');
            charItem.classList.add('char-item');
            charItem.textContent = character.nom;
            charItem.addEventListener('click', () => {
                guessField.value = character.nom;
                list.innerHTML = "";
                list.style.display = 'none';
            });
            list.appendChild(charItem);
        });
        list.style.display = 'block';
    } else{
        list.style.display = 'none';
    }
})

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
        document.getElementById('current-highscore').textContent = "Meilleure score : " + bestScore;
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
}

function newGame(){
    // Faire la fonction pour redémarrer le jeu
    window.location.reload(); // recharger la page pour pas se faire chier pour le moment issou
}

guessBtn.addEventListener('click', checkGuess);

startGame();