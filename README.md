# @aster-js/dom

In its current state, just a serie of basic helpers.


## Dom Elements Positions

```ts
import { isOver, isVisible } from "@aster-js/dom/utilities";

const el = document.getElementById("my-element");

/* Check if the element is on screen */
if(isVisible(el)) {
    //
}

/* Check if the coordinate are in the element bounds */
if(isInBounds(el, 30, 30)) {
    //
}
```

## Dom Elements Events

### Disposable event listener
This will essentially helps to work with disposable and manage the same way every dependency removal.
```ts
import { dom } from "@aster-js/dom";

const el = document.getElementById("my-element");

const clickListener = dom.on(el, "hug", ()=> console.warn("Hugging.."));

/* ... later, to remove the listener ...*/

/* The following import is not required but its more safe to use it */
import { IDisposable } from "@aster-js/core";

IDisposable.safeDispose(clickListener);
```

### AsyncIterable for events
This will help to pipe events into async iterable various helpers...
```ts
const result: any[] = [];
for await (const { detail } of dom.each<CustomEvent>(el, "hug")) {
    result.push(detail);
    if (result.length >= 3) break;
}
// Get the last 3 hugs :)
```
