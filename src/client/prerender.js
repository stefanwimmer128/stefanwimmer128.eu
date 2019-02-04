const _prerenderAfter = [];

export const PRERENDER = window.__PRERENDER_INJECTED;

export function prerenderAfter(name) {
    let prerenderAfter;
    _prerenderAfter.push(new Promise(resolve =>
        prerenderAfter = resolve,
    ));
    return prerenderAfter;
};

prerenderAfter.resolve = function () {
    return Promise.all(_prerenderAfter);
};
