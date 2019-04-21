/**
 * Created by yavitzur on 23/01/2017.
 */

/**
 * Enhance your Element object with JJPower! Super efficient technique for DOM orchestration.
 * ***/

function JJPower() {
    JJPower.easeArray = [0, 0.004, 0.008, 0.013, 0.019, 0.026, 0.033, 0.041, 0.05, 0.06, 0.071, 0.082, 0.095, 0.108, 0.122, 0.137, 0.152, 0.169, 0.185, 0.203, 0.221, 0.239, 0.257, 0.276, 0.295, 0.314, 0.333, 0.352, 0.371, 0.39, 0.409, 0.427, 0.445, 0.462, 0.48, 0.497, 0.513, 0.53, 0.545, 0.561, 0.576, 0.591, 0.605, 0.619, 0.632, 0.645, 0.658, 0.67, 0.683, 0.694, 0.706, 0.717, 0.727, 0.738, 0.748, 0.758, 0.767, 0.776, 0.785, 0.794, 0.802, 0.811, 0.818, 0.826, 0.834, 0.841, 0.848, 0.855, 0.861, 0.867, 0.874, 0.879, 0.885, 0.891, 0.896, 0.901, 0.906, 0.911, 0.916, 0.92, 0.925, 0.929, 0.933, 0.937, 0.941, 0.944, 0.948, 0.951, 0.954, 0.958, 0.96, 0.963, 0.966, 0.969, 0.971, 0.973, 0.976, 0.978, 0.98, 0.982, 0.983, 0.985, 0.987, 0.988, 0.99, 0.991, 0.992, 0.993, 0.994, 0.995, 0.996, 0.997, 0.998, 0.998, 0.999, 0.999, 0.999, 1, 1, 1, 1];
    JJPower.isMobile = false;

    /** Prep Static Functions **/
    JJPower.enhance = function (element) {
        if (element) {
            Object.assign(element, JJPower.prototype);
        }
        return element;
    };

    JJPower.query = function () {
        const queryText = getGeneratedQueryText(...arguments);

        const element = document.querySelector(queryText);

        JJPower.enhance(element);
        return element;
    };

    JJPower.jjCreateElement = function (tagName) {
        var element;
        if (tagName.toUpperCase() == 'SVG') {
            element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
        } else {
            element = document.createElement(tagName);
        }
        return JJPower.enhance(element);
    };

    /** *Commonly used****/
    JJPower.prototype.jjWidth = function () {
        return this.getBoundingClientRect().width;
    };

    JJPower.prototype.jjAppend = function (tagName) {
        const me = this;
        let child;
        if (isSVGElement(tagName)) {
            child = document.createElementNS('http://www.w3.org/2000/svg', tagName);
        } else {
            child = document.createElement(tagName);
        }
        JJPower.enhance(child);

        this.appendChild(child);
        return child;


        // Inner functions
        // Either the tag itself is SVG, or it's parent (this) is an SVG element
        function isSVGElement(tagName) {
            const isIt = (tagName.toUpperCase() == 'SVG' || (me instanceof SVGElement));
            return isIt;
        }
    };

    JJPower.prototype.jjQuery = function () {
        const queryText = getGeneratedQueryText(...arguments);

        const element = this.querySelector(queryText);
        JJPower.enhance(element);
        return element;
    };

    JJPower.prototype.jjQueryAll = function () {
        const queryText = getGeneratedQueryText(...arguments);

        let elements = this.querySelectorAll(queryText);
        elements = Array.from(elements);
        elements.forEach(JJPower.enhance);
        return elements;
    };

    JJPower.prototype.jjGetChildren = function () {
        let elements = this.children || this.childNodes;
        elements = Array.from(elements);
        elements.forEach(JJPower.enhance);
        return elements;
    };

    JJPower.prototype.jjStyle = function (styleMap) {
        const keys = Object.keys(styleMap);
        for (const key of keys) {
            this.style[key] = styleMap[key];
        }
        return this;
    };

    JJPower.prototype.jjAttr = function (attrMap) {
        const keys = Object.keys(attrMap);
        let val;
        for (const key of keys) {
            val = attrMap[key];
            this.setAttribute(key, attrMap[key]);
            if (!val) {
                this.removeAttribute(key);
            }
        }
        return this;
    };

    JJPower.prototype.jjAddEventListener = function (eventName, callBack, useCapture) {
        let jjEventName = eventName;
        if (JJPower.isMobile) {
            jjEventName = getMobileEventName(eventName, this);
        }
        if (jjEventName) {
            this.addEventListener(jjEventName, callBack, useCapture);
        }

        return this;
    };

    JJPower.prototype.jjRemoveEventListener = function (eventName, callBack, useCapture) {
        let jjEventName = eventName;
        if (JJPower.isMobile) {
            jjEventName = getMobileEventName(eventName, this);
        }
        if (jjEventName) {
            this.removeEventListener(jjEventName, callBack, useCapture);
        }

        return this;
    };

    JJPower.prototype.jjAddClass = function () {
        try { // If the user gives bad dataList (eg. empty string) don't overreact, stay cool
            const styleModuleObject = arguments[0];
            if (typeof styleModuleObject === 'string') { // This means we're in sandbox
                this.classList.add(...arguments);
            } else { // this means we're using css modules
                let className;
                for (let i = 1; i < arguments.length; i++) {
                    className = arguments[i];
                    this.classList.add(styleModuleObject[className]);
                }
            }
        } catch (e) {
        }

        return this;
    };

    JJPower.prototype.jjRemoveClass = function () {
        const styleModuleObject = arguments[0];
        if (typeof styleModuleObject === 'string') { // This means we're in sandbox
            this.classList.remove(...arguments);
        } else { // this means we're using css modules
            let className;
            for (let i = 1; i < arguments.length; i++) {
                className = arguments[i];
                this.classList.remove(styleModuleObject[className]);
            }
        }

        return this;
    };

    JJPower.prototype.jjToggleClass = function () {
        const styleModuleObject = arguments[0];
        let hasStyleModuleObject = false;
        let startIndex = 0;
        let className;
        if (typeof styleModuleObject !== 'string') { // this means we're using css modules
            hasStyleModuleObject = true;
            startIndex = 1;
        }

        for (let i = startIndex; i < arguments.length; i++) {
            className = (hasStyleModuleObject ? styleModuleObject[arguments[i]] : arguments[i]);
            if (this.classList.contains(className)) {
                this.classList.remove(className);
            } else {
                this.classList.add(className);
            }
        }

        return this;
    };

    JJPower.prototype.jjContainsClass = function () {
        let className = getGeneratedClassName(...arguments);
        let classList = this.classList;
        return classList.contains(className);
    };


    JJPower.prototype.jjClear = function () {
        while (this.firstChild) { // If the user gives bad dataList (eg. empty string) don't overreact, stay cool
            this.removeChild(this.firstChild);
        }
        return this;
    };

    JJPower.prototype.jjRemoveMe = function () {
        let parentNode = this.parentNode;
        if (parentNode) {
            parentNode.removeChild(this);
        }
    };

    JJPower.prototype.jjText = function (textContent) {
        this.textContent = textContent;
        return this;
    };

    JJPower.prototype.jjAddText = function (textContent) {
        let textNode = document.createTextNode(textContent);
        this.appendChild(textNode);
        return this;
    };

    JJPower.prototype.jjAddBoldText = function (textContent) {
        this.jjAppend("b")
            .jjText(textContent);
        return this;
    };

    JJPower.prototype.jjAddTextBreak = function () {
        this.jjAppend("br");
        return this;
    };

    JJPower.prototype.jjClone = function (isDeep) {
        const element = this.cloneNode(isDeep);
        JJPower.enhance(element);
        return element;
    };

    JJPower.prototype.jjSetData = function (dataObject) {
        this.__data__ = dataObject;
        return this;
    };

    JJPower.prototype.jjGetData = function () {
        return this.__data__;
    };

    JJPower.prototype.jjSetIndex = function (index) {
        this.setAttribute('jjIndex', index);
        return this;
    };

    JJPower.prototype.jjGetIndex = function () {
        return +this.getAttribute('jjIndex');
    };

    //Returns null if no papa found
    JJPower.prototype.jjGetClosestPapaWithClass = function () {
        const className = getGeneratedClassName(...arguments);
        let bingoPapa = this.closest("." + className);
        return JJPower.enhance(bingoPapa);
    };

    //Returns null if no papa found
    JJPower.prototype.jjClosest = function () {
        const selectorStr = getGeneratedQueryText(...arguments);
        let bingoPapa = this.closest(selectorStr);
        return JJPower.enhance(bingoPapa);
    };

    JJPower.prototype.jjIsAncestor = function (ancestor) {
        let papa = this;
        while (papa && (papa !== ancestor)) {
            papa = papa.parentNode;
        }
        return papa;
    };


    JJPower.prototype.jjGetStylePixelNumberValue = function (styleName) {
        let strOrig = this.style[styleName];
        let numStr = strOrig.replace("px", "");
        return +numStr;
    };

    /** Measurements Calculations **/
    //This is expensive! Uses getBoundingClientRect
    JJPower.prototype.jjMouseCoordinatesRelativeToMe = function (event) {
        let clientRect = this.getBoundingClientRect();
        let x = event.clientX - clientRect.left;
        let y = event.clientY - clientRect.top;

        return {
            x: x,
            y: y,
            rect: clientRect
        }
    };

    /** Inline Style **/
    JJPower.prototype.jjApplyTransform = function (x, y, rotation, rotateFirst, translateUnit) {
        let hasTranslate = (x !== undefined || y !== undefined);

        if (!y) {
            y = 0;
        }
        if (!x) {
            x = 0;
        }
        if (!translateUnit) {
            translateUnit = "px";
        }

        let transformStr = "";
        let isSVG = this instanceof SVGElement;

        let translateStr = "";
        let rotateStr = "";

        if (hasTranslate) {
            translateStr = getTranslateStr();
        }
        if (rotation) {
            rotateStr = getRotateStr();
        }

        if (rotateFirst) {
            transformStr = rotateStr + " " + translateStr;
        } else {
            transformStr = translateStr + " " + rotateStr;
        }
        transformStr.trim();


        if (isSVG) {
            this.setAttribute("transform", transformStr);
        } else {
            this.style.transform = transformStr;
        }

        this.jjTotallyUnreliableY = y; //Ugly workaround for specific issue
        this.jjTotallyUnreliableX = x; //Ugly workaround for specific issue

        return this;

        //Inner functions
        function getTranslateStr() {
            let translateStr;
            if (isSVG) {
                translateStr = `translate(${x}, ${y})`;
            } else {
                translateStr = `translate(${x}${translateUnit}, ${y}${translateUnit})`;
            }
            return translateStr;
        }

        function getRotateStr() {
            let rotateStr;
            if (isSVG) {
                rotateStr = `rotate(${rotation})`;
            } else {
                rotateStr = `rotate(${rotation}deg)`;
            }
            return rotateStr;
        }
    };

    /** Animation **/
    JJPower.prototype.jjAnimate = function (frameFunction, animationDuration, endFunction, isLinear, timingArr) { // Frame function runs each frame, and takes the current progress param!
        timingArr = timingArr || JJPower.easeArray;
        let timingLen = timingArr.length - 1;
        let me = this;
        let animationObj = {stopNow: false, t: 0};

        const startTime = new Date().getTime();
        isLinear = isLinear || animationDuration > 4000;


        if (!me.animationList) {
            me.animationList = [];
        }
        me.animationList.push(animationObj);

        requestAnimationFrame(repeatAnimation);

        return animationObj;

        /* Inner Functions */
        function repeatAnimation() {
            if (animationObj.stopNow) { //It hurts my soul to return in the middle of a function, but had to. God forgive me.
                return;
            }

            const nowTime = new Date().getTime();
            let progressTime = nowTime - startTime;
            progressTime = Math.min(animationDuration, progressTime);

            let t = progressTime / animationDuration;
            if (!isLinear) {
                t = JJPower.easeInTiming(t, timingArr, timingLen);
            }

            frameFunction(t);

            if (t < 1) {
                requestAnimationFrame(repeatAnimation);
            } else if (endFunction) {
                endFunction();
            }

            animationObj.t = t;
        }
    };

    JJPower.easeInTiming = function (t, timingArr, timingLen) {
        let real = t * timingLen;
        let base = Math.floor(real);
        let next = Math.ceil(real);
        let retT = getValueByProgress(timingArr[base], timingArr[next], real - base);
        return retT;

        /* Inner Function */
        function getValueByProgress(startValue, endValue, t){
            return startValue + (endValue - startValue) * t;
        }
    };

    JJPower.prototype.jjStopAnimation = function () {
        let me = this;
        if (me.animationList) {
            for (let animationObj of me.animationList) {
                animationObj.stopNow = true;
            }
        }
        return me;
    };

    /** *Awful but necessary *****/
    // Used to time css animations. We need to assign the animation start state, then reflow so it will be set, and then assign the end state
    JJPower.prototype.jjForceStyleRecalc = function () {
        let computedStyle = window.getComputedStyle(this);
        return computedStyle.transform;
    };

    /******* Private Functions ******/

    /** Mobile **/
    function getMobileEventName(origEventName, element) {
        if (element == document && origEventName == "click") {
            return "touchstart";
        }

        switch (origEventName) {
            case "mousedown":
                return "touchstart";
            case "mousemove":
                return "touchmove";
            case "mouseup":
                return "touchend";
            case "mouseenter":
                return "";
            case "mouseleave":
                return "";
            case "mouseover":
                return "";
            case "mouseout":
                return "";
            default:
                return origEventName
        }
    }

    /** CSS Modules **/
    function getGeneratedClassName() {
        let className;
        const param1 = arguments[0];
        const param2 = arguments[1];

        if (!param2) { // This means we received only a string representing the selector
            className = param1;
        } else { // this means we're using css modules, and also received the styles object
            className = param2;
            const stylesObject = param1;
            className = stylesObject[className] || param2;
        }

        return className;
    };

    function getGeneratedQueryText() {
        let queryText;
        const param1 = arguments[0];
        const param2 = arguments[1];
        const stylesObject = param1;

        if (!param2) { // This means we received only a string representing the selector
            queryText = param1;
        } else { // this means we're using css modules, and also received the styles object
            queryText = param2;
            queryText = queryText.replace(/(\.[a-zA-Z0-9]+)/g, replaceFunction);
        }
        return queryText;


        /* Inner Function */
        function getStyleObjectClassSelector(origQueryText) {
            let classSelector = origQueryText.replace('.', '');
            classSelector = stylesObject[classSelector];
            if (!classSelector) {
                classSelector = origQueryText.replace('.', '');
            }
            classSelector = `.${classSelector}`;

            return classSelector;
        }

        function replaceFunction(match, p1) {
            let classSelector = getStyleObjectClassSelector(p1, stylesObject);
            return classSelector;
        }
    };

    /** Finally. Enhance the document (mainly for attaching mobile friendly event listeners) **/
    JJPower.enhance(document);
}

JJPower.getInstance = function () {
    if (!JJPower.instance) {
        JJPower.instance = new JJPower();
    }
    return JJPower.instance;
};

JJPower.getInstance();

