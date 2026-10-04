const r = require("raylib");

function isOutOFBound(start, end, lower, upper) {
    return start < lower || end > upper;
}

function changeScannerVelocity(start, width, lower, upper, speed) {
    const end = start + width;
    return isOutOFBound(start, end, lower, upper) ? -speed : speed;
}

function isOverlapping(s1, e1, s2, e2) {
    return (s2 <= s1 && s1 <= e2) || (s2 <= e1 && e1 <= e2) || (s1 >= s2 && e1 <= e2) || (s1 <= s2 && e1 >= e2);
}

function hasDetected(scanner, field1, field2) {
    const start = scanner.orientation === "H" ? "startX" : "startY";
    const length = scanner.orientation === "H" ? "width" : "height";

    const sEnd = scanner[start] + scanner[length];
    const f1End = field1[start] + field1[length];
    const f2End = field2[start] + field2[length];

    return (isOverlapping(scanner[start], sEnd, field1[start], f1End)
        || isOverlapping(scanner[start], sEnd, field2[start], f2End));
}

function updateScanner(scanner) {

    const length = scanner.orientation === "H" ? "width" : "height";
    const start = scanner.orientation === "H" ? "startX" : "startY";

    scanner.velocity = changeScannerVelocity(scanner[start], scanner[length], scanner.lower, scanner.upper, scanner.velocity);
    scanner[start] += scanner.velocity;
}

function drawRange(field) {
    r.DrawRectangle(field.startX, field.startY, field.width, field.height, field.color);
}

function drawScanner(scanner, field1, field2) {
    const detected = hasDetected(scanner, field1, field2);

    r.DrawRectangle(scanner.startX, scanner.startY, scanner.width, scanner.height, r.WHITE);
    if (detected) {
        r.DrawRectangle(scanner.startX, scanner.startY, scanner.width, scanner.height, r.RED);
    }
}

function createField(startX, startY, width, height, orientation, color) {
    return {
        startX,
        startY,
        width,
        height,
        orientation,
        color,
    }
}
function createScanner(startX, startY, width, height, velocity, upper, lower, orientation) {
    return {
        startX,
        startY,
        width,
        height,
        velocity,
        upper,
        lower,
        orientation,
    }
}

function setupWindow(width, height) {
    const TITLE = "Particle ditector";
    const FPS = 50;
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, TITLE);
    r.SetTargetFPS(FPS);
}


module.exports = {
    setupWindow,
    drawRange,
    drawScanner,
    updateScanner,
    createField,
    createScanner,
}