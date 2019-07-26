const _prerenderAfter: Promise<void>[] = [];

export const PRERENDER = Boolean((window as any).__PRERENDER_INJECTED);

export function prerenderAfter() {
    let prerenderAfter: any;
    _prerenderAfter.push(new Promise(resolve =>
        prerenderAfter = resolve,
    ));
    return prerenderAfter as () => void;
}

prerenderAfter.resolve = function () {
    if(PRERENDER)
        Promise.all(_prerenderAfter).then(() =>
            document.dispatchEvent(new Event("prerender")),
        );
};
