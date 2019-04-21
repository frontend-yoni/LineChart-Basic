function YAxisBuilder() {
    let TICK_COUNT = 5;
    let generalUtils = JJGeneralUtils.getInstance();

    let papaDiv;
    let maxValue;
    let valueTextArray;

    this.buildYAxis = function (papaDivI, maxValueI) {
        papaDiv = papaDivI;
        maxValue = maxValueI;
        buildYAxis();
    };


    /** Builder **/
    function buildYAxis() {
        populateValues();
        addAllTicks();
    }

    function addAllTicks(){
        for (let str of valueTextArray) {
            addTick(str);
        }
    }

    function addTick(str){
        let tick = papaDiv.jjAppend("p")
            .jjAddClass("yAxisTickP")
            .jjText(str);
    }

    function addTopTick(){
        let str = generalUtils.formatNiceNumber(maxValue);
        let tick = papaDiv.jjAppend("p")
            .jjAddClass("yAxisTickP")
            .jjText(str);
    }


    /** Data **/
    function populateValues() {
        valueTextArray = [];
        let jumpVal = maxValue / 4;

        pushValue(0);
        pushValue(jumpVal);
        pushValue(jumpVal * 2);
        pushValue(jumpVal * 3);
        pushValue(maxValue);

        valueTextArray.reverse();
    }

    function pushValue(value) {
        let str = generalUtils.formatNiceNumber(value);
        valueTextArray.push(str);
    }
}

YAxisBuilder.getInstance = function () {
    if (!YAxisBuilder.instance) {
        YAxisBuilder.instance = new YAxisBuilder();
    }
    return YAxisBuilder.instance;
};