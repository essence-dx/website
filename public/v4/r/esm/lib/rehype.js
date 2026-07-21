import fs from "fs";
import path from "path";
import { ExamplesIndex } from "@/examples/__index__";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import { formatCode } from "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/lib/format-code.js";
import { Index as StylesIndex } from "@/registry/__index__";
import { getActiveStyle } from "@/registry/_legacy-styles";
import { BASES } from "@/registry/bases";
import { Index as BasesIndex } from "@/registry/bases/__index__";
export { formatCode } from "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/lib/format-code.js";
function getBaseForStyle(styleName) {
    for (const base of BASES) {
        if (styleName.startsWith(`${base.name}-`)) {
            return base.name;
        }
    }
    return null;
}
function getDemoFilePath(name, styleName) {
    const base = getBaseForStyle(styleName);
    const demo = ExamplesIndex[styleName]?.[name] ??
        (base ? ExamplesIndex[base]?.[name] : undefined);
    if (!demo)
        return null;
    return demo.filePath;
}
function getRegistryEntry(name, styleName) {
    const base = getBaseForStyle(styleName);
    return (StylesIndex[styleName]?.[name] ??
        (base ? BasesIndex[base]?.[name] : undefined));
}
export function rehypeComponent() {
    return async (tree) => {
        const activeStyle = await getActiveStyle();
        const nodesToProcess = [];
        visit(tree, (node) => {
            const { value: srcPath } = getNodeAttributeByName(node, "src") || {};
            if (node.name === "ComponentSource") {
                const name = getNodeAttributeByName(node, "name")?.value;
                const fileName = getNodeAttributeByName(node, "fileName")?.value;
                const styleName = getNodeAttributeByName(node, "styleName")?.value ||
                    activeStyle.name;
                if (name || srcPath) {
                    nodesToProcess.push({
                        node,
                        type: "ComponentSource",
                        name,
                        styleName,
                        fileName,
                        srcPath,
                    });
                }
            }
            if (node.name === "ComponentPreview") {
                const name = getNodeAttributeByName(node, "name")?.value;
                const styleName = getNodeAttributeByName(node, "styleName")?.value ||
                    activeStyle.name;
                const hideCode = isTruthyMdxAttribute(getNodeAttributeByName(node, "hideCode"));
                if (name) {
                    nodesToProcess.push({
                        node,
                        type: "ComponentPreview",
                        name,
                        styleName,
                        hideCode,
                    });
                }
            }
        });
        await Promise.all(nodesToProcess.map(async (item) => {
            try {
                if (item.type === "ComponentPreview" && item.hideCode) {
                    return;
                }
                let src = null;
                if (item.srcPath) {
                    src = path.join(process.cwd(), item.srcPath);
                }
                else {
                    src = getDemoFilePath(item.name, item.styleName);
                    if (!src) {
                        const component = getRegistryEntry(item.name, item.styleName);
                        if (!component?.files) {
                            return;
                        }
                        if (item.type === "ComponentSource" && item.fileName) {
                            src =
                                component.files.find((file) => {
                                    if (typeof file === "string") {
                                        return (file.endsWith(`${item.fileName}.tsx`) ||
                                            file.endsWith(`${item.fileName}.ts`));
                                    }
                                    return false;
                                }) || component.files[0]?.path;
                        }
                        else {
                            src = component.files[0]?.path;
                        }
                    }
                }
                if (!src) {
                    return;
                }
                const raw = fs.readFileSync(path.join(process.cwd(), src), "utf8");
                const source = await formatCode(raw, item.styleName);
                item.node.children?.push(u("element", {
                    tagName: "pre",
                    properties: {
                        __src__: src,
                    },
                    children: [
                        u("element", {
                            tagName: "code",
                            properties: {
                                className: ["language-tsx"],
                            },
                            children: [
                                {
                                    type: "text",
                                    value: source,
                                },
                            ],
                        }),
                    ],
                }));
            }
            catch (error) {
                console.error(error);
            }
        }));
    };
}
function getNodeAttributeByName(node, name) {
    return node.attributes?.find((attribute) => attribute.name === name);
}
function isTruthyMdxAttribute(attribute) {
    if (!attribute)
        return false;
    if (!("value" in attribute))
        return true;
    const { value } = attribute;
    if (value === undefined || value === null)
        return true;
    if (typeof value === "boolean")
        return value;
    if (typeof value === "string")
        return value !== "false";
    return Boolean(value);
}
