function Manager() {
    let MONTH_ARR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let now = new Date();
    let generalUtil = JJGeneralUtils.getInstance();

    /** Data **/
    let fullData;
    let selectedIDs;
    let maxVal;
    let xAxisTextArr;

    /** Setters **/
    this.setFullData = function (dataI) {
        fullData = dataI;
        let keys = Object.keys(fullData);
        let firstArr = fullData[keys[0]];
        xAxisTextArr = createXAxisTicksArray(firstArr.length);
    };

    this.setSelectedIDs = function (ids) {
        selectedIDs = ids;
        calculateMax();
    };

    this.getPointsFromData = function (dataArr, areaWidth, areaHeight) {
        return getPointsFromData(dataArr, areaWidth, areaHeight);
    };

    this.getMaxValue = function () {
        return maxVal;
    };

    this.getXAxisTextArray = function () {
        return xAxisTextArr;
    };

    this.shuffleData = function () {
        let newArr = getDataArray_Regular(100);
        fullData[0] = newArr;
        xAxisTextArr = createXAxisTicksArray(newArr.length);
        calculateMax();
    };

    /** Private Functions **/
    function getPointsFromData(dataArr, areaWidth, areaHeight) {
        let len = dataArr.length;
        let pointArray = [];
        let point;
        for (let i = 0; i < dataArr.length; i++) {
            point = getPointFromData(dataArr[i], len, i, areaWidth, areaHeight);
            pointArray.push(point);
        }

        return pointArray;

        /** Inner Function **/
        function getPointFromData(value, len, index, areaWidth, areaHeight) {
            let x = getXFromIndex(index, len, areaWidth);
            let y = getYFromVal(value, areaHeight);
            return {x, y};
        }

        function getXFromIndex(index, len, areaWidth) {
            let fraction = generalUtil.getProgressByValue(0, len - 1, index);
            let x = generalUtil.getValueByProgress(0, areaWidth, fraction);
            return x;
        }

        function getYFromVal(value, areaHeight) {
            let fraction = generalUtil.getProgressByValue(0, maxVal, value);
            let distanceFromBottom = generalUtil.getValueByProgress(0, areaHeight, fraction);
            let y = areaHeight - distanceFromBottom;
            return y;
        }
    }

    /** Utils **/
    function calculateMax() {
        maxVal = 0;
        let localMax;
        for (let id of selectedIDs) {
            localMax = Math.max(...fullData[id]);
            maxVal = Math.max(localMax, maxVal);
        }
    }

    function createXAxisTicksArray(len) {
        let arr = [];
        let str;
        for (let i = 0; i < len; i++) {
            str = getXAxisText(i);
            arr.push(str);
        }
        arr.reverse();
        return arr;
    }

    function getXAxisText(monthBack) {
        let date = new Date(now.getFullYear(), now.getMonth() - monthBack);
        let year = date.getFullYear().toString();
        let month = MONTH_ARR[date.getMonth()];

        return month + " '" + year.slice(2, 4);
    }
}