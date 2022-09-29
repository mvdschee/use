export interface UseFetchReturn<T> {
    data: T | null;
    error: Error | null;
    time: number;
}

export interface UseFetchArgs {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    headers: Headers;
    baseUrl: string;
    body: Record<string, unknown>;
    params: Record<string, string>;
    bodyToBytes?: boolean;
}
