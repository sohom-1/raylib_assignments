const r = require("raylib");

const windowStart = 0;
const windowWidth = 1200;
const windowHeight = 800;
const windowColor = r.BLACK;

let scannerX = 0;
let scannerY = 0;
const scannerWidth = 40;
const scannerHeight = windowHeight;
const scannerColor = r.WHITE;
let scannerDirection = "right";


function changeScannerDirection(startOfScanner, sWidth, winStart, winWidth) {
    if (startOfScanner === winStart) {
        scannerDirection = "right";
    }
    if ((startOfScanner + sWidth) === winWidth) {
        scannerDirection = "left";
    }
}

function moveScanner(startOfScanner, scannerWidth, windowStart, WinWidth) {
    changeScannerDirection(startOfScanner, scannerWidth, windowStart, WinWidth);
    if (scannerDirection === "right") { scannerX += 1; }
    if (scannerDirection === "left") { scannerX -= 1; }
    return;
}


function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const NAME = "Particle Detector";
    const FPS = 500;

    r.InitWindow(windowWidth, windowHeight, NAME);
    r.SetTargetFPS(FPS);
}

function update() {
    moveScanner(scannerX, scannerWidth, windowStart, windowWidth);
}

function draw() {
    r.ClearBackground(windowColor);
    r.BeginDrawing();
    r.DrawRectangle(scannerX, scannerY, scannerWidth, scannerHeight, scannerColor);
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};