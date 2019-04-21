function BGBuilder() {
    let bgDiv;
    let yAxis;
    let xAxis;
    let chartBG;

    let yAxisBuilder = YAxisBuilder.getInstance();
    let xAxisBuilder = XAxisBuilder.getInstance();

    this.buildBG = function (bgDivI, manager) {
        bgDiv = bgDivI;
        buildBG();
        populateYAxis(manager.getMaxValue());
        populateChartBG();
        populateXAxis(manager.getXAxisTextArray());
    };

    this.populateYAxis = function (maxVal) {
        populateYAxis(maxVal);
    };

    /** Builder **/
    function buildBG() {
        bgDiv.jjClear();

        yAxis = bgDiv.jjAppend("div")
            .jjAddClass("yAxis");
        xAxis = bgDiv.jjAppend("div")
            .jjAddClass("xAxis");
        chartBG = bgDiv.jjAppend("div")
            .jjAddClass("chartBG");
    }

    function populateYAxis(maxVal) {
        yAxisBuilder.buildYAxis(yAxis, maxVal);
    }

    function populateXAxis(xAxisTextArr) {
        xAxisBuilder.buildXAxis(xAxis, xAxisTextArr);
    }

    function populateChartBG() {
        for (let i = 0; i < 4; i++) {
            chartBG.jjAppend("div")
                .jjAddClass("bgTickDiv");
        }
    }
}

BGBuilder.getInstance = function () {
    if (!BGBuilder.instance) {
        BGBuilder.instance = new BGBuilder();
    }
    return BGBuilder.instance;
};