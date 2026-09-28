const r = require("raylib");
const s1 = require("./scanner1");
const s2 = require("./scanner2");
const s3 = require("./scanner3");
const c = require("./calculation");
const f = require("./fields");



const WIDTH = 400;
const HEIGHT = 400;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const TITLE = "Particle ditector";
    const FPS = 50;
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);
}

function updateScanner1() {
    s1.velocity = c.changeScannerVelocity(s1.start, s1.width, s1.lower, s1.upper, s1.velocity);
    s1.start += s1.velocity;
}

function updateScanner2() {
    s2.velocity = c.changeScannerVelocity(s2.start, s2.width, s2.lower, s2.upper, s2.velocity);
    s2.start += s2.velocity;
}

function updateScanner3() {
    s3.velocity = c.changeScannerVelocity(s3.start, s3.height, s3.lower, s3.upper, s3.velocity);
    s3.start += s3.velocity;
}

function update() {
    updateScanner1();
    updateScanner2();
    updateScanner3();

}


function drawScanner(x, y, width, height, hasDetected) {
    if (hasDetected) {
        r.DrawRectangle(x, y, width, height, r.RED);
    } else {
        r.DrawRectangle(x, y, width, height, r.WHITE);
    }
}

function drawRange(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {

    r.BeginDrawing()
    r.ClearBackground(r.BLACK);


    drawRange(f.field1Start, 0, f.field1Width, HEIGHT, r.SKYBLUE);
    drawRange(f.field2Start, 0, f.field2Width, HEIGHT, r.SKYBLUE);
    drawRange(0, f.field3Start, WIDTH, f.field3Width, r.SKYBLUE);


    drawScanner(s1.start, 0, s1.width, HEIGHT, c.hasDetected(s1.start, s1.width, f.field1Start, f.field1Width, f.field2Start, f.field2Width));
    drawScanner(s2.start, 0, s2.width, HEIGHT, c.hasDetected(s2.start, s2.width, f.field1Start, f.field1Width, f.field2Start, f.field2Width));
    drawScanner(0, s3.start, WIDTH, s3.height, c.hasDetected(s3.start, s3.height, f.field3Start, f.field3Width));
    r.EndDrawing()
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