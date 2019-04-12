const _prerenderAfter: Promise<void>[] = [];

export const PRERENDER = (<any>window).__PRERENDER_INJECTED;

export function prerenderAfter() {
    let prerenderAfter;
    _prerenderAfter.push(new Promise(resolve =>
        prerenderAfter = resolve,
    ));
    return prerenderAfter;
}

prerenderAfter.resolve = function () {
    return Promise.all(_prerenderAfter);
};
