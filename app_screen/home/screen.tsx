import { DB_Category, DB_Category_ID, DB_Task } from "@/libs/api/_db";
import { API } from "@/libs/api/api";
import { MediaClassName } from "@/libs/client/responsive";
import { MergeClassNames } from "@/libs/CustomAttribute";
import { Calendar } from "@/page_components/app/calendar";
import { TaskForm } from "@/page_components/app/task_form";
import { AppScreen, Screen_Frame } from "@/screen copy/screen_frame";
import { useEffect, useState } from "react";



import styles from "./screen.module.css";
import { Util } from "@/libs/util";
import { TaskSearch_Neo } from "@/page_components/app/task_search_neo";
import { TaskForm_Neo } from "@/page_components/app/task_form copy";
import { Calendar_Neo } from "@/page_components/app/calendar copy";
import { ControllerPopupBox } from "@/page_components/app/popup_controller";
import { UI_Screen_Fill } from "@/page_components/screen/fill";
import { ControlCategoryForm } from "@/page_components/app/control_category_form";
import { UI_Button } from "@/page_components/form/button/button";







type QueryProps = API.Task_List_Query & {
    name?: string;
    /**全期間 */
    showAll?: boolean;
}




type Props = AppScreen & {
    categories: DB_Category[];
    tasks: DB_Task[];
    onAddTask: (task: DB_Task) => void;
    SQ: QueryProps;
    onSelectDate: (date: Date) => void;
    onClickSearch: () => void;
    onChangeMonth: (year: number, month: number) => void;
    onAddCategory: (category: DB_Category) => void;
}

export function Screen_Home({media, categories, tasks, onAddTask, SQ, onSelectDate, onClickSearch, onChangeMonth, onAddCategory, ...props}: Props) {

    const {
        categoryId: SQ_categoryId,
        gte: SQ_gte,
        lte: SQ_lte,
        name: Q_name,
    } = SQ;
    
    // 現在の年月を取得
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);


    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    
    
    // タスクの日付リストを作成（検索結果がある場合はそれを使用、なければ全タスク）
    const totalWorkTime = Util.calculateTotalWorkTime(tasks);

    const category = categories.find(cat => cat.id === SQ_categoryId);
    
    const hasSearchCondition = SQ_categoryId || SQ_gte || SQ_lte || Q_name;
















    const [showTaskForm, setShowTaskForm] = useState(false);

    const { element: CategoryFormElement, controller: CategoryFormController } = ControlCategoryForm({onAddCategory(category) {
        onAddCategory(category);
        CategoryFormController.hide();
    }});
    const { element: TaskFormElement, controller: TaskFormController } = TaskForm_Neo({ categories, onAddTask(task) {
        onAddTask(task);
        setShowTaskForm(false);
    } });







    return (
        <Screen_Frame {...props}>


            <div className={
                MergeClassNames(
                    styles.homeContainer,
                    MediaClassName(media, {
                        mobile: styles.mobile,
                    })
                )
            }>
                <div className={styles.leftPanel}>
                    <div className={styles.calendarContainer}>
                        <Calendar_Neo media={media} year={year} month={month} selectedDate={selectedDate} tasksWithDates={tasks.map(task => task.scheduledStartAt)}
                            onClickSearch={onClickSearch}
                            _onMonthChange={(y, m) => {setYear(y); setMonth(m); onChangeMonth(y, m);}}
                            _onDateClick={(date) => {setSelectedDate(date); TaskFormController.setTaskDate(date);}}
                            _onSelectDate={onSelectDate}
                        >
                            {
                                <div className={styles.toolContainer}>
                                    <UI_Button size="small" _type="primary" onClick={CategoryFormController.show}>+カテゴリー</UI_Button>
                                    {
                                        media === "mobile" &&
                                        <UI_Button size="small" _type="success" onClick={() => setShowTaskForm(true)}>+タスク</UI_Button>
                                    }
                                </div>
                            }
                        </Calendar_Neo>
                    </div>
                    {
                        media === "mobile" && showTaskForm &&
                        <UI_Screen_Fill onClick={() => setShowTaskForm(false)}>
                            <div style={{width: "70vw", display: "flex"}} onClick={(e) => e.stopPropagation()}>
                                {TaskFormElement}
                            </div>
                        </UI_Screen_Fill>
                    }
                </div>
                <div className={styles.rightPanel}>
                    <div className={styles.searchInfo}>
                        <div className={styles.searchInfoTitle}>検索情報</div>
                        {hasSearchCondition ? (
                            <>
                                {Q_name && (
                                    <div className={styles.searchCondition}>
                                        <span className={styles.conditionLabel}>キーワード:</span> {Q_name}
                                    </div>
                                )}
                                {SQ_gte && (
                                    <div className={styles.searchCondition}>
                                        <span className={styles.conditionLabel}>開始日:</span> {Util.toYYYYMMDD(SQ_gte)}
                                    </div>
                                )}
                                {SQ_lte && (
                                    <div className={styles.searchCondition}>
                                        <span className={styles.conditionLabel}>終了日:</span> {Util.toYYYYMMDD(SQ_lte)}
                                    </div>
                                )}
                                {category && (
                                    <div className={styles.searchCondition}>
                                        <span className={styles.conditionLabel}>カテゴリ:</span> {category.name}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={styles.noSearchCondition}>検索条件なし</div>
                        )}
                        <div className={styles.totalWorkTime}>
                            <span className={styles.workTimeLabel}>合計作業時間:</span>
                            <span className={styles.workTimeValue}>{Util.formatTimeText(totalWorkTime)}</span>
                        </div>
                        <div className={styles.taskCount}>
                            <span className={styles.taskCountLabel}>タスク数:</span>
                            <span className={styles.taskCountValue}>{tasks.length}件</span>
                        </div>
                    </div>
                    { media === "mobile" ? null : TaskFormElement }
                </div>
            </div>

            {CategoryFormElement}

                


        </Screen_Frame>
    )
}