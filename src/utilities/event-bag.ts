import { DisposableHost, IDisposable } from "@aster-js/core";
import { on } from "./events";

/** Manage events for a specific target. Very usefull for component event management */
export class EventBag extends DisposableHost {
    private readonly _events: IDisposable[] = [];

    get size(): number { return this._events.length; }

    constructor(
        private readonly _target: EventTarget
    ) {
        super();
    }

    add<T extends Event>(type: string, callback: (evt: T) => void, options?: AddEventListenerOptions | boolean): this;
    add(type: string, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): this;
    add(type: string, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean): this {
        this._events.push(
            on(this._target, type, callback, options)
        );
        return this;
    }

    clear(): void {
        IDisposable.safeDisposeAll(
            this._events.splice(0)
        );
    }

    protected dispose(): void {
        this.clear();
    }
}
