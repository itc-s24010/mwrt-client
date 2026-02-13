const API_SERVER = process.env.API_SERVER ?? "http://localhost:8000";

if (!API_SERVER) {
    throw new Error("env: API_SERVER が設定されていません。");
}


type RequestOptions<Query extends Record<string, unknown> | undefined, Body, ResponseBody, WrappedBody = ResponseBody> = {
    origin?: string;
    path?: string;
    query?: Query;
    method?: "GET" | "POST";
    body?: Body;
    responseWrap?: (body: ResponseBody) => WrappedBody;
}


type API_Response<ResponseData> = {
    success: boolean;
    data?: ResponseData;
}

export async function API_Request<Query extends Record<string, unknown> | undefined, Body, ResponseBody, WrappedBody>(options: RequestOptions<Query, Body, ResponseBody, WrappedBody> = {}): Promise<API_Response<WrappedBody>> {
    const { origin = API_SERVER, path = '', method = 'GET', query={}, body, responseWrap } = options;
    const url = new URL(path, origin);

    Object.entries(query).forEach( ([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(key, String(value));
        }
    });

    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) fetchOptions.body = JSON.stringify(body);

    return await fetch(url.toString(), fetchOptions).then( async res => (
        res.ok ? {
            success: true,
            data: responseWrap ? responseWrap(await res.json()) : await res.json()
        } : {
            success: false
        }
    )).catch( err => (
        {
            success: false
        }
    ))
    
}