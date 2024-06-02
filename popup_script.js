const rulesPopup = document.getElementById('rulesPopup');
const rulesBtn = document.getElementById('rulesBtn');

const infosPopup = document.getElementById('infosPopup');
const infosBtn = document.getElementById('infosBtn');

// Catégories sélectionnables
const khLicenceBtn = document.getElementById('khLicenceBtn');
const disneyLicenceBtn = document.getElementById('disneyLicenceBtn');
const squareLicenceBtn = document.getElementById('squareLicenceBtn');

const updatesPopup = document.getElementById('updatesPopup');
const updatesBtn = document.getElementById('updatesBtn');

const closeRulesPopupBtn = document.getElementById('closeRulesPopup');
const closeInfosPopupBtn = document.getElementById('closeInfosPopup');
const closeUpdatesPopupBtn = document.getElementById('closeUpdatesPopup');

rulesBtn.addEventListener('click', () => {
    rulesPopup.showModal();
});

infosBtn.addEventListener('click', () => {
    document.querySelector(".container");
    if(document.querySelector(".container").children.length > 1){
        document.querySelector(".container").removeChild(document.querySelector(".container").children[1]);
    }
    removeSelected(document.getElementById('choixLicence'));
    infosPopup.showModal();
});

import characters from './data/characters.json' with { type : 'json' }; // import des persos
khLicenceBtn.addEventListener('click', () => {
    removeSelected(document.getElementById('choixLicence')); // on retire l'état sélectionné à tout
    khLicenceBtn.classList.add('selected'); // on ajoute l'état sélectionné
    const games = ["Kingdom Hearts", "Kingdom Hearts Chain of Memories"]; // tableau des jeux
    let container = document.querySelector(".container");
    let buttonContainer = document.createElement('div');
    // on vide le container (le div qui contient tout ce qui n'est pas de base dans l'html)
    if(container.children.length > 1){
        container.removeChild(container.children[1]);
    }
    // boucle for pour créer tous les boutons pour chaque filtre (ici les jeux)
    for(let index = 0; index < games.length; index++){
        let gameBtn = document.createElement("button");
        gameBtn.textContent = games[index];
        gameBtn.id = games[index].toLowerCase().split(' ').join(''); // pas nécessaire de mémoire
        gameBtn.addEventListener('click', (event) => {
            removeSelected(buttonContainer); // on enlève l'état sélectionné à tous les boutons
            gameBtn.classList.add("selected"); // on ajoute l'état sélectionné à celui-ci
            // on ajoute tous les personnages avec le filtre mis en paramètre
            addCharacters(character => character.licence == "Kingdom Hearts" && character.premiereApparition == games[index]);
        });
        buttonContainer.appendChild(gameBtn); // on ajoute le bouton au container
    }
    let div = document.createElement('div');
    div.id = "new-container";
    buttonContainer.classList.add("btn-container");
    div.appendChild(buttonContainer);
    container.appendChild(div);
    addCharacters(character => character.licence == "Kingdom Hearts"); // on affiche tous les persos avec ce filtre
});

disneyLicenceBtn.addEventListener('click', () => {
    removeSelected(document.getElementById('choixLicence'));
    disneyLicenceBtn.classList.add('selected');
    let container = document.querySelector(".container");
    let buttonContainer = document.createElement('div');
    if(container.children.length > 1){
        container.removeChild(container.children[1]);
    }
    
    // Boucle for pour les boutons

    let div = document.createElement('div');
    div.id = "new-container";
    buttonContainer.classList.add("btn-container");
    div.appendChild(buttonContainer);
    container.appendChild(div);
    addCharacters(character => character.licence == "Disney");
});

squareLicenceBtn.addEventListener('click', () => {
    removeSelected(document.getElementById('choixLicence'));
    squareLicenceBtn.classList.add('selected');
    let container = document.querySelector(".container");
    let buttonContainer = document.createElement('div');
    if(container.children.length > 1){
        container.removeChild(container.children[1]);
    }
    
    // Boucle for pour les boutons

    let div = document.createElement('div');
    div.id = "new-container";
    buttonContainer.classList.add("btn-container");
    div.appendChild(buttonContainer);
    container.appendChild(div);
    addCharacters(character => character.licence == "Final Fantasy");
});

