import { defineMdastPlugin } from "satteri";
import { LatexToMathML } from "math-core";

const converter = new LatexToMathML({
    macros: new Map([
        ["dd", "\\mathrm{d}"],
    ]),
});

const DEBUG = true;
function log(...args) {
    if (DEBUG) console.log("[math-plugin]", ...args);
}

function renderMath(node, isDisplay) {
    const latex = node.value;

    let mathmlString;
    try {
        mathmlString = converter.convert_with_local_counter(latex, isDisplay);
    } catch (err) {
        console.error("[math-plugin] math-core rendering failed", err);
        return undefined;
    }

    return { type: "html", value: mathmlString };
}

export const mathRenderPlugin = defineMdastPlugin({
    name: "math-core-render",
    math(node, ctx) {
        return renderMath(node, true);
    },
    inlineMath(node, ctx) {
        return renderMath(node, false);
    },
});
