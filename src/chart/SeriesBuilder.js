function SeriesBuilder() {
    let BOX_R = 5;
    let svg;

    this.setSVG = function (svgI) {
        svg = svgI;
    };

    this.drawSeries = function (group, pointsArray) {
        drawSeries(group, pointsArray);
    };

    this.updatePath = function (pathElement, pointsArray) {
        updatePath(pathElement, pointsArray);
    };

    this.updateBoxes = function (group, pointsArray) {
        updateBoxes(group, pointsArray);
    };

    /** Series **/
    function drawSeries(group, pointsArray) {
        drawPath(group, pointsArray);
        drawBoxes(group, pointsArray);
    }

    /** Box **/
    function drawBoxes(group, pointsArray) {
        let str;
        for (let point of pointsArray) {
            drawBox(group, point);
        }
    }

    function drawBox(group, point) {
        let box = group.jjAppend("circle")
            .jjAttr({
                cx: point.x,
                cy: point.y,
                r: BOX_R
            });
        return box;
    }

    function updateBoxes(group, pointsArray) {
        let boxes = group.jjQueryAll("circle");
        for (let i = 0; i < boxes.length; i++) {
            updateBox(boxes[i], pointsArray[i]);
        }
    }

    function updateBox(box, point) {
        box.jjAttr({
            cx: point.x,
            cy: point.y
        })
    }

    /** Path **/
    function drawPath(group, pointsArray) {
        let pathElements = group.jjAppend("path");
        updatePath(pathElements, pointsArray);
        return pathElements;
    }

    function updatePath(pathElements, pointsArray) {
        let dStr = generatePathStr(pointsArray);
        pathElements.jjAttr({
            d: dStr
        })
            .jjSetData(pointsArray);
    }

    function generatePathStr(pointsArray) {
        let str;
        let point = pointsArray[0];
        str = moveTo(point.x, point.y);
        for (let i = 1; i < pointsArray.length; i++) {
            point = pointsArray[i];
            str += lineTo(point.x, point.y);
        }
        return str;
    }

    function lineTo(x, y) {
        return ` L${x}, ${y} `;
    }

    function moveTo(x, y) {
        return ` M${x}, ${y} `;
    }
}

SeriesBuilder.getInstance = function () {
    if (!SeriesBuilder.instance) {
        SeriesBuilder.instance = new SeriesBuilder();
    }
    return SeriesBuilder.instance;
};