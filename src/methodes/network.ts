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
    /**
     * not implemented yet
     */
    bodyToBytes?: boolean;
    fetch?: typeof fetch;
}

export const useFetch = async <T = unknown>(url: string, args?: UseFetchArgs): Promise<UseFetchReturn<T>> => {
    const call = args?.fetch || fetch;
    const options: RequestInit = {
        method: args?.method || 'GET',
        headers: args?.headers || {},
        body: args?.body ? JSON.stringify(args.body) : null,
    };

    if (args?.baseUrl) url = args.baseUrl + url;
    if (args?.params) url += `?${new URLSearchParams(args.params).toString()}`;

    try {
        const t1 = performance.now();
        const response = await call(url, { ...options });
        const data = await response.json();
        const t2 = performance.now();

        return { data, error: null, time: t2 - t1 };
    } catch (error: unknown) {
        return {
            data: null,
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
