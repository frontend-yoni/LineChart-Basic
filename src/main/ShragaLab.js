function ShragaLab(directPapaComponent, dataManager) {
    let me = this;
    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let data;

    /** Internally Set **/
        //Structure
    let chartAreDiv;
    //Components
    let lineChart = new LineChart();

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        externalDiv = JJPower.enhance(divHTML);
    };

    this.setData = function (dataI) {
        data = dataI;
        lineChart.setData(data);
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        externalDiv.jjClear();
        chartAreDiv = externalDiv.jjAppend("div")
            .jjAddClass("chartAreDiv");

        lineChart.setExternalDiv(chartAreDiv);
        lineChart.drawComponent();
    }

    /** Draw **/
    function resize() {
        lineChart.resize();
    }
}