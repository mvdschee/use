export interface UseFetchReturn<T> {
    data: T | null;
    error: Error | null;
    time: number;
}

export interface UseFetchArgs {
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
    headers?: Headers;
    baseUrl?: string;
    body?: Record<string, unknown>;
    params?: Record<string, string>;
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
    } catch (error) {
        return {
            data: null,
            error,
            time: 0,
        };
    }
};
