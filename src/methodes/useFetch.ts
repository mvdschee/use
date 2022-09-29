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
    headers?: Record<string, string>;
    baseUrl?: string;
    body?: Record<string, unknown>;
    params?: Record<string, string>;
    /**
     * not implemented yet
     */
    bodyToBytes?: boolean;
}

export const useFetch = async <T>(url: string, args?: UseFetchArgs): Promise<UseFetchReturn<T>> => {
    const options: RequestInit = {
        method: args?.method || 'GET',
        headers: args?.headers || {},
        body: args?.body ? JSON.stringify(args.body) : null,
    };

    if (args?.baseUrl) url = args.baseUrl + url;
    if (args?.params) url += `?${new URLSearchParams(args.params).toString()}`;

    try {
        const t1 = performance.now();
        const response = await fetch(url, { ...options });
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
