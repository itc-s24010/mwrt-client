const API_SERVER = process.env.API_SERVER;

if (!API_SERVER) {
    throw new Error("env: API_SERVER が設定されていません。");
}


type RequestOptions<Body> = {
    origin?: string;
    path?: string;
    method?: "GET" | "POST";
    body?: Body;
}


type API_Response<ResponseData> = {
    success: boolean;
    data?: ResponseData;
}

export async function API_Request<ResponseData, Body = undefined>(options: RequestOptions<Body> = {}): Promise<API_Response<ResponseData>> {
    const { origin = API_SERVER, path = '', method = 'GET', body } = options;
    const url = new URL(path, origin);
    console.log("API_Request URL:", url.toString());

    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    return await fetch(url.toString(), fetchOptions).then( async res => (
        res.ok ? {
            success: true,
            data: await res.json() as ResponseData
        } : {
            success: false
        }
    )).catch( err => (
        {
            success: false
        }
    ))
    
}