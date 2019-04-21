function LineChart(directPapaComponent) {
    let me = this;
    /** CONSTANTS **/
    let CANVAS_PADDING = 10;
    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let data;

    /** Internally Set **/
        //Structure
    let bgDiv;
    let svg;
    let canvasG;
    //Layout
    let canvasWidth;
    let canvasHeight;
    //State
    let animationType;
    let prevCanvasG;
    //Util
    let manager = new Manager();
    let seriesBuilder = SeriesBuilder.getInstance();
    let bgBuilder = BGBuilder.getInstance();
    let animationUtil = new AnimationUtil();
    let tooltipUtil = TooltipUtil.getInstance();

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        externalDiv = JJPower.enhance(divHTML);
    };

    this.setData = function (dataI) {
        data = dataI;
        manager.setFullData(data);
        manager.setSelectedIDs([0]);
    };

    this.drawComponent = function (animationTypeI = 1) {
        drawComponent(animationTypeI);
    };

    this.resize = function () {
        resize();
    };

    /** Construction **/
    function drawComponent(animationTypeI) {
        animationType = animationTypeI;
        construct();
        animationType = 0;
    }

    function construct() {
        externalDiv.jjClear();

        bgDiv = externalDiv.jjAppend("div")
            .jjAddClass("bgDiv");
        svg = externalDiv.jjAppend("svg")
            .jjAddClass("chartSVG")
            .jjAddEventListener("click", onSvgClick);

        canvasG = svg.jjAppend("g")
            .jjApplyTransform(CANVAS_PADDING, CANVAS_PADDING);

        bgBuilder.buildBG(bgDiv, manager);
        calcLayout();
        drawLine();

        if (animationType == 1) {
            drawAnimation();
        } else if (animationType == 2) {
            bounceAnimation();
        }

        tooltipUtil.attachEventListeners(externalDiv);

        prevCanvasG = canvasG;
    }

    /** Layout **/
    function calcLayout() {
        canvasWidth = svg.clientWidth - CANVAS_PADDING * 2;
        canvasHeight = svg.clientHeight - CANVAS_PADDING * 2;
    }

    /** Draw **/
    function drawLine() {
        let pointsArr = manager.getPointsFromData(data[0], canvasWidth, canvasHeight);
        seriesBuilder.drawSeries(canvasG, pointsArr);
    }

    function bounceAnimation() {
        animationUtil.bounceSeries(canvasG, prevCanvasG);
    }

    function drawAnimation() {
        animationUtil.animateSeries(canvasG);
    }

    function resize() {
        drawComponent(0);
    }

    /** Interaction **/
    function shuffleChart() {
        manager.shuffleData();
        drawComponent(2);
    }

    function onSvgClick(e){
        shuffleChart();
    }
}