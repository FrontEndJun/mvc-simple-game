import Game from './Game';
import GameView from './GameView';
import GameController from './GameController';

const canvas = document.getElementById('game-canvas');
const scoreNode = document.querySelector('.score-value');
const timeNode = document.querySelector('.time-value');
canvas.width = 400;
canvas.height = 400;

const gameModel = new Game(canvas.width, canvas.height);
const gameView = new GameView(canvas, scoreNode, timeNode);
const gameController = new GameController(gameModel, gameView);
