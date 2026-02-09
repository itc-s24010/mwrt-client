import { API_Request } from "./_base";
import { DB_Category } from "./_db";

export type API_Response_Category = DB_Category[];


export const API_Request_Category = () => API_Request<API_Response_Category, undefined>({method: "GET", path: "/category/list"});