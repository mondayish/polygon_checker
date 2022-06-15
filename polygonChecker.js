function checkLine(x1, y1, x2, y2, x, y) {
    let a = (y2 - y1) / (x2 - x1);
    if (isNaN(a) || !isFinite(a)) a = 0;
    let b = y1 - a * x1;
    if (isNaN(b) || !isFinite(b)) b = 0;
    if (a !== 0) {
        if (y === a * x + b) return true;
    } else {
        if (x1 === x2 && x1 === x && y >= Math.min(y1, y2) && y <= Math.max(y1, y2)) return true;
        if (y1 === y2 && y1 === y && x >= Math.min(x1, x2) && x <= Math.max(x1, x2)) return true;
    }
    return false;
}

function isOnBound(x, y, points) {
    for (let i = 1; i < points.length; i++) {
        const x1 = points[i - 1][0], y1 = points[i - 1][1], x2 = points[i][0], y2 = points[i][1];
        if (checkLine(x1, y1, x2, y2, x, y)) return true;
    }
    const x1 = points[points.length - 1][0], y1 = points[points.length - 1][1], x2 = points[0][0], y2 = points[0][1];
    return checkLine(x1, y1, x2, y2, x, y);
}

function isIntersection(x, y, x1, y1, x2, y2) {
    return x > Math.max(x1, x2) && (y1 > y && y2 < y || y1 < y && y2 > y);
}

function isInPolygonExclusive(x, y, points) {
    // Ray casting алгоритм
    // Считаем сколько раз луч, параллельный Ох, проведенный из точки, пересекает стороны полигона
    let countIntersections = 0;
    for (let i = 1; i < points.length; i++) {
        const x1 = points[i - 1][0], y1 = points[i - 1][1], x2 = points[i][0], y2 = points[i][1];
        if (isIntersection(x, y, x1, y1, x2, y2)) countIntersections++;
    }

    const x1 = points[points.length - 1][0], y1 = points[points.length - 1][1], x2 = points[0][0], y2 = points[0][1];
    if (isIntersection(x, y, x1, y1, x2, y2)) countIntersections++;
    return countIntersections % 2 === 1;
}