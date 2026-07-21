import { promises as fsPromises } from "fs";
import path from "path";
import { createStyleMap, transformIcons, transformMenu, transformRender, transformStyle, } from "shadcn/utils";
import { Project, ScriptKind } from "ts-morph";
import { BASES } from "@/registry/bases";
function getStyleFromStyleName(styleName) {
    const parts = styleName.split("-");
    return parts.length > 1 ? parts.slice(1).join("-") : styleName;
}
function buildDisplayConfig(styleName) {
    return {
        $schema: "https://ui.shadcn.com/schema.json",
        style: styleName,
        rsc: true,
        tsx: true,
        tailwind: {
            config: "",
            css: "",
            baseColor: "neutral",
            cssVariables: true,
            prefix: "",
        },
        iconLibrary: "lucide",
        aliases: {
            components: "@/components",
            utils: "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/lib/utils.js",
            ui: "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/components/ui.js",
            lib: "@/lib",
            hooks: "@/hooks",
        },
        resolvedPaths: {
            cwd: "/",
            tailwindConfig: "",
            tailwindCss: "",
            utils: "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/lib/utils.js",
            components: "@/components",
            lib: "@/lib",
            hooks: "@/hooks",
            ui: "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/components/ui.js",
        },
    };
}
const styleMapCache = new Map();
async function getStyleMap(styleName) {
    const style = getStyleFromStyleName(styleName);
    if (styleMapCache.has(style)) {
        return styleMapCache.get(style);
    }
    try {
        const cssPath = path.join(process.cwd(), `registry/styles/style-${style}.css`);
        const css = await fsPromises.readFile(cssPath, "utf-8");
        const styleMap = createStyleMap(css);
        styleMapCache.set(style, styleMap);
        return styleMap;
    }
    catch {
        return {};
    }
}
export async function formatCode(code, styleName) {
    code = code.replaceAll(`@/registry/${styleName}/`, "@/components/");
    // Always rewrite the legacy tree so src-based sources render clean imports
    // regardless of the styleName in play.
    code = code.replaceAll("@/registry/new-york-v4/", "@/components/");
    for (const base of BASES) {
        code = code.replaceAll(`@/registry/bases/${base.name}/`, "@/components/");
        code = code.replaceAll(`@/examples/${base.name}/ui-rtl/`, "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/components/ui.js/");
        code = code.replaceAll(`@/examples/${base.name}/ui/`, "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/components/ui.js/");
        code = code.replaceAll(`@/examples/${base.name}/lib/`, "@/lib/");
        code = code.replaceAll(`@/examples/${base.name}/hooks/`, "@/hooks/");
    }
    code = code.replace(/@\/styles\/([\w-]+)\/(ui-rtl|ui)\/([\w-]+)/g, (match, _styleName, type, component) => {
        if (type === "ui" || type === "ui-rtl") {
            return `https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/components/ui.js/${component}`;
        }
        return match;
    });
    code = code.replaceAll("export default", "export");
    try {
        const styleMap = await getStyleMap(styleName);
        const transformed = await transformStyle(code, { styleMap });
        const config = buildDisplayConfig(styleName);
        const project = new Project({ compilerOptions: {} });
        const sourceFile = project.createSourceFile("component.tsx", transformed, {
            scriptKind: ScriptKind.TSX,
        });
        const transformers = [
            transformIcons,
            transformMenu,
            transformRender,
        ];
        for (const transformer of transformers) {
            await transformer({
                filename: "component.tsx",
                raw: transformed,
                sourceFile,
                config,
            });
        }
        return sourceFile.getText();
    }
    catch (error) {
        console.error("Transform failed:", error);
        return code;
    }
}
