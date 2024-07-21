const doc = document;
const timeoutInterval = 10000;
const _timeSpan = {};


_timeSpan.fromSeconds = function (seconds) {
    return seconds * 1000;
}

_timeSpan.fromMinutes = function (minutes) {
    return minutes * 60 * 1000;
}

_timeSpan.fromHours = function (hours) {
    return hours * 60 * 60 * 1000;
}

_timeSpan.fromDays = function (days) {
    return days * 24 * 60 * 60 * 1000;
}

Object.prototype.q = function (queryElement) {
    return this?.querySelector(queryElement);
}

Object.prototype.qAll = function (queryElement) {
    return [...this?.querySelectorAll(queryElement)];
}



Object.prototype.qAsync = function (queryElement, timeout = timeoutInterval) {
    return new Promise((resolve, reject) => {

        var cancelationToken;

        const interval = setInterval(() => {

            element = this?.querySelector(queryElement);

            if (element) {
                clearInterval(interval);
                cancelationToken?.Dispose();
                resolve(element);
            }

        }, 100);

        if (timeout != null) {
            cancelationToken = CancelationToken(interval);
            cancelationToken.ExpireIn(timeout).then(() => {
                var messageTimeout = `Request timeout... queryElement: ${queryElement}`
                console.log(messageTimeout)
                reject("");
            })
        }
    })
}

Object.prototype.qAttributeAsync = function (queryElement, attribute, timeout = timeoutInterval) {
    return new Promise((resolve, reject) => {

        var cancelationToken;

        const interval = setInterval(() => {

            element = this?.querySelector(queryElement);
            elementAttribute = element?.getAttribute(attribute);

            if (element && elementAttribute) {
                clearInterval(interval);
                cancelationToken?.Dispose();
                resolve(element);
            }

        }, 100);

        if (timeout != null) {
            cancelationToken = CancelationToken(interval);
            cancelationToken.ExpireIn(timeout).then(() => {
                var messageTimeout = `Request timeout... queryElement: ${queryElement}`
                console.log(messageTimeout)
                reject("");
            })
        }
    })
}

Object.prototype.qAllAsync = function (queryElement, timeout = timeoutInterval) {
    return new Promise((resolve, reject) => {

        var cancelationToken;
        var interval = setInterval(() => {
            listElement = this?.querySelectorAll(queryElement);
            if (listElement?.length) {
                clearInterval(interval)
                cancelationToken?.Dispose();
                resolve([...listElement]);
            }
        }, 100);

        if (timeout != null) {
            cancelationToken = CancelationToken(interval);
            cancelationToken.ExpireIn(timeoutInterval).then(() => {
                var messageTimeout = `Request timeout... queryElement: ${queryElement}`
                console.log(messageTimeout)
                reject("");
            })
        }
    })
}

Object.prototype.event = function (event, callback) {
    return this?.addEventListener(event, callback);
}

Object.prototype.create = function (element, attributes) {

    if (!element) return;

    const elementCreated = this?.createElement(element);

    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            elementCreated?.setAttribute(key, value);
        })
    }

    return elementCreated;
}

Array.prototype.forEachAsync = async function (callback) {

    for (const [index, value] of this.entries()) {
        await callback(value, index);
    }
}


function CancelationToken(interval) {

    var timeoutCancelationToken;

    function ExpireIn(timeoutMS = 10000) {
        return new Promise((resolve) => {
            timeoutCancelationToken = setTimeout(() => {
                clearInterval(interval)
                console.log("Timeout ocurred ...");
                resolve();
            }, timeoutMS)
        });
    }

    function Dispose() {
        clearTimeout(timeoutCancelationToken);
    }

    return { ExpireIn, Dispose };
}