import { DB_Memo } from "@/libs/api/_db";
import { API } from "@/libs/api/api";
import { useState } from "react";



import styles from "./index.module.css";
import { UI_Form } from "@/page_components/form";
import { MergeClassNames } from "@/libs/CustomAttribute";
import { UI_Button } from "@/page_components/form/button/button";





type Props = React.HTMLAttributes<HTMLDivElement> & {
    memo: DB_Memo;
    onUpdateMemo: (updatedMemo: DB_Memo) => void;
    onDeleteMemo: () => void;
}

export function Memo({memo, onDeleteMemo, onUpdateMemo, ...props}: Props) {
    const [content, setContent] = useState(memo.content);
    
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    async function updateMemo() {
        if (isUpdating || isDeleting) return;
        setIsUpdating(true);
        const res = await API.API_Request_Memo_Update(memo.id, content);
        if (res.success && res.data) onUpdateMemo(res.data);

        // 更新の表示を1秒間行う
        setTimeout(() => {
            setIsUpdating(false);
        }, 1000);
    }

    async function deleteMemo() {
        if (isUpdating || isDeleting) return;
        if (!confirm("このメモを削除してもよろしいですか？")) return;
        setIsDeleting(true);
        const res = await API.API_Request_Memo_Delete(memo.id);
        if (res.success) {
            // 削除の表示を1秒間行う
            setTimeout(() => {
                setIsDeleting(false);
                onDeleteMemo();
            }, 1000);
        } else {
            alert("メモの削除に失敗しました。");
            setIsDeleting(false);
        }

    }
    
    const canSave = content !== memo.content;
    
    return (
        <div className={styles.container} {...props}>
            {
                isUpdating ? <span className={styles.status}>保存中...</span> :
                isDeleting ? <span className={styles.status}>削除中...</span> :
                <>
                    <div className={styles.head}>
                        <h2 className={styles.title}>{content.split('\n')[0] ??  ""}</h2>
                        <div className={styles.controls}>
                            <UI_Button onClick={updateMemo} disabled={!canSave}>保存</UI_Button>
                            <UI_Button _type="danger" onClick={deleteMemo}>削除</UI_Button>
                        </div>
                    </div>
                    <textarea className={styles.textarea} value={content} onChange={(e) => setContent(e.target.value)} />
                </>
            }
        </div>
    )
}