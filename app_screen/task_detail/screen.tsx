import { DB_Memo, DB_Memo_ID, DB_Task, DB_Task_ID } from "@/libs/api/_db";
import { API } from "@/libs/api/api";
import { Controll_APP_Loading } from "@/page_components/app/control_loading";
import { Memo } from "@/page_components/app/memo";
import { AppScreen, Screen_Frame } from "@/screen copy/screen_frame";
import { useEffect, useState } from "react";

import styles from "./screen.module.css";
import { UI_Button } from "@/page_components/form/button/button";
import { TaskCard } from "@/page_components/app/taskCard";



type Props = AppScreen & {
    task: DB_Task;
    onUpdatedTask: (updatedTask: DB_Task) => void;
    onDeleteTask: (taskId: DB_Task_ID) => void;
}


export function Screen_Task_Detail({task, onUpdatedTask, onDeleteTask, ...props}: Props) {
    console.log(task)
    
    const { element: loadingElement, controller: loadingController} = Controll_APP_Loading({});

    const [memos, setMemos] = useState<DB_Memo[]>([]);


    useEffect(() => {
        API.API_Request_Memo_List({
            taskId: task.id
        }).then((res) => {
            if (res.success) setMemos(res.data ?? []);
            loadingController.hide(true);

        })
    }, []);
    
    
    const createMemo = async () => {
        const res = await API.API_Request_Memo_Add({
            taskId: task.id,
            content: ""
        });
        if (res.success && res.data) setMemos((prevMemos) => [...prevMemos, res.data!]);
    }


    return (
        <Screen_Frame {...props}>
            <div className={styles.container}>
                <div className={styles.taskInfo}>
                    <TaskCard data={task} _canEdit={true}
                        _isMobile={props.media === "mobile"}
                        onUpdate={(updatedTask) => {onUpdatedTask(updatedTask);}}
                        onDelete={(id) => {onDeleteTask(id); props._onClickBackward?.();}}
                    />
                </div>
                <div className={styles.memoContainer}>
                    <div className={styles.memoHeader}>
                        <h3 className={styles.title}>メモ</h3>
                        <UI_Button size="large" onClick={createMemo}>
                            新規作成
                        </UI_Button>
                    </div>
                    <div className={styles.memoList}>
                        {
                            memos.map((memo) => (
                                <Memo key={memo.id} memo={memo} onUpdateMemo={(updatedMemo) => {
                                    setMemos((prevMemos) => prevMemos.map((m) => m.id === updatedMemo.id ? updatedMemo : m));
                                }} onDeleteMemo={() => {
                                    setMemos((prevMemos) => prevMemos.filter((m) => m.id !== memo.id));
                                }} />
                            ))
                        }
                    </div>
                </div>
            </div>
            
            
            {loadingElement}
        </Screen_Frame>
    )



}