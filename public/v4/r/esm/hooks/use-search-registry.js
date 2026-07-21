import { debounce, parseAsInteger, useQueryState } from "nuqs";
import { useMounted } from "https://cdn.jsdelivr.net/gh/shadcn-ui/ui@latest/apps/v4/public/r/esm/hooks/use-mounted.js";
import globalRegistries from "@/registry/directory.json";
const PAGE_SIZE = 10;
const normalizeQuery = (query) => query.toLowerCase().replaceAll(" ", "").replaceAll("@", "");
function finderFn(registry, query) {
    const normalizedName = normalizeQuery(registry.name);
    const normalizedDecription = normalizeQuery(registry.description);
    const normalizedQuery = normalizeQuery(query);
    return (normalizedName.includes(normalizedQuery) ||
        normalizedDecription.includes(normalizedQuery));
}
const searchDirectory = (query) => {
    if (!query)
        return globalRegistries;
    return globalRegistries.filter((registry) => finderFn(registry, query));
};
export function useSearchRegistry() {
    const mounted = useMounted();
    const [query, setQuery] = useQueryState("q", {
        defaultValue: "",
        limitUrlUpdates: debounce(250),
    });
    const [page, setPage] = useQueryState("page", {
        ...parseAsInteger,
        defaultValue: 1,
        history: "push",
    });
    const currentQuery = mounted ? query : "";
    const currentPageValue = mounted ? page : 1;
    const registries = searchDirectory(currentQuery);
    const totalPages = Math.ceil(registries.length / PAGE_SIZE);
    // Clamp page to valid range.
    const currentPage = Math.max(1, Math.min(currentPageValue, totalPages));
    const paginatedRegistries = registries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    return {
        isLoading: !mounted,
        query: currentQuery,
        setQuery: (value) => {
            setQuery(value);
            setPage(null);
        },
        registries,
        paginatedRegistries,
        page: currentPage,
        totalPages,
        setPage,
    };
}
