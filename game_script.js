function disableEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
}
document.addEventListener('keydown', disableEnterKey);

var game = document.querySelector('.game');
var start = document.querySelector('.start-game');

import charactersList from './data/json/characters.json' with { type : 'json' };

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
let characters;
function startGame(){
    game.style.display = "flex";
    start.style.display = "none";

    setLives();
    characters = filterCharacters();
    randomNumber = Math.floor(Math.random()*characters.length);
    while(characters[randomNumber].nom == "") randomNumber =  Math.floor(Math.random()*characters.length);
    // console.log(characters[randomNumber]);
}

let minYear = 1928;
let maxYear = 2005;

let minLetter = 'A';
let maxLetter = 'Z';

const guessBtn = document.getElementById("guess-btn");
const guessField = document.getElementById("guess-field");
const table = document.querySelector("tbody");
const summary = document.querySelector(".summary");
function checkGuess(event){
    event.preventDefault();
    if(guessField.value == "") return;
    let checkableGuess = false;
    let index;
    for (let i = 0; i < characters.length; i++) {
        let userInput = guessField.value.trim().toLowerCase().replace(/\s+/g, ' ');
        let characterNom = characters[i].nom.trim().toLowerCase().replace(/\s+/g, ' ');
        let characterAlias = characters[i].alias.trim().toLowerCase().replace(/\s+/g, ' ');

        if (userInput === characterNom || userInput === characterAlias) {
            if ([...table.rows].every(row => row.cells[0].id.trim().toLowerCase().replace(/\s+/g, ' ') !== characterNom)) {
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
        let ordreLex = document.createElement("td");
        let genre = document.createElement("td");
        let type = document.createElement("td");
        let role = document.createElement("td");
        let arme = document.createElement("td");
        let mondeOrigine = document.createElement("td");
        let premiereApparition = document.createElement("td");
        let anneeDeParution = document.createElement("td");
        let licence = document.createElement("td");

        nom.classList.add("cube","character");
        var img = document.createElement("img");
        img.src = './data/img/characters/' + characters[index].nom.toLowerCase().split(" ").join("") + '.png';
        img.alt = characters[index].nom;

        var name = document.createElement('div');
        if(guessField.value.toLowerCase() == characters[index].nom.toLowerCase())
            name.textContent = characters[index].nom;
        else
            name.textContent = characters[index].alias;
        name.classList.add('char-name');

        img.addEventListener('mouseover', () => {
            name.style.display = 'flex';
        });
        img.addEventListener('mouseout', () => {
            name.style.display = 'none';
        });

        name.addEventListener('mouseover', () => {
            name.style.display = 'flex';
        });
        name.addEventListener('mouseout', () => {
            name.style.display = 'none';
        });

        nom.appendChild(img);
        nom.appendChild(name);
        nom.id = characters[index].nom;

        // Année de partution
        ordreLex.classList.add("cube");
        var arrow;
        var letterText;
        if(characters[index].nom[0] < characters[randomNumber].nom[0]){
            ordreLex.classList.add("arrow");

            arrow = document.createElement("i");
            arrow.classList.add("fa-solid","fa-arrow-up");
            ordreLex.appendChild(arrow);

            letterText = document.createElement("p");
            letterText.textContent = characters[index].nom[0];
            ordreLex.appendChild(letterText);

            if(characters[index].nom[0] > minLetter)
                minLetter = characters[index].nom[0];
            summary.cells[1].textContent = minLetter + '-' + maxLetter;
        }
        else if(characters[index].nom[0] > characters[randomNumber].nom[0]){
            ordreLex.classList.add("arrow");

            arrow = document.createElement("i");
            arrow.classList.add("fa-solid","fa-arrow-down");
            ordreLex.appendChild(arrow);

            letterText = document.createElement("p");
            letterText.textContent = characters[index].nom[0];
            ordreLex.appendChild(letterText);

            if(characters[index].nom[0] < maxLetter)
                maxLetter = characters[index].nom[0];
            summary.cells[1].textContent = minLetter + '-' + maxLetter;
        }
        else{
            ordreLex.classList.add("correct");
            ordreLex.textContent = characters[index].nom[0];
            summary.cells[1].textContent = characters[index].nom[0];
            summary.cells[1].classList.remove("empty");
            summary.cells[1].classList.add("correct");
        }

        genre.classList.add("cube");
        if(characters[index].genre == characters[randomNumber].genre){
            genre.classList.add("correct");
            summary.cells[2].textContent = characters[index].genre;
            summary.cells[2].classList.remove("empty");
            summary.cells[2].classList.add("correct");
        } else genre.classList.add("wrong");
        genre.textContent = characters[index].genre;

        let isSame;

        type.classList.add("cube");
        isSame = true;
        if(characters[index].type.length == characters[randomNumber].type.length){
            const sortedUserTypes = [...characters[index].type].sort();
            const sortedRandomTypes = [...characters[randomNumber].type].sort();
            for(let i = 0 ; i < characters[index].type.length ; i++){
                if(sortedUserTypes[i] != sortedRandomTypes[i]) isSame = false;
            }
            if(isSame){
                type.classList.add("correct");
                summary.cells[3].textContent = sortedUserTypes;
                summary.cells[3].classList.remove("empty");
                summary.cells[3].classList.add("correct");
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
        type.textContent = [...characters[index].type].sort();

        role.classList.add("cube");
        isSame = true;
        if(characters[index].role.length == characters[randomNumber].role.length){
            const sortedUserRoles = [...characters[index].role].sort();
            const sortedRandomRoles = [...characters[randomNumber].role].sort();
            for(let i = 0 ; i < characters[index].role.length ; i++){
                if(sortedUserRoles[i] != sortedRandomRoles[i]) isSame = false;
            }
            if(isSame){
                role.classList.add("correct");
                summary.cells[4].textContent = sortedUserRoles;
                summary.cells[4].classList.remove("empty");
                summary.cells[4].classList.add("correct");
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
        role.textContent = [...characters[index].role].sort();;

        arme.classList.add("cube");
        isSame = true;
        if(characters[index].arme.length == characters[randomNumber].arme.length){
        const sortedUserArme = [...characters[index].arme].sort();
            const sortedRandomArme = [...characters[randomNumber].arme].sort();
            for(let i = 0 ; i < characters[index].arme.length ; i++){
                if(sortedUserArme[i] != sortedRandomArme[i]) isSame = false;
            }
            if(isSame){
                arme.classList.add("correct");
                summary.cells[5].textContent = sortedUserArme;
                summary.cells[5].classList.remove("empty");
                summary.cells[5].classList.add("correct");
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
        arme.textContent = [...characters[index].arme].sort();

        mondeOrigine.classList.add("cube");
        if(characters[index].mondeOrigine == characters[randomNumber].mondeOrigine){
            mondeOrigine.classList.add("correct");
            summary.cells[6].textContent = characters[index].mondeOrigine;
            summary.cells[6].classList.remove("empty");
            summary.cells[6].classList.add("correct");
        } else mondeOrigine.classList.add("wrong");
        mondeOrigine.textContent = characters[index].mondeOrigine;

        premiereApparition.classList.add("cube");
        if(characters[index].premiereApparition == characters[randomNumber].premiereApparition){
            premiereApparition.classList.add("correct");
            summary.cells[7].textContent = characters[index].premiereApparition;
            summary.cells[7].classList.remove("empty");
            summary.cells[7].classList.add("correct");
        } else premiereApparition.classList.add("wrong");
        premiereApparition.textContent = characters[index].premiereApparition;

        // Année de partution
        anneeDeParution.classList.add("cube");
        var arrow;
        var yearText;
        if(characters[index].anneeDeParution < characters[randomNumber].anneeDeParution){
            anneeDeParution.classList.add("arrow");

            arrow = document.createElement("i");
            arrow.classList.add("fa-solid","fa-arrow-up");
            anneeDeParution.appendChild(arrow);

            yearText = document.createElement("p");
            yearText.textContent = characters[index].anneeDeParution;
            anneeDeParution.appendChild(yearText);

            if(characters[index].anneeDeParution > minYear)
                minYear = characters[index].anneeDeParution;
            summary.cells[8].textContent = minYear + '-' + maxYear;
        }
        else if(characters[index].anneeDeParution > characters[randomNumber].anneeDeParution){
            anneeDeParution.classList.add("arrow");

            arrow = document.createElement("i");
            arrow.classList.add("fa-solid","fa-arrow-down");
            anneeDeParution.appendChild(arrow);

            yearText = document.createElement("p");
            yearText.textContent = characters[index].anneeDeParution;
            anneeDeParution.appendChild(yearText);

            if(characters[index].anneeDeParution < maxYear)
                maxYear = characters[index].anneeDeParution;
            summary.cells[8].textContent = minYear + '-' + maxYear;
        }
        else{
            anneeDeParution.classList.add("correct");
            anneeDeParution.textContent = characters[index].anneeDeParution;
            summary.cells[8].textContent = characters[index].anneeDeParution;
            summary.cells[8].classList.remove("empty");
            summary.cells[8].classList.add("correct");
        }

        licence.classList.add("cube");
        if(characters[index].licence == characters[randomNumber].licence){
            licence.classList.add("correct");
            summary.cells[9].textContent = characters[index].licence;
            summary.cells[9].classList.remove("empty");
            summary.cells[9].classList.add("correct");
        } else licence.classList.add("wrong");
        licence.textContent = characters[index].licence;

        var elements = [nom, ordreLex, genre, type, role, arme, mondeOrigine, premiereApparition, anneeDeParution, licence];

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
    const search = normalizeString(guessField.value);

    list.innerHTML = "";

    if (search) {
        let charList = characters.filter(character => {
            return normalizeString(character.nom).startsWith(search);
        });

        charList = charList.concat(characters.filter(character => {
            const matchesSearch = normalizeString(character.alias).startsWith(search);

            const notInCharList = !charList.some(existingChar => 
                normalizeString(existingChar.nom) === normalizeString(character.nom)
            );

            return matchesSearch && notInCharList;
        }));

        let addList = false;

        // Tri par ordre alphabétique
        charList.sort((a, b) => a.nom.localeCompare(b.nom));

        charList.forEach(character => {
            addList = [...table.rows].every(row => 
                normalizeString(row.cells[0].id) !== normalizeString(character.nom)
            );

            if (addList) {
                const charItem = document.createElement('div');
                charItem.classList.add('char-item');
                const p = document.createElement('p');

                p.textContent = normalizeString(character.nom).startsWith(search) ? character.nom : character.alias;

                const img = document.createElement('img');
                img.src = './data/img/characters/' + character.nom.toLowerCase().split(" ").join("") + '.png';

                charItem.appendChild(img);
                charItem.appendChild(p);
                charItem.addEventListener('click', () => {
                    guessField.value = p.textContent;
                    list.innerHTML = "";
                    list.style.display = 'none';
                });

                list.appendChild(charItem);
            }
        });

        list.style.display = 'block';
    } else {
        list.style.display = 'none';
    }
});

// Fonction de normalisation qui supprime les accents et espace superflus
function normalizeString(str) {
    return str
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Supprime les accents
        .trim() // Supprime les espaces au début et à la fin
        .replace(/\s+/g, ' ') // Remplace les espaces multiples par un seul
        .toLowerCase(); // Met en minuscule
}

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
    document.getElementById('end-img').src = './data/img/characters/' + characters[randomNumber].nom.toLowerCase().split(" ").join("") + '.png';
    document.getElementById('end-text').textContent = "GG, le perso à deviner était bien : " + characters[randomNumber].nom;
    document.getElementById('end-btn').textContent = "Manche suivante";
    document.getElementById('end-btn').addEventListener('click', nextRound);
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
    document.getElementById('end-img').src = './data/img/characters/' + characters[randomNumber].nom.toLowerCase().split(" ").join("") + '.png';
    document.getElementById('end-text').textContent = "Dommage... le perso à deviner était : " + characters[randomNumber].nom;
    document.getElementById('end-btn').textContent = "Recommencer la partie";
    document.getElementById('end-btn').addEventListener('click', newGame);
}

function nextRound(){
    guessField.disabled = false;
    guessBtn.disabled = false;
    document.querySelector('.end-infos').style.display = 'none';
    lives = 7;
    setLives();
    minYear = 1928;
    maxYear = 2004;
    randomNumber = Math.floor(Math.random()*characters.length);
    table.innerHTML = "";

    for(let i = 1 ; i < 9 ; i++){
        summary.cells[i].textContent = "";
        summary.cells[i].classList.remove("correct");
        summary.cells[i].classList.add("empty");
    }
}

function newGame(){
    nextRound();
    currentScore = 0;
    minYear = 1928;
    maxYear = 2004;
    document.getElementById('current-score').textContent = "Score actuel : " + currentScore;

    game.style.display = "none";
    start.style.display = "flex";
}

guessBtn.addEventListener('click', checkGuess);

document.getElementById('show-summary').addEventListener('change', () => {
    if(document.getElementById('show-summary').checked == true){
        document.querySelector(".summary").style.display = 'revert';
    } else{
        document.querySelector(".summary").style.display = 'none';
    }
});

var startGameBtn = document.getElementById('start-game-btn');
startGameBtn.addEventListener('click', startGame);

var customizeGameBtn = document.getElementById('customize-game-btn');
var customizeGame = document.querySelector(".customize-content");

function showContent(){
    customizeGame.style.display = "flex";
    customizeGameBtn.addEventListener('click', hideContent, { once: true });
}

function hideContent(){
    customizeGame.style.display = "none";
    customizeGameBtn.addEventListener('click', showContent, { once: true });
}

customizeGameBtn.addEventListener('click', showContent, { once: true });

const customSelect = document.getElementById('custom-select');
const optionsContainer = customSelect.querySelector('.select-options');
const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]');

customSelect.addEventListener('click', () => {
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
});

function filterCharacters(){
    let newCharactersList;
    const selectedOptions = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    if(selectedOptions.length > 0)
        newCharactersList = charactersList.filter(character => selectedOptions.some(option => character.premiereApparition === option));
    else
        newCharactersList = charactersList;
    return newCharactersList;
}