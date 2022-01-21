const listeners = {};

addDomEventListener = (element, eventName, dotNetHelper, callbackFuncName) => {
    let dom = window;
    dom.id = dotNetHelper._id;

    if (element !== "window") {
        dom = document.querySelector(element);
    }

    if (dom) {
        const callback = (e) => {
            let params = {};

            if (eventName.indexOf("webkitAnimation") >= 0) {
                params = {
                    animationName: e.animationName,
                    target: e.target.id,
                    type: e.type,
                };
            } else if (eventName === "resize") {
                params = {
                    width: window.screen.width,
                    height: window.screen.height,
                };
            } else if (eventName === "keydown" || eventName === "keyup" || eventName === "keypress") {
                params = e.key;
            }

            //console.log('eventName:', eventName, ',element: ', element, ',dom.id:', dom.id, ',dotNetHelper:', dotNetHelper._id);
            dotNetHelper.invokeMethodAsync(callbackFuncName, params);
        };

        // 记录事件回调状态
        const key = element + eventName + dotNetHelper._id + callbackFuncName;
        listeners[key] = {
            callback,
            dom,
        };

        dom.addEventListener(eventName, callback);
    }
}

removeDomEventListener = (element, eventName, dotNetHelper, callbackFuncName) => {
    const key = element + eventName + dotNetHelper._id + callbackFuncName;

    const {
        callback,
        dom,
    } = listeners[key] || {};

    if (!callback) {
        return;
    }

  dom.removeDomEventListener(eventName, callback)

    listeners[key] = undefined;
}

getWindowSize = () => {
    return {
        width: window.screen.width,
        height: window.screen.height,
    }
}