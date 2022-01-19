import { assert } from "chai";
import { dom } from "../src";

describe("dom", () => {

    it("Should iterate asynchronously", async function () {
        const el = document.createElement("div");

        setTimeout(() => {
            el.dispatchEvent(new CustomEvent("test", { detail: 1 }));
            el.dispatchEvent(new CustomEvent("test", { detail: 2 }));
            el.dispatchEvent(new CustomEvent("test", { detail: 3 }));
            el.dispatchEvent(new CustomEvent("test", { detail: 4 }));
            el.dispatchEvent(new CustomEvent("test", { detail: 5 }));
        }, 500);

        const result: number[] = [];
        for await (const { detail } of dom.each<CustomEvent<number>>(el, "test")) {
            result.push(detail);
            if (result.length > 3) break;
        }

        assert.deepEqual(result, [1, 2, 3, 4]);
    });
});
