const r = require("raylib");

function isOutOFBound(start, end, lower, upper) {
    return start < lower || end > upper;
}

function changeScannerVelocity(start, width, lower, upper, speed) {
    const end = start + width;
    return isOutOFBound(start, end, lower, upper) ? -speed : speed;
}

function isOverlapping(s1, e1, s2, e2) {
    return (s2 <= s1 && s1 <= e2) || (s2 <= e1 && e1 <= e2);
}

function hasDetected(s1_start, s1_width, f1_start, f1_width, f2_start, f2_width) {
    const s1_end = s1_start + s1_width;
    const f1_end = f1_start + f1_width;
    const f2_end = f2_start + f2_width;
    return (isOverlapping(s1_start, s1_end, f1_start, f1_end) || isOverlapping(s1_start, s1_end, f2_start, f2_end));
}

module.exports = {
    isOutOFBound,
    changeScannerVelocity,
    hasDetected,
    isOverlapping,
}