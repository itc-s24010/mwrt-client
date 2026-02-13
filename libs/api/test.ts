import { API } from "./api";

API.API_Request_Task_Add(
    {
        name: "テストタスク",
        categoryId: "dba6cd2e-7779-4ac9-be98-4e9da54727cc" as API.DB_Category_ID,
        scheduledStartAt: new Date(),
    }
).then( res => {
    console.log(res);
});