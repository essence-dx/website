import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useMounted } from "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/hooks/use-mounted.js";
const colorsAtom = atomWithStorage("colors", {
    format: "hsl",
    lastCopied: "",
});
export function useColors() {
    const [colors, setColors] = useAtom(colorsAtom);
    const mounted = useMounted();
    return {
        isLoading: !mounted,
        format: colors.format,
        lastCopied: colors.lastCopied,
        setFormat: (format) => setColors({ ...colors, format }),
        setLastCopied: (lastCopied) => setColors({ ...colors, lastCopied }),
    };
}
