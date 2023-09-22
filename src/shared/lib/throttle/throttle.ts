export const throttle = (callback, delay) => {
    let timerId;
    return function (...args) {
        if (!timerId) {
            timerId = setTimeout(() => {
                callback.apply(this, args);
                timerId = null;
            }, delay);
        }
    };
};
