import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
const configAtom = atomWithStorage("config", {
    style: "new-york-v4",
    packageManager: "pnpm",
    installationType: "cli",
});
export function useConfig() {
    return useAtom(configAtom);
}
