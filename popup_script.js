var rulesPopup = document.getElementById('rulesPopup');
var rulesBtn = document.getElementById('rulesBtn');

var infosPopup = document.getElementById('infosPopup');
var infosBtn = document.getElementById('infosBtn');

var updatesPopup = document.getElementById('updatesPopup');
var updatesBtn = document.getElementById('updatesBtn');

var closeRulesPopupBtn = document.getElementById('closeRulesPopup');
var closeInfosPopupBtn = document.getElementById('closeInfosPopup');
var closeUpdatesPopupBtn = document.getElementById('closeUpdatesPopup');

rulesPopup.addEventListener('click', function(event){
    var rect = rulesPopup.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        rulesPopup.style.animation = "fadeOut 0.3s forwards";
        rulesPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
        rulesPopup.addEventListener('animationend', () => {
            rulesPopup.close();
            rulesPopup.style.animation = "fadeIn 0.3s forwards";
            rulesPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
        }, {once: true });
    }
});

infosPopup.addEventListener('click', function(event){
    var rect = infosPopup.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        infosPopup.style.animation = "fadeOut 0.3s forwards";
        infosPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
        infosPopup.addEventListener('animationend', () => {
            infosPopup.close();
            infosPopup.style.animation = "fadeIn 0.3s forwards";
            infosPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
        }, {once: true });
    }
});

updatesPopup.addEventListener('click', function(event){
    var rect = updatesPopup.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        updatesPopup.style.animation = "fadeOut 0.3s forwards";
        updatesPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
        updatesPopup.addEventListener('animationend', () => {
            updatesPopup.close();
            updatesPopup.style.animation = "fadeIn 0.3s forwards";
            updatesPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
        }, {once: true });
    }
});

rulesBtn.addEventListener('click', () => {
    rulesPopup.showModal();
});

infosBtn.addEventListener('click', () => {
    infosPopup.showModal();
});

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

closeRulesPopupBtn.addEventListener('click', () => {
    rulesPopup.style.animation = "fadeOut 0.3s forwards";
    rulesPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
    rulesPopup.addEventListener('animationend', () => {
        rulesPopup.close();
        rulesPopup.style.animation = "fadeIn 0.3s forwards";
        rulesPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
    }, {once: true });
});

closeInfosPopupBtn.addEventListener('click', () => {
    infosPopup.style.animation = "fadeOut 0.3s forwards";
    infosPopup.style.setProperty('--backdrop-animation', "semiFadeOut 0.3s forwards");
    infosPopup.addEventListener('animationend', () => {
        infosPopup.close();
        infosPopup.style.animation = "fadeIn 0.3s forwards";
        infosPopup.style.setProperty('--backdrop-animation', "semiFadeIn 0.3s forwards");
    }, {once: true });
});

closeUpdatesPopupBtn.addEventListener('click', () => {
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
});