/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = (callback: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
    let timerId: NodeJS.Timeout | null;
    return function (this: any, ...args: any[]) {
        if (!timerId) {
            timerId = setTimeout(() => {
                callback.apply(this, args);
                timerId = null;
            }, delay);
        }
    };
};
