const { Console } = require("@woowacourse/mission-utils");
//View
const InputView = require("./View/InputView");
const OutputView = require("./View/OutputView");
//Model
const bridgeMaker = require("./Model/BridgeMaker");
const randomGenerator = require("./Model/BridgeRandomNumberGenerator");
const bridgeGame = require("./Model/BridgeGame");
const BridgeGame = require("./Model/BridgeGame");

class GameController {
    #bridgeSize;
    #gameAnswer;


    constructor() {
        this.#bridgeSize;
        this.#gameAnswer;
        this.bridgeGame;
    }

    startGame() {
        OutputView.printStartMsg();
        this.askBridgeSize();
    }

    askBridgeSize() {
        InputView.readBridgeSize((size)=> {
            //console.log(size);
            this.#bridgeSize = size;
            this.#gameAnswer = bridgeMaker.makeBridge(size, randomGenerator.generate);
            console.log(this.#gameAnswer);
            const bridgeGame = new BridgeGame(size, this.#gameAnswer);

            this.askMoving(bridgeGame);
        });
    }

    askMoving(bridgeGame) {
        InputView.readMoving((moving)=> {
            //console.log(moving);
            
            const isAnswer = bridgeGame.move(moving);

            OutputView.printMap(bridgeGame.getUpList(), bridgeGame.getDownList(), false);

            if(!isAnswer) {
                bridgeGame.increaseTryCnt();
                bridgeGame.retry();
                return this.askGameCommand(bridgeGame);
            }
            
            if(bridgeGame.getMoveCnt() == this.#bridgeSize) {
                //console.log("here");
                bridgeGame.increaseTryCnt();
                return this.quitGame(bridgeGame);
            }
            return this.askMoving(bridgeGame);
        });
    }

    askGameCommand(bridgeGame) {
        InputView.readGameCommand((command)=> {
            //console.log(command);
            if(command == 'Q') this.quitGame(bridgeGame);
            if(command == 'R') {
                bridgeGame.retry();
                return this.askMoving(bridgeGame);
            }         
        });
    }

    quitGame(bridgeGame) {
        this.showGameResult(bridgeGame);
    }

    showGameResult(bridgeGame) {
        //console.log(bridgeGame.getUpList());
       // console.log(bridgeGame.getDownList());
        OutputView.printMap(bridgeGame.getUpList(), bridgeGame.getDownList(), true);
        OutputView.printResult(bridgeGame.isSuccess(), bridgeGame.getTryCnt())
        return Console.close();
    }

}

module.exports = GameController;
