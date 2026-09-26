function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function isOverLapping(obj1X, obj1Width, obj2X, obj2Width) {
    if (obj1X >= obj2X && obj1X <= obj2X + obj2Width) {
        return true;
    }
    if (obj1X + obj1Width <= obj2X + obj1Width && obj1X + obj1Width >= obj2X) {
        return true;
    }
    return false;
}

module.exports = {
    calcOffset,
    isOverLapping
};