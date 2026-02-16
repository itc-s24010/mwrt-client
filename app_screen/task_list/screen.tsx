import { DB_Task, DB_Task_ID } from "@/libs/api/_db";
import { AppScreen, Screen_Frame } from "@/screen copy/screen_frame";

import styles from "./screen.module.css";
import { useState } from "react";
import { ScreenMap } from "@/screen copy/screen";
import { TaskCard } from "@/page_components/app/taskCard";
import { Screen_Task_Detail } from "../task_detail/screen";


type Props = AppScreen & {
    date: Date;
    tasks: DB_Task[];
    onUpdatedTask: (updatedTask: DB_Task) => void;
    onDeletedTask: (taskId: DB_Task_ID) => void;
}

type ScreenIDs = "list" | "detail";


export function Screen_Task_List({date, tasks, onUpdatedTask, onDeletedTask: onDeleteTask, ...props}: Props) {
    console.log(tasks)


    const [screen, setScreen] = useState<ScreenIDs>("list");
    const [selectedTask, setSelectedTask] = useState<DB_Task | null>(null);
    


    function navigateScreen(screenId: ScreenIDs) {
        if (screenId === "detail" && !selectedTask) return;
        setScreen(screenId);
    }
    
    
    const ScreenMap: ScreenMap<ScreenIDs> = {
        "list": () => 
        <Screen_Frame {...props} >
            <div className={styles.container}>
                <h2 className={styles.title}>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日のタスク</h2>

                <div className={styles.taskList}>
                    {
                        tasks.map((task) => (
                            <TaskCard key={task.id} data={task} onClick={() => {setSelectedTask(task); navigateScreen("detail");}} onDelete={onDeleteTask} 
                                onUpdate={onUpdatedTask}
                            />
                        ))
                    }
                </div>
            </div>
        </Screen_Frame>,

        "detail": () => <Screen_Task_Detail media={props.media} task={selectedTask!} _onClickBackward={() => setScreen("list")} onDeleteTask={onDeleteTask} onUpdatedTask={onUpdatedTask}/>
        
    };
    
    


    return ScreenMap[screen]();
}