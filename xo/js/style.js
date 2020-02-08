(function () {
    var gameParent = document.getElementById('game'),
        gameWrap = createElem('div', {'class':'main-container'}),
        wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ],
        gameClasses = ['x','o'],
        startGameButton = createElem('button', {'class': 'win-btn start'}, {event:'click', handler: startGame}),
        startGameButtonText = 'Start game',
        winWrapper = createElem('div', {'class':'popup'}),
        winText = 'Game over. Player:  {{}}  won. New game?',
        winTemplate = createElem('p'),
        endMessage = 'Nobody won. New game?',
        nextBtn = createElem('button', {'class':'win-btn yes'}, {'event':'click', handler: nextGame}),
        nextBtnText = 'YES',
        closeBtn =  createElem('button', {'class':'win-btn no'}, {'event':'click', handler: endGame}),
        closeBtnText = "NO",
        startedGame = false,
        endStatusGame = false,
        numberClass = 0;

    function initGame(){
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 9; i++) {
            fragment.appendChild(createElem('div',false, {event:'click', handler: go}))
        }
        gameWrap.appendChild(fragment);
        gameParent.appendChild(gameWrap);
        startGameButton.textContent = startGameButtonText;
        gameParent.appendChild(startGameButton);
        startedGame || getWinMessage();
    }

    function getWinMessage() {
        nextBtn.textContent = nextBtnText;
        closeBtn.textContent = closeBtnText;
        var div = createElem('div',{'class':'popup-window'});
        winTemplate.textContent = winText;
        div.appendChild(winTemplate);
        div.appendChild(nextBtn);
        div.appendChild(closeBtn);
        winWrapper.appendChild(div);
        document.body.appendChild(winWrapper);
    }

    function go(e){
        if(!startedGame) return false;
        // console.log(e.target);
        e.target.classList.add(getClass());
        e.target.removeEventListener('click', go);
        if(checkWin()) {
            setWinMessage();
            showWinMessage();
        } else if (ckeckDraw()){
            setDrawMessage();
            showWinMessage();
        } else {
            gameWrapToggle();
        }
    }

    function showWinMessage() {
        winWrapper.classList.add('active');
    }

    function setDrawMessage() {
        winTemplate.textContent = endMessage;
    }

    function setWinMessage() {
        winTemplate.textContent = winText.replace('{{}}', getClass());
    }

    function ckeckDraw() {
        // console.log(gameWrap.children);
        var status = true;
        for (var i = 0; i < gameWrap.children.length; i++) {
            status = (gameWrap.children[i].classList.contains( gameClasses[0] ) || gameWrap.children[i].classList.contains( gameClasses[1] ) );
            if( !status ) {
                break;
            }
        }
        console.log(status, !status);
        return status;
    }

    function checkWin() {
        return wins.some(function (winCombinations) {
            // console.log(winCombinations);//massives which we need to check
            return winCombinations.every(function (indexWin) {
                //console.log(indexWin);//return index from array of win combination
                return gameWrap.children[indexWin].classList.contains(getClass());
            })
        });
    }

    function gameWrapToggle() {
        gameWrap.classList.remove(getClass());
        setNumberClass();
        gameWrap.classList.add((getClass()));
    }

    function setNumberClass() {
        numberClass = !numberClass;
    }

    function getClass() {
        return gameClasses[+numberClass];
    }

    function startGame(){
        if(startedGame) return false;
        startedGame = !startedGame;
        if(endStatusGame) {
            nextGame();
            endStatusGame = !endStatusGame;
        }
        getStartPosition();
        // console.log(numberClass);//check random number
        if(startedGame && !endStatusGame) gameWrap.classList.add(getClass());
    }

    function nextGame(){
        closeWinMessage();
        gameWrap.innerHTML = '';
        initGame();
        if(!endStatusGame) gameWrap.classList.add(getClass());
    }

    function endGame(){
        endStatusGame = true;
        startedGame = false;
        closeWinMessage();
        gameWrap.classList.remove(getClass());
    }
    function closeWinMessage() {
        winWrapper.classList.remove('active');
    }

    function getStartPosition(){
        numberClass = Math.floor(Math.random() * (gameClasses.length - 0) + 0); //random * (max - min) + min
    }

    // console.log(gameWrap, gameParent);

    function createElem(elem,attribute,events) {
        if(!elem) return false;
        elem = document.createElement(elem);
        if(attribute){
            for(var key in attribute){
                elem.setAttribute(key, attribute[key])
            }
        }
        if(events){
            elem.addEventListener(events.event, events.handler);
            // console.log(events.event,events.handler)
        }
        return elem;
    }
    initGame();
})();
