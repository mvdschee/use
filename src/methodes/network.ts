// --------------------------------------------------
// NETWORK METHODES
// --------------------------------------------------
// Includes:
// useFetch
// useSWR

interface UseFetchReturn<T> {
    /**
     * The raw response of the fetch response
     */
    data: T | null;
    /**
     * Any fetch errors that may have occurred
     */
    error: Error | null;
    /**
     * Any fetch errors that may have occurred
     */
    headers: Record<string, string>;
    /**
     * The time the fetch took to complete
     */
    time: number;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

interface UseFetchArgs {
    method?: HttpMethod;
    headers?: HeadersInit;
    baseUrl?: string;
    body?: Record<string, unknown>;
    params?: Record<string, string>;
    blob?: boolean;
}

export const useFetch = async <T = unknown>(url: string, args?: UseFetchArgs): Promise<UseFetchReturn<T>> => {
    const options: RequestInit = {
        method: args?.method || 'GET',
        headers: args?.headers || {},
        body: args?.body ? JSON.stringify(args.body) : null,
    };

    const headers: Record<string, string> = {};
    const getBlob = args ? !!args.blob : false;

    if (args?.baseUrl) url = args.baseUrl + url;
    if (args?.params) url += `?${new URLSearchParams(args.params).toString()}`;

    try {
        const t1 = performance.now();
        const response = await fetch(url, { ...options });
        const data = getBlob ? await response.blob() : await response.json();

        for (const [key, value] of response.headers.entries()) {
            headers[key] = value;
        }
        const t2 = performance.now();

        return { data, error: null, headers, time: t2 - t1 };
    } catch (error: unknown) {
        return {
            data: null,
            headers,
            error: error as Error,
            time: 0,
        };
    }
};

const cache = new Map();
export const useSWR = async <T = unknown>(
    key: string,
    refresh: (lastValue?: unknown) => Promise<unknown>,
    staleAfter = 600_000
): Promise<T> => {
    const data = cache.get(key) || { ts: 0, val: null, promise: null };

    // Item is stale, start refreshing in the background
    if (!data.promise && Date.now() - data.ts > staleAfter) {
        data.promise = refresh(data.val);

        try {
            data.ts = Date.now();
            data.val = await data.promise;
        } catch (e: unknown) {
            throw new Error(e as any);
        } finally {
            data.promise = null;
        }
    }

    cache.set(key, data);
    // No data yet, wait for the refresh to finish
    if (data.promise && !data.ts) await data.promise;
    return data.val;
};
