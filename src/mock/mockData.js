let DATA_COUNT = 20;
let generalUtil;

function getMockData() {
    generalUtil = JJGeneralUtils.getInstance();
    let map = {};
    map[0] = getDataArray_Slim(100);

    return map;
}

function getDataArray_Regular(max = 100) {
    let retArray = [];
    for (let i = 0; i < DATA_COUNT; i++) {
            retArray[i] = generalUtil.random(0, max);
    }
    return retArray;
}

function getDataArray_Slim(max) {
    let retArray = [];
    let maxIndex = generalUtil.random(0, DATA_COUNT - 5);
    retArray[maxIndex] = max;
    let minIndex = generalUtil.random(maxIndex + 1, DATA_COUNT - 1);
    retArray[minIndex] = generalUtil.random(0, max * 0.25);

    for (let i = 0; i < DATA_COUNT; i++) {
        if (i != maxIndex && i != minIndex) {
            retArray[i] = generalUtil.random(max * 0.25, max * 0.75);
        }
    }

    return retArray;
}