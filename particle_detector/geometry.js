function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function isOverLapping(obj1X_Y, obj1Width, obj2X, obj2Width) {
    if (obj1X_Y >= obj2X && obj1X_Y <= obj2X + obj2Width) {
        return true;
    }
    if (obj1X_Y + obj1Width <= obj2X + obj1Width && obj1X_Y + obj1Width >= obj2X) {
        return true;
    }
    return false;
}

module.exports = {
    calcOffset,
    isOverLapping
};