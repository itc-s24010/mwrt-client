import { DB_Task, DB_Task_ID } from "@/libs/api/_db"
import styles from "./index.module.css"
import { MergeAttributes } from "@/libs/CustomAttribute";
import { API } from "@/libs/api/api";
import { UI_Button } from "@/page_components/form/button/button";
import { Timer_Neo } from "../timer copy";
import { useEffect, useState } from "react";
import { UI_Form } from "@/page_components/form";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    data: DB_Task;
    onUpdate: (updatedTask: DB_Task) => void;
    onDelete?: (taskId: DB_Task_ID) => void;
    _canEdit?: boolean;
    _isMobile?: boolean;
}

export function TaskCard({ data, onUpdate, onDelete, _canEdit=false, _isMobile, ...props }: Props) {
    const [name, setName] = useState(data.name);
    const [category, setCategory] = useState(data.category);
    const [startedAt, setStartedAt] = useState(data.startedAt);
    const [endedAt, setEndedAt] = useState(data.endedAt);
    const [isUpdating, setIsUpdating] = useState(false);


    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // カードのクリックイベントを伝播させない
        if (confirm(`「${data.name}」を削除しますか？この操作は取り消せません。`)) {
            API.API_Request_Task_Delete(data.id).then((res) => {
                if (res.success) {
                    alert("タスクを削除しました。");
                    onDelete?.(data.id);
                } else {
                    alert("タスクの削除に失敗しました。");
                }
            });
        }
    };

    const updateTask = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        const res = await API.API_Request_Task_Update(data.id, {
            name,
            categoryId: data.category.id,
            startedAt,
            endedAt,
        });
        if (res.success && res.data) {
            onUpdate(res.data);
        }
        setIsUpdating(false);
    }

    useEffect(() => {
        if (!startedAt || !endedAt) return;
        if (startedAt > endedAt) {
            alert("開始時間は終了時間より前に設定してください。");
            setEndedAt(startedAt);
        } else {
            updateTask();
        }
    }, [startedAt, endedAt]);
    


    const isStarted = !!data.startedAt;
    const isEnded = !!data.endedAt;
    const startOffset = data.startedAt ? Date.now() - data.startedAt.getTime() : 0;


    const canSave = name.trim() !== "" && (name !== data.name || category.id !== data.category.id);
    
    return (
        <UI_Form {...MergeAttributes(props, {
            className: `${styles.container} ${_isMobile ? styles.mobile : ""}`
        })} action={() => {}}>
            <div className={`${styles.header} ${_isMobile ? styles.mobile : ""}`}>
                <input className={styles.taskName} type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!_canEdit || isUpdating} />
                {
                    _canEdit &&
                    <span className={styles.controls}>
                        <UI_Button size="medium" onClick={updateTask} disabled={!_canEdit || isUpdating || !canSave}>保存</UI_Button>
                        <UI_Button size="medium" _type="danger" onClick={handleDelete}>削除</UI_Button>
                    </span>
                }
            </div>
            <div className={`${styles.taskInfo} ${_isMobile ? styles.mobile : ""}`}>

                {
                    isUpdating ?
                    <span className={styles.updating}>更新中...</span> :

                    <>
                        <div>
                            <p className={styles.category}>
                                <span className={styles.label}>カテゴリ:</span> {data.category.name}
                            </p>
                            <p className={styles.date}>
                                <span className={styles.label}>予定開始:</span> {data.scheduledStartAt.toLocaleString('ja-JP')}
                            </p>
                            {data.startedAt && (
                                <p className={styles.date}>
                                    <span className={styles.label}>実際の開始:</span> {data.startedAt.toLocaleString('ja-JP')}
                                </p>
                            )}
                            {data.endedAt && (
                                <p className={styles.date}>
                                    <span className={styles.label}>終了:</span> {data.endedAt.toLocaleString('ja-JP')}
                                </p>
                            )}
                            <p className={styles.date}>
                                <span className={styles.label}>作成日:</span> {data.createdAt.toLocaleString('ja-JP')}
                            </p>
                        </div>
                        {
                            _canEdit &&
                            <div>
                                <Timer_Neo
                                    onClick={(ev) => ev.stopPropagation()}
                                    offsetms={startOffset}
                                    isStarted={isStarted && !isEnded}
                                    canReset={!isStarted}
                                    onStart={() => {
                                        setStartedAt(new Date());
                                    }}
                                    onStop={() => {
                                        setEndedAt(new Date());
                                    }}
                                />
                            </div>
                        }
                        <div className={styles.spacer}></div>
                    </>
                }
            </div>
        </UI_Form>
    )
}