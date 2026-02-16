import { DB_Category } from "@/libs/api/_db";
import { API } from "@/libs/api/api";
import { UI_Form } from "@/page_components/form";
import { useState } from "react";

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
    onAddCategory(category: DB_Category): void;
}


export function CategoryForm({ onAddCategory, ...props}: Props) {
    const [categoryName, setCategoryName] = useState('');
    
    
    return (
        <UI_Form action={async () => {
            if (categoryName.trim() === '') return;

            const res = await API.API_Request_Category_Add(categoryName);
            if (res.success && res.data) {
                onAddCategory(res.data);
                setCategoryName('');
            }
        }} {...props}>
            <h2>カテゴリーを追加</h2>
            <input type="text" placeholder="カテゴリー名" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
            <button type="submit">追加</button>
        </UI_Form>
    );
}