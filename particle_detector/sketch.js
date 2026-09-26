const r = require("raylib");
const g = require("./geometry")

const windowStart = 0;
const windowWidth = 1200;
const windowHeight = 800;
const windowColor = r.BLACK;

let scannerX = 0;
let scannerY = 0;
const scannerWidth = 40;
const scannerHeight = windowHeight;
let scannerColor = r.WHITE;
let scannerDirection = "right";

const field1X = 300;
const field1Y = 0;
const field1Width = 100;
const field1Height = windowHeight;
const field1Color = r.BLUE;

const field2X = 900;
const field2Y = 0;
const field2Width = 10;
const field2Height = windowHeight;
const field2Color = r.BLUE;


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


function changeColorOFScanner() {
    if (g.isOverLapping(scannerX, scannerWidth, field1X, field1Width) ||
        g.isOverLapping(scannerX, scannerWidth, field2X, field2Width)) {
        scannerColor = r.RED;
        return;
    }
    scannerColor = r.WHITE;
}

function drawField(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color)
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const NAME = "Particle Detector";
    const FPS = 50;

    r.InitWindow(windowWidth, windowHeight, NAME);
    r.SetTargetFPS(FPS);
}

function update() {
    moveScanner(scannerX, scannerWidth, windowStart, windowWidth);
    changeColorOFScanner();
}

function draw() {
    r.ClearBackground(windowColor);
    r.BeginDrawing();
    drawField(field1X, field1Y, field1Width, field1Height, field1Color);
    drawField(field2X, field2Y, field2Width, field2Height, field2Color);
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