const r = require("raylib");
const g = require("./geometry")

const windowStart = 0;
const windowWidth = 1200;
const windowHeight = 800;
const windowColor = r.BLACK;



let scanner1X = 0;
let scanner1Y = 0;
const scanner1Width = 40;
const scanner1Height = windowHeight;
let scanner1Color = r.WHITE;
let scanner1Speed = 10;

let scanner2X = windowWidth / 2;
let scanner2Y = 0;
const scanner2Width = 40;
const scanner2Height = windowHeight;
let scanner2Color = r.WHITE;
let scanner2Speed = 5;

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

function isCollidedWithWall(scX, scWid, winX, winWidth) {
    if (scX <= winX || (scX + scWid) >= (winX + winWidth)) {
        return true;
    }
    return false;
}

function moveScanners() {
    scanner1X += scanner1Speed;
    if (isCollidedWithWall(scanner1X, scanner1Width, windowStart, windowWidth / 2)) {
        scanner1Speed *= -1;
    }

    scanner2X += scanner2Speed;
    if (isCollidedWithWall(scanner2X, scanner2Width, windowWidth / 2, windowWidth / 2)) {
        scanner2Speed *= -1;
    }
}


function changeColorOFScanners() {
    if (g.isOverLapping(scanner1X, scanner1Width, field1X, field1Width) ||
        g.isOverLapping(scanner1X, scanner1Width, field2X, field2Width)) {
        scanner1Color = r.RED;
        return;
    }
    scanner1Color = r.WHITE;

    if (g.isOverLapping(scanner2X, scanner2Width, field1X, field1Width) ||
        g.isOverLapping(scanner2X, scanner2Width, field2X, field2Width)) {
        scanner2Color = r.RED;
        return;
    }
    scanner2Color = r.WHITE;
}

function drawField(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color)
}

function drawScanner(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
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
    moveScanners();
    changeColorOFScanners();
}

function draw() {
    r.ClearBackground(windowColor);
    r.BeginDrawing();
    drawField(field1X, field1Y, field1Width, field1Height, field1Color);
    drawField(field2X, field2Y, field2Width, field2Height, field2Color);
    drawScanner(scanner1X, scanner1Y, scanner1Width, scanner1Height, scanner1Color);
    drawScanner(scanner2X, scanner2Y, scanner2Width, scanner2Height, scanner2Color);
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