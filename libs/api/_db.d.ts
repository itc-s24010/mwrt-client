export type DB_Category_ID = string & { _brand: 'API_Data_Category_ID' };

export type DB_Category = {
    id: DB_Category_ID;
    name: string;
};