function AnimationUtil() {
    /** CONSTANTS **/
    const DEFAULT_DURATION = 750;
    let builder = SeriesBuilder.getInstance();

    let svg;

    this.setSVG = function (svgI) {
        svg = svgI;
    };

    this.animateSeriesIntro = function () {

    };

    this.animateSeries = function (canvasG, duration = DEFAULT_DURATION) {
        prepAndAnimateBoxesArray(canvasG, duration * 0.95);
        prepAndAnimatePath(canvasG, duration);
    };

    this.bounceSeries = function (canvasG, prevCanvasG, duration = DEFAULT_DURATION) {
        bouncePath(canvasG, prevCanvasG, duration);
    };

    /** Bounce **/
    function bouncePath(canvasG, prevCanvasG, duration) {
        let pathElement = canvasG.jjQuery("path");
        let newPoints = pathElement.jjGetData();
        let prevPoints = getPrevPints(prevCanvasG, newPoints);

        builder.updatePath(pathElement, prevPoints);
        builder.updateBoxes(canvasG, prevPoints);

        canvasG.jjAddClass("animating");
        pathElement.jjAnimate(frameFunc, duration, onEnd);

        /* Inner function */
        function frameFunc(t) {
            let currPoints = getCurrentPointArr(prevPoints, newPoints, t);
            builder.updatePath(pathElement, currPoints);
            builder.updateBoxes(canvasG, currPoints);
        }

        function onEnd(){
            canvasG.jjRemoveClass("animating");
        }
    }

    function getPrevPints(prevCanvasG, newPoints) {
        let prevPoints = [];
        if (prevCanvasG) {
            let path = prevCanvasG.jjQuery("path");
            prevCanvasG.jjStopAnimation();
            prevPoints = path.jjGetData();
        } else {
            for (let point of newPoints) {
                prevPoints.push({x: point.x, y: 0});
            }
        }
        return prevPoints;
    }

    /** Path **/
    function prepAndAnimatePath(canvasG, duration) {
        let path = canvasG.jjQuery("path");
        prepPathForAnimation(path, duration);
        animatePath(canvasG, path, duration);
    }

    function prepPathForAnimation(pathElement) {
        let baseDash = pathElement.getTotalLength();
        baseDash = baseDash || 0;
        pathElement.jjAttr({
            "stroke-dasharray": baseDash,
            "stroke-dashoffset": baseDash
        });
    }

    function animatePath(canvasG, pathElement, duration) {
        let baseDash = +pathElement.getAttribute("stroke-dasharray");
        let lastDash = 0;
        let dashCurr;

        canvasG.jjAnimate(frameFunction, duration, undefined, true);

        //Inner function
        function frameFunction(t) {
            dashCurr = generalUtil.getValueByProgress(baseDash, lastDash, t);
            pathElement.jjAttr({
                "stroke-dashoffset": dashCurr
            });
        }
    }

    /** Boxes **/
    function prepAndAnimateBoxesArray(papaG, duration) {
        let boxArray = papaG.jjQueryAll("circle");
        for (let box of boxArray) {
            prepBoxForAnimation(box);
        }

        papaG.jjAddClass("animating");
        papaG.jjAnimate(frameFuc, duration, onEnd, true);

        //Inner function
        function frameFuc(t) {
            let currentVisibleCount = generalUtil.getValueByProgress(0, boxArray.length, t);
            for (let i = 0; i < currentVisibleCount; i++) {
                boxArray[i].style.opacity = "1";
            }
        }

        function onEnd(){
            papaG.jjRemoveClass("animating");
        }
    }

    function prepBoxForAnimation(box) {
        box.jjStyle({
            opacity: 0,
            transition: "1s opacity"
        })
    }

    /** Util **/


    /** Math **/
    function getCurrentPointArr(startPoints, endPoints, t) {
        let currPoints = [];
        let p;
        for (let i = 0; i < endPoints.length; i++) {
            p = getPointByProgress(startPoints[i], endPoints[i], t);
            currPoints.push(p)
        }
        return currPoints;


        /* Inner Function */
        function getPointByProgress(p1, p2, t) {
            let x = p2.x;
            let y = generalUtil.getValueByProgress(p1.y, p2.y, t);
            return {x, y};
        }
    }
}