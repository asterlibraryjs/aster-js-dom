import { Deferred } from "@aster-js/async";
import { IDisposable } from "@aster-js/core";

export function on(target: EventTarget, type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): IDisposable {
    target.addEventListener(type, callback, options);
    return IDisposable.create(() => {
        target.removeEventListener(type, callback, options);
    });
}

export async function* each<T extends Event>(target: EventTarget, type: string, options?: AddEventListenerOptions | boolean): AsyncIterableIterator<T> {
    const deferred = new Deferred<T>();

    const buffer: T[] = [];
    const listener = (ev: T) => {
        if (deferred.completed) {
            buffer.push(ev);
        }
        else {
            deferred.resolve(ev);
        }
    };
    target.addEventListener(type, listener as EventListener, options);

    try {
        do {
            yield await deferred;

            deferred.reset();

            const pending = buffer.splice(0);
            yield* pending;
        }
        while (true);
    }
    finally {
        target.removeEventListener(type, listener as EventListener, options);
    }
}
