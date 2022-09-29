import { UseFetchReturn, UseFetchArgs } from './types.ts';

export const useFetch = async <T>(url: string, args: UseFetchArgs): Promise<UseFetchReturn<T>> => {
    const options: RequestInit = {
        method: args.method,
        headers: args.headers,
        body: args.body ? JSON.stringify(args.body) : null,
    };

    if (args.baseUrl) url = args.baseUrl + url;
    if (args.params) url += `?${new URLSearchParams(args.params).toString()}`;

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
