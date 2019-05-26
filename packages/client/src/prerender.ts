const _prerenderAfter: Promise<void>[] = [];

export const PRERENDER = (<any>window).__PRERENDER_INJECTED;

export function prerenderAfter(): () => void {
    let prerenderAfter: unknown;
    _prerenderAfter.push(new Promise(resolve =>
        prerenderAfter = resolve,
    ));
    return (<() => void>prerenderAfter);
}

prerenderAfter.resolve = function () {
    Promise.all(_prerenderAfter).then(() =>
        document.dispatchEvent(new Event("prerender")),
    );
};