// fonction pour ajouter tous les personnages avec le filtre mis en paramètre
function addCharacters(filterParam){
    let newContainer = document.getElementById("new-container");
    if(newContainer.children.length > 1){
        newContainer.removeChild(newContainer.children[1]);
    }
    let div = document.createElement('div');
    div.classList.add("img-grid");
    let list = characters.filter(filterParam);
    for(let i = 0 ; i < list.length ; i++){
        let container = document.createElement('div');
        let img = document.createElement('img');
        img.src = './data/img/' + list[i].nom.toLowerCase().split(' ').join('') + '.png';

        let name = document.createElement('div');
        name.textContent = list[i].nom;

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
                
        container.appendChild(img);
        container.appendChild(name);
        container.id = list[i].nom;
        div.appendChild(container);
    }
    newContainer.appendChild(div);
}

// fonction pour retirer la classe .selected à tous les enfants directs du container mis en paramètres
function removeSelected(container){
    let list = container.children;
    for(let i = 0 ; i < list.length ; i++){
        list[i].classList.remove("selected");
    }
}

import updates from './data/updates.json' with { type : 'json' };
updatesBtn.addEventListener('click', () => {
    for(let v = updates.length-1 ; v > -1 ; v--){
        var patch = document.createElement("div");

        var version = document.createElement("h2")
        version.textContent = "Version " + updates[v].version;
        patch.appendChild(version);
        
        var date = document.createElement("i");
        date.textContent = "Publiée le " + updates[v].date;
        patch.appendChild(date);

        if(v == updates.length-1){
            var highlightedMessage = document.createElement("p");
            highlightedMessage.textContent = updates[v].highlightedMessage;
            highlightedMessage.classList.add("highlight");
            patch.appendChild(highlightedMessage);
        }

        if(updates[v].newFeatures.length > 0){
            var newFeatures = document.createElement("h3")
            newFeatures.textContent = "Nouvelles fonctionnalités";
    
            var div = document.createElement("div");
            for(let i = 0 ; i < updates[v].newFeatures[0].length ; i++){
                var title = document.createElement("h4");
                title.textContent = i+1 + ". " + updates[v].newFeatures[0][i];
                var e = document.createElement("p");
                e.textContent = updates[v].newFeatures[1][i];
                div.appendChild(title);
                div.appendChild(e);
            }

            patch.appendChild(newFeatures);
            patch.appendChild(div);
        }

        if(updates[v].changedFeatures.length > 0){
            var changedFeatures = document.createElement("h3");
            changedFeatures.textContent = "Améliorations / Changements"
    
            var list = document.createElement("ul");
            for(let i = 0 ; i < updates[v].changedFeatures.length ; i++){
                var e = document.createElement("li");
                e.textContent = updates[v].changedFeatures[i];
                list.appendChild(e);
            }

            patch.appendChild(changedFeatures);
            patch.appendChild(list);
        }

        updatesPopup.appendChild(patch)
        var hr = document.createElement("hr");
        updatesPopup.appendChild(hr);
    }
    updatesPopup.removeChild(hr);

    updatesPopup.showModal();
});

// Fermeture des popups
closeRulesPopupBtn.addEventListener('click',  closeRules);
closeInfosPopupBtn.addEventListener('click', closeInfos);
closeUpdatesPopupBtn.addEventListener('click', closeUpdates);

rulesPopup.addEventListener('click', function(event){
    var rect = rulesPopup.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        closeRules();
    }
});

infosPopup.addEventListener('click', function(event){
    var rect = infosPopup.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        closeInfos();
    }
});

updatesPopup.addEventListener('click', function(event){
    var rect = updatesPopup.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        closeUpdates();
    }
});

function closeRules(){
    rulesPopup.style.animation = "fadeOut 0.3s forwards";
    rulesPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
    rulesPopup.addEventListener('animationend', () => {
        rulesPopup.close();
        rulesPopup.style.animation = "fadeIn 0.3s forwards";
        rulesPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
    }, {once: true });
}

function closeInfos(){
    infosPopup.style.animation = "fadeOut 0.3s forwards";
    infosPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
    infosPopup.addEventListener('animationend', () => {
        infosPopup.close();
        infosPopup.style.animation = "fadeIn 0.3s forwards";
        infosPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
    }, {once: true });
}

function closeUpdates(){
    updatesPopup.style.animation = "fadeOut 0.3s forwards";
    updatesPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
    updatesPopup.addEventListener('animationend', () => {
        updatesPopup.close();
        updatesPopup.style.animation = "fadeIn 0.3s forwards";
        updatesPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
    }, {once: true });

    var divs = updatesPopup.children;
    for(let i = 1 ; i < divs.length ; i++){
        updatesPopup.removeChild(divs[i]);
    }

    var hrs = updatesPopup.querySelectorAll("hr");
    updatesPopup.removeChild(hrs[0]);
    updatesPopup.removeChild(hrs[1]);
}