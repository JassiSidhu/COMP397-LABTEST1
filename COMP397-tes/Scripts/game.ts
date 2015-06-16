/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "dice1", src: "assets/images/dice1.png" },
    { id: "dice2", src: "assets/images/dice2.png" },
    { id: "dice3", src: "assets/images/dice3.png" },
    { id: "dice4", src: "assets/images/dice4.png" },
    { id: "dice5", src: "assets/images/dice5.png" },
    { id: "dice6", src: "assets/images/dice6.png" },

    { id: "rollButton", src: "assets/images/roll.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];


// Game Variables
var labelDice1: createjs.Text;
var labelDice2: createjs.Text;
var rollButton: createjs.Bitmap;
var image1: createjs.Bitmap;
var image2: createjs.Bitmap;
var rollNo1;
var rollNo2;


// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '630px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

// Callback function that allows me to respond to roll button click events
function rollButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");

    //to refresh images
    stage.removeChild(labelDice1);
    stage.removeChild(labelDice2);
    stage.removeChild(image1);
    stage.removeChild(image2);

    //random number generator for dice1
    rollNo1 = Math.floor((Math.random() * 6) + 1);
    switch (rollNo1) {
        case (1):
            labelDice1 = new createjs.Text("Two", "40px Consolas", "#000000");
            image1 = new createjs.Bitmap(assets.getResult("dice2"));
            break;
        case (2):
            labelDice1 = new createjs.Text("Six", "40px Consolas", "#000000");
            image1 = new createjs.Bitmap(assets.getResult("dice6"));
            break;
        case (3):
            labelDice1 = new createjs.Text("Three", "40px Consolas", "#000000");
            image1 = new createjs.Bitmap(assets.getResult("dice3"));
            break;
        case (4):
            labelDice1 = new createjs.Text("One", "40px Consolas", "#000000");
            image1 = new createjs.Bitmap(assets.getResult("dice1"));
            break;
        case (5):
            labelDice1 = new createjs.Text("Four", "40px Consolas", "#000000");
            image1 = new createjs.Bitmap(assets.getResult("dice4"));
            break;
        case (6):
            labelDice1 = new createjs.Text("Five", "40px Consolas", "#000000");
            image1 = new createjs.Bitmap(assets.getResult("dice5"));
            break;

    }

    //random number generator for dice2
    rollNo2 = Math.floor((Math.random() * 6) + 1);
    switch (rollNo2) {
        case (1):
            image2 = new createjs.Bitmap(assets.getResult("dice6"));
            labelDice2 = new createjs.Text("Six", "40px Consolas", "#000000");
            break;
        case (2):
            image2 = new createjs.Bitmap(assets.getResult("dice5"));
            labelDice2 = new createjs.Text("Five", "40px Consolas", "#000000");
            break;
        case (3):
            image2 = new createjs.Bitmap(assets.getResult("dice4"));
            labelDice2 = new createjs.Text("Four", "40px Consolas", "#000000");
            break;
        case (4):
            image2 = new createjs.Bitmap(assets.getResult("dice3"));
            labelDice2 = new createjs.Text("Three", "40px Consolas", "#000000");
            break;
        case (5):
            image2 = new createjs.Bitmap(assets.getResult("dice2"));
            labelDice2 = new createjs.Text("Two", "40px Consolas", "#000000");
            break;
        case (6):
            image2 = new createjs.Bitmap(assets.getResult("dice1"));
            labelDice2 = new createjs.Text("One", "40px Consolas", "#000000");
            break;

    }
  
    //setting position and adding images
    image1.x = 50;
    image1.y = 200;
    stage.addChild(image1);
    image2.x = 350;
    image2.y = 200;
    stage.addChild(image2);
    
    
    //setting position and adding label displaying number on dices
    labelDice1.regX = labelDice1.getMeasuredWidth() * 0.5;
    labelDice1.regY = labelDice1.getMeasuredHeight() * 0.5;
    labelDice1.x = 100;
    labelDice1.y = 450;
    stage.addChild(labelDice1);


    labelDice2.regX = labelDice2.getMeasuredWidth() * 0.5;
    labelDice2.regY = labelDice2.getMeasuredHeight() * 0.5;
    labelDice2.x = 400;
    labelDice2.y = 450;
    stage.addChild(labelDice2);


}

// Callback functions that change the alpha transparency of the button

// Mouseover event
function rollButtonOver() {
    rollButton.alpha = 0.8;
}

// Mouseout event
function rollButtonOut() {
    rollButton.alpha = 1.0;
}

// Our Main Game Function
function main() {
    console.log("Game is Running");


    rollButton = new createjs.Bitmap(assets.getResult("rollButton"));
    rollButton.regX = rollButton.getBounds().width * 0.5;
    rollButton.regY = rollButton.getBounds().height * 0.5;
    rollButton.x = 200;
    rollButton.y = 550;
    stage.addChild(rollButton);
    rollButton.on("click", rollButtonClicked);
    rollButton.on("mouseover", rollButtonOver);
    rollButton.on("mouseout", rollButtonOut);
}