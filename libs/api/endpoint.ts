import { API_Request } from "./base";
import type { DB_Category, DB_Category_ID, DB_Memo, DB_Memo_ID, DB_Memo_Raw, DB_Task, DB_Task_ID, DB_Task_Raw } from "./_db";


export type * from "./_db";






export type API_Response_Category = DB_Category[];


/**
 * カテゴリー一覧取得
 * @returns 
 */
export const API_Request_Category_List = () => API_Request<undefined, undefined, DB_Category[], DB_Category[]>({method: "GET", path: "/category"});



export const API_Request_Category_Add = (name: string) => API_Request<undefined, {name: string}, DB_Category, DB_Category>(
    {
        method: "POST",
        path: "/category",
        body: {name},
    }
);















export type Task_List_Query = {
    /**
     * カテゴリーIDで絞り込み
     */
    categoryId?: DB_Category_ID;
    /**
     * 開始日時がこの日時以降のタスクを取得
     */
    gte?: Date;
    /**
     * 開始日時がこの日時以前のタスクを取得
     */
    lte?: Date;
}

/**
 * タスク一覧取得
 * @param query 
 * @returns 
 */
export const API_Request_Task_List = (query?: Task_List_Query) => API_Request<Task_List_Query, Task_List_Query, DB_Task_Raw[], DB_Task[]>(
    {
        method: query ? "POST" : "GET",
        path: query ? "/task/query" : "/task",
        body: query,
        responseWrap(body) {
            const tasks: DB_Task[] = body.map(RawTask_toFormattedData);
            return tasks;
        }
    }
);




/**
 * タスク詳細取得
 * @param taskId 
 * @returns 
 */
export const API_Request_Task_Detail = (taskId: DB_Task_ID) => API_Request<undefined, undefined, DB_Task_Raw<true>, DB_Task<true>>(
    {
        method: "GET",
        path: `/task/${taskId}`,
        responseWrap: RawTask_toFormattedData_Detail
    }
)





type Task_Add_Body = {
    name: string;
    categoryId: DB_Category_ID;
    scheduledStartAt: Date;
}

/**
 * タスク追加
 * @param data 
 * @returns 
 */
export const API_Request_Task_Add = (data: Task_Add_Body) => API_Request<undefined, toJson<Task_Add_Body>, DB_Task_Raw, DB_Task>(
    {
        method: "POST",
        path: "/task",
        body: JSON.parse(JSON.stringify(data)),
        responseWrap: RawTask_toFormattedData
    }
);


/**
 * タスク削除
 * @param taskId 
 * @returns 
 */
export const API_Request_Task_Delete = (taskId: DB_Task_ID) => API_Request<undefined, undefined, void, void>(
    {
        method: "DELETE",
        path: `/task/${taskId}`,
        responseWrap: () => undefined
    }
);



type Task_Update_Body = {
    name?: string;
    categoryId?: DB_Category_ID;
    startedAt?: Date | null;
    endedAt?: Date | null;
}
export const API_Request_Task_Update = (taskId: DB_Task_ID, data: Task_Update_Body) => API_Request<undefined, toJson<Task_Update_Body>, DB_Task_Raw, DB_Task>(
    {
        method: "PUT",
        path: `/task/${taskId}`,
        body: JSON.parse(JSON.stringify(data)),
        responseWrap: RawTask_toFormattedData
    }
);



type Memo_List_Query = {
    /**
     * タスクIDで絞り込み
     */
    taskId?: DB_Task_ID;
}
export const API_Request_Memo_List = (query?: Memo_List_Query) => API_Request<Memo_List_Query, undefined, DB_Memo_Raw[], DB_Memo[]>(
    {
        method: "GET",
        path: "/memo",
        query
    }
);



type Memo_Add_Body = {
    taskId: DB_Task_ID;
    content: string;
}
export const API_Request_Memo_Add = (data: Memo_Add_Body) => API_Request<undefined, toJson<Memo_Add_Body>, DB_Memo_Raw, DB_Memo>(
    {
        method: "POST",
        path: "/memo/add",
        body: JSON.parse(JSON.stringify(data)),
        responseWrap: RawMemo_toFormattedData
    }
);


export const API_Request_Memo_Update = (memoId: DB_Memo_ID, content: string) => API_Request<undefined, {content: string}, DB_Memo_Raw, DB_Memo>(
    {
        method: "PUT",
        path: `/memo/${memoId}`,
        body: {content},
        responseWrap: RawMemo_toFormattedData
    }
);



export const API_Request_Memo_Delete = (memoId: DB_Memo_ID) => API_Request<undefined, undefined, void, void>(
    {
        method: "DELETE",
        path: `/memo/${memoId}`
    }
);



















type toJson<T extends object> = {
    [K in keyof T]: string;
}



function RawTask_toFormattedData(raw: DB_Task_Raw): DB_Task {
    return {
        ...raw,
        createdAt: new Date(raw.createdAt),
        updatedAt: new Date(raw.updatedAt),
        scheduledStartAt: new Date(raw.scheduledStartAt),
        startedAt: raw.startedAt ? new Date(raw.startedAt) : null,
        endedAt: raw.endedAt ? new Date(raw.endedAt) : null,
        category: raw.category
    };
}

function RawTask_toFormattedData_Detail(raw: DB_Task_Raw<true>): DB_Task<true> {
    return {
        ...raw,
        createdAt: new Date(raw.createdAt),
        updatedAt: new Date(raw.updatedAt),
        scheduledStartAt: new Date(raw.scheduledStartAt),
        startedAt: raw.startedAt ? new Date(raw.startedAt) : null,
        endedAt: raw.endedAt ? new Date(raw.endedAt) : null,
        category: raw.category,
        memos: raw.memos.map( RawMemo_toFormattedData ),
    };
}




function RawMemo_toFormattedData(raw: DB_Memo_Raw): DB_Memo {
    return {
        ...raw,
        createdAt: new Date(raw.createdAt),
        updatedAt: new Date(raw.updatedAt),
    };
}

