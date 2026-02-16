'use client';

import { useState } from 'react';
import { UI_Button } from '@/page_components/form/button/button';
import type { DB_Category, DB_Category_ID, DB_Task } from '@/libs/api/endpoint';
import styles from './index.module.css';
import { Gen_Select } from '@/page_components/form/select';
import { Util } from '@/libs/util';
import { API } from '@/libs/api/api';
import { Element_Controller_Response } from '@/type';
import { MergeAttributes } from '@/libs/CustomAttribute';



type Controller = {
    setTaskName(name: string): void;
    setCategory(category: DB_Category_ID): void;
    setTaskDate(date: Date | null): void;
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    categories: DB_Category[];
    onAddTask: (task: DB_Task) => void;
};



export function TaskForm_Neo({ categories, onAddTask, ...props}: Props): Element_Controller_Response<Controller> {

    const [taskName, setTaskName] = useState('');
    const [category, setCategory] = useState<DB_Category_ID | null>(categories[0]?.id ?? null);
    const [taskDate, setTaskDate] = useState<Date | null>();


    const controller: Controller = {
        setTaskName(name) {
            setTaskName(name);
        },
        setCategory(categoryId) {
            setCategory(categoryId);
        },
        setTaskDate(date) {
            setTaskDate(date);
        }
    };

    if (category === null) {
        if (categories.length > 0) setCategory(categories[0].id);
        return {
            element: <div>カテゴリがありません。先にカテゴリを作成してください。</div>,
            controller
        };
    }
    
    



    const element = (
        <div {...MergeAttributes(props, {className: styles.taskFormContainer})} >
            <h2 className={styles.title}>タスク登録</h2>
            <form action={async () => {
                if (!taskDate) return;
                const result = await API.API_Request_Task_Add({
                    name: taskName,
                    categoryId: category,
                    scheduledStartAt: taskDate
                });
                if (result.success && result.data) {
                    onAddTask(result.data);
                    setTaskName('');
                    setCategory(categories[0]?.id ?? null);
                    setTaskDate(null);
                }
            }}>
                <div className={styles.formGroup}>
                    <label htmlFor="task_name" className={styles.label}>
                        タスク名 <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        id="task_name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        maxLength={100}
                        required
                        className={styles.input}
                        placeholder="タスク名を入力"
                    />
                    <span className={styles.charCount}>{taskName.length}/100</span>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>
                        カテゴリ
                    </label>
                    <Gen_Select
                        className={styles.select}
                        options={
                            categories.map(category => (
                                { value: category.id, label: category.name }
                            ))
                        }
                        value={category}
                        _onChange={(value) => setCategory(value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="task_date" className={styles.label}>
                        予定日時 <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="datetime-local"
                        id="task_date"
                        value={taskDate ? Util.toYYYYMMDD_HHMM(taskDate) : ''}
                        onChange={(e) => setTaskDate(new Date(e.target.value))}
                        required
                        className={styles.input}
                        onClick={(e) => e.currentTarget.showPicker()}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <UI_Button size="extraLarge" _type="primary" className={styles.submitButton} type="submit">
                        登録
                    </UI_Button>
                </div>
            </form>
        </div>
    );




    return { element, controller };
}
