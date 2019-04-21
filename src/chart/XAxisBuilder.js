function XAxisBuilder() {
    let papaDiv;
    let tickContainer;
    let textContainer;
    let tickTextArr;

    this.buildXAxis = function (papaDivI, tickTextArrI) {
        papaDiv = papaDivI;
        tickTextArr = tickTextArrI;
        buildXAxis();
    };


    /** Builder **/
    function buildXAxis() {
        tickContainer = papaDiv.jjAppend("div")
            .jjAddClass("xAxisTickContainer");

        textContainer = papaDiv.jjAppend("div")
            .jjAddClass("xAxisTextContainer");

        addAllTicks();
    }

    function addAllTicks() {
        let tickJump = 100 / (tickTextArr.length - 1);
        for (let i = 0; i < tickTextArr.length; i++) {
            addTick();
            addText(tickTextArr[i], tickJump * i);
        }
    }

    function addTick() {
        let xAxisTick = tickContainer.jjAppend("div")
            .jjAddClass("xAxisTick");
    }

    function addText(str, left) {
        let text = textContainer.jjAppend("p")
            .jjAddClass("xAxisText")
            .jjText(str)
            .jjStyle({
                left: left + "%"
            });
    }
}

XAxisBuilder.getInstance = function () {
    if (!XAxisBuilder.instance) {
        XAxisBuilder.instance = new XAxisBuilder();
    }
    return XAxisBuilder.instance;
};