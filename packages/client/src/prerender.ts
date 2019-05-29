const _prerenderAfter: Promise<void>[] = [];

export const PRERENDER = (window as any).__PRERENDER_INJECTED as boolean;

export function prerenderAfter(): () => void {
    let prerenderAfter: unknown;
    _prerenderAfter.push(new Promise(resolve =>
        prerenderAfter = resolve,
    ));
    return prerenderAfter as () => void;
}

prerenderAfter.resolve = function () {
    Promise.all(_prerenderAfter).then(() =>
        document.dispatchEvent(new Event("prerender")),
    );
};
