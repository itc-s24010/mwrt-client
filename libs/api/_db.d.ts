export type DB_Category_ID = string & { _brand: 'API_Data_Category_ID' };

export type DB_Category<tasks extends boolean = false> = {
    id: DB_Category_ID;
    name: string;
    tasks: tasks extends true ? DB_Task[] : null;
};

export type DB_Task_ID = string & { _brand: 'API_Data_Task_ID' };

export type DB_Task_Raw<memos extends boolean = false> = {
    id: DB_Task_ID;
    name: string;
    createdAt: string;
    updatedAt: string;
    scheduledStartAt: string;
    startedAt: string | null;
    endedAt: string | null;
    memos: memos extends true ? DB_Memo_Raw[] : null;
    categoryId: DB_Category_ID;
    category: DB_Category;
};


export type DB_Task<memos extends boolean = false> = {
    id: DB_Task_ID;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    scheduledStartAt: Date;
    startedAt: Date | null;
    endedAt: Date | null;
    memos: memos extends true ? DB_Memo[] : null;
    categoryId: DB_Category_ID;
    category: DB_Category;
};


export type DB_Memo_ID = string & { _brand: 'API_Data_Memo_ID' };


export type DB_Memo_Raw = {
    id: DB_Memo_ID;
    taskId: DB_Task_ID;
    content: string;
    createdAt: string;
    updatedAt: string;
};


export type DB_Memo = {
    id: DB_Memo_ID;
    taskId: DB_Task_ID;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};