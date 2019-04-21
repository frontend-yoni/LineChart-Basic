function TooltipUtil() {
    let papaDiv;
    let tipDiv;

    this.attachEventListeners = function (papaDivI) {
        papaDiv = papaDivI;
        attachEventListeners();
    };

    /** Builder **/
    function attachEventListeners() {
        let boxArray = papaDiv.jjQueryAll("circle");
        for (let box of boxArray) {
            attachEvent(box);
        }
        if (tipDiv) {
            tipDiv.jjRemoveMe();
        }
        tipDiv = papaDiv.jjAppend("div")
            .jjAddClass("rick");
    }

    function attachEvent(box) {
        box.jjAddEventListener("mouseenter", onHover);
        box.jjAddEventListener("mouseleave", onOut);
    }

    function onHover(e) {
        let box = e.currentTarget;
        let bcRect = box.getBoundingClientRect();

        box.style.stroke = "deepskyblue";
        tipDiv.jjStyle({
            display: "block",
            top: bcRect.top + "px",
            left: bcRect.left + "px"
        });
    }

    function onOut(e) {
        e.currentTarget.style.stroke = "none";
        tipDiv.style.display = "none";
    }
}

TooltipUtil.getInstance = function () {
    if (!TooltipUtil.instance) {
        TooltipUtil.instance = new TooltipUtil();
    }
    return TooltipUtil.instance;
};