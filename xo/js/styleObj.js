(function () {
    function GameXo(options) {
        options = options || {};
        this.options = {
            gameParent: options.gameParent || document.getElementById('game'),
            gameWrap: createElem(
                options.gameWrap ? options.gameWrap.wrap : 'div',
                {'class':options.gameWrap ? options.gameWrap.classWrapName : 'main-container'}),
            wins: [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ],
            gameClasses: options.gameClasses || ['x','o'],
            startGameButton: createElem(
                options.startGameButton ? options.startGameButton.elemButton : 'button',
                {
                    'class': options.startGameButton ? options.startGameButton.classButton : 'win-btn start'
                },
                {
                    'event':options.startGameButton ? options.startGameButton.event : 'click',
                    handler: startGame.bind(this)
                }
            ),
            startGameButtonText: options.startGameButton || 'Start game',
            winWrapper: createElem(
                options.winWrapper ? options.winWrapper.elemName : 'div',
                {'class': options.winWrapper ? options.winWrapper.className : 'popup'}),
            winText: options.winText || 'Game over. Player:  {{}}  won. New game?',
            winTemplate: createElem(options.winTemplateName || 'p'),
            endMessage: options.endMessage || 'Nobody won. New game?',
            nextBtn: createElem(
                options.nextBtn ? options.nextBtn.elemName : 'button',
                {'class': options.nextBtn ? options.nextBtn.className : 'win-btn yes'},
                {
                    'event': options.nextBtn ? options.nextBtn.eventName : 'click',
                    handler: nextGame.bind(this)
                })
            ,
            nextBtnText: options.nextBtnText || 'YES',
            closeBtn: createElem(
                options.closeBtn ? options.closeBtn.elemName : 'button',
                {'class': options.closeBtn ? options.closeBtn.className : 'win-btn no'},
                {
                    'event': options.closeBtn ? options.closeBtn.eventName : 'click',
                    handler: endGame.bind(this)
                }
                ),
            closeBtnText: options.closeBtnText || "NO",
            startedGame: false,
            endStatusGame: false,
            numberClass: 0,
        };
    }

    window.GameXo = GameXo;

    GameXo.prototype.initGame = initGame;

    function initGame(){
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < 9; i++) {
            fragment.appendChild(createElem('div',false, {event:'click', handler: go.bind(this), options:{once:true}}))
        }
        this.options.gameWrap.appendChild(fragment);
        this.options.gameParent.appendChild(this.options.gameWrap);
        this.options.startGameButton.textContent = this.options.startGameButtonText;
        this.options.gameParent.appendChild(this.options.startGameButton);

        this.options.startedGame || getWinMessage.apply(this);
    }

    function getWinMessage() {
        this.options.nextBtn.textContent = this.options.nextBtnText;
        this.options.closeBtn.textContent = this.options.closeBtnText;
        var div = createElem('div',{'class':'popup-window'});
        this.options.winTemplate.textContent = this.options.winText;
        div.appendChild(this.options.winTemplate);
        div.appendChild(this.options.nextBtn);
        div.appendChild(this.options.closeBtn);
        this.options.winWrapper.appendChild(div);
        document.body.appendChild(this.options.winWrapper);
    }

    function go(e){
        if(!this.options.startedGame) return false;

        e.target.classList.add(getClass.apply(this));

        if(checkWin.apply(this)) {
            setWinMessage.apply(this);
            showWinMessage.apply(this);
        } else if (ckeckDraw.apply(this)){
            setDrawMessage.apply(this);
            showWinMessage.apply(this);
        } else {
            gameWrapToggle.apply(this);
        }
    }

    function showWinMessage() {
        this.options.winWrapper.classList.add('active');
    }

    function setDrawMessage() {
        this.options.winTemplate.textContent = this.options.endMessage;
    }

    function setWinMessage() {
        this.options.winTemplate.textContent = this.options.winText.replace('{{}}', getClass.apply(this));
    }

    function ckeckDraw() {
        // console.log(gameWrap.children);
        var status = true;
        for (var i = 0; i < this.options.gameWrap.children.length; i++) {
            status = (this.options.gameWrap.children[i].classList.contains( this.options.gameClasses[0] ) || this.options.gameWrap.children[i].classList.contains( this.options.gameClasses[1] ) );
            if( !status ) {
                break;
            }
        }
        console.log(status, !status);
        return status;
    }

    function checkWin() {
        var self = this;
        return this.options.wins.some(function (winCombinations) {
            // console.log(winCombinations);//massives which we need to check
            return winCombinations.every(function (indexWin) {
                //console.log(indexWin);//return index from array of win combination
                return self.options.gameWrap.children[indexWin].classList.contains(getClass.apply(self));
            })
        });
    }

    function gameWrapToggle() {
        this.options.gameWrap.classList.remove(getClass.apply(this));
        setNumberClass.apply(this);
        this.options.gameWrap.classList.add((getClass.apply(this)));
    }

    function setNumberClass() {
        this.options.numberClass = !this.options.numberClass;
    }

    function getClass() {
        return this.options.gameClasses[+this.options.numberClass];
    }

    function startGame(){
        if( this.options.startedGame) return false;
        this.options.startedGame = !this.options.startedGame;
        if( this.options.endStatusGame) {
            nextGame.apply(this);
            this.options.endStatusGame = ! this.options.endStatusGame;
        }
        getStartPosition.apply(this);
        // console.log(numberClass);//check random number
        if( this.options.startedGame && !this.options.endStatusGame) this.options.gameWrap.classList.add(getClass.apply(this));
    }

    function nextGame(){
        closeWinMessage.apply(this);
        this.options.gameWrap.innerHTML = '';
        initGame.apply(this);
        if(!this.options.endStatusGame) this.options.gameWrap.classList.add(getClass.apply(this));
    }

    function endGame(){
        this.options.endStatusGame = true;
        this.options.startedGame = false;
        this.options.gameWrap.classList.remove(getClass.apply(this));
        closeWinMessage.apply(this);
    }
    function closeWinMessage() {
        this.options.winWrapper.classList.remove('active');
    }

    function getStartPosition(){
        this.options.numberClass = Math.floor(Math.random() * (this.options.gameClasses.length - 0) + 0); //random * (max - min) + min
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
            elem.addEventListener(events.event, events.handler, events.options);
            // console.log(events.event,events.handler)
        }
        return elem;
    }
})();
