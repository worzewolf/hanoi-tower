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
        winText = 'Game over. Player {{}} won. New game?',
        winTemplate = createElem('p'),
        endMessage = 'Nobody won. New game?',
        nextBtn = createElem('button', {'class':'win-btn yes'}, {'event':'click', handler: nextGame}),
        nextBtnText = 'YES',
        closeBtn =  createElem('button', {'class':'win-btn no'}, {'event':'click', handler: endGame}),
        closeBtnText = "NO",
        startedGame = false,
        startPosition = 0;

    function initGame(){
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 9; i++) {
            fragment.appendChild(createElem('div',false, {event:'click', handler: go}))
        }
        gameWrap.appendChild(fragment);
        gameParent.appendChild(gameWrap);
        startGameButton.textContent = startGameButtonText;
        gameParent.appendChild(startGameButton);

        getWinMessage();
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
        console.log(e.target);
    }

    function startGame(){
        if( startedGame) return false;
        startedGame = !startedGame;
        getStartPosition();
        console.log(startPosition);//check random number
    }
    function nextGame(){

    }
    function endGame(){

    }
    function getStartPosition(){
        startPosition = Math.floor(Math.random() * (gameClasses.length - 0) + 0); //random * (max - min) + min
    }

    console.log(gameWrap, gameParent);

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
