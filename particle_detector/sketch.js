const r = require("raylib");
const c = require("./calculation");

const WIDTH = 400;
const HEIGHT = 400;
const world = {};

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    c.setupWindow(WIDTH, HEIGHT);

    world.s1 = c.createScanner(0, 0, 20, HEIGHT, 1, WIDTH / 2, 0, "H");
    world.s2 = c.createScanner(WIDTH / 2, 0, 20, HEIGHT, 2, WIDTH, WIDTH / 2, "H");
    world.s3 = c.createScanner(0, 0, WIDTH, 20, 1, HEIGHT, 0, "V");

    world.f1 = c.createField(100, 0, 50, HEIGHT, "H", r.BLUE);
    world.f2 = c.createField(350, 0, 30, HEIGHT, "H", r.BLUE);
    world.f3 = c.createField(0, 200, WIDTH, 20, "V", r.BLUE);
}

function update() {
    c.updateScanner(world.s1);
    c.updateScanner(world.s2);
    c.updateScanner(world.s3);
}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);

    c.drawRange(world.f1);
    c.drawRange(world.f2);
    c.drawRange(world.f3);

    c.drawScanner(world.s1, world.f1, world.f2);
    c.drawScanner(world.s2, world.f1, world.f2);
    c.drawScanner(world.s3, world.f3, world.f3);
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