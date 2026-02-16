'use client';

import styles from './index.module.css';
import { AppScreen, Screen_Frame } from '@/screen copy/screen_frame';
import { MergeClassNames } from '@/libs/CustomAttribute';
import { MediaClassName } from '@/libs/client/responsive';
import { CustomEvent_DoubleTap, CustomEvent_LongTap, CustomEvent_Swipe } from '@/libs/client/event/customEvent';



type Props = AppScreen & {
    year: number;
    month: number;
    selectedDate?: Date | null;
    _onDateClick?: (date: Date) => void;
    _onSelectDate?: (date: Date) => void;
    _onMonthChange?: (year: number, month: number) => void;
    tasksWithDates: Date[];
    onClickSearch: () => void;
}



export function Calendar_Neo({media, year, month, selectedDate, _onDateClick, _onSelectDate, _onMonthChange, tasksWithDates, onClickSearch, children, ...props}: Props) {
    // 月の最初の日と最終日を取得
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    // 月の最初の日の曜日（0: 日曜日）
    const firstDayOfWeek = firstDay.getDay();
    
    // 月の日数
    const daysInMonth = lastDay.getDate();
    
    // カレンダーの日付配列を作成
    const days = [];
    
    // 最初の週の空白
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
    }
    
    // 日付を追加
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }
    
    // 週ごとにグループ化
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    function DaytoDate(day: number): Date {
        return new Date(year, month - 1, day);
    }

    const isSelected = (day: number | null) => {
        if (!day || !selectedDate) return false;
        const dayDate = new Date(year, month - 1, day);
        return dayDate.toDateString() === selectedDate.toDateString();
    };

    const hasTask = (day: number | null) => {
        if (!day) return false;
        const dayDate = new Date(year, month - 1, day);
        return tasksWithDates.some(taskDate => {
            const td = new Date(taskDate);
            return td.getFullYear() === dayDate.getFullYear() &&
                   td.getMonth() === dayDate.getMonth() &&
                   td.getDate() === dayDate.getDate();
        });
    };

    const getTaskCount = (day: number | null) => {
        if (!day) return 0;
        const dayDate = new Date(year, month - 1, day);
        return tasksWithDates.filter(taskDate => {
            return taskDate.getFullYear() === dayDate.getFullYear() &&
                   taskDate.getMonth() === dayDate.getMonth() &&
                   taskDate.getDate() === dayDate.getDate();
        }).length;
    }

    const handlePrevMonth = () => {
        if (!_onMonthChange) return;
        if (month === 1) {
            _onMonthChange(year - 1, 12);
        } else {
            _onMonthChange(year, month - 1);
        }
    };

    const handleNextMonth = () => {
        if (!_onMonthChange) return;
        if (month === 12) {
            _onMonthChange(year + 1, 1);
        } else {
            _onMonthChange(year, month + 1);
        }
    };



    const { onTouchStart, onTouchEnd } = CustomEvent_Swipe((d) => {
        if (d === "left") {
            handleNextMonth();
        } else if (d === "right") {
            handlePrevMonth();
        }
    })
    
    



    return (
        <Screen_Frame {...props}>
            <div 
                className={
                    MergeClassNames(
                        styles.calendar,
                        MediaClassName(media, {
                            tablet: styles.tablet,
                            mobile: styles.mobile,
                        })
                    )
                }
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div className={styles.header}>
                    <div className={styles.yearMonth}>
                        {year}年{month}月
                    </div>

                    <div className={styles.toolContainer}>
                        <button 
                            className={styles.searchButton}
                            onClick={onClickSearch}
                            aria-label="タスク検索"
                        >
                            🔍
                        </button>
                        <button 
                            className={styles.navButton}
                            onClick={handlePrevMonth}
                            aria-label="前月"
                        >
                            ‹
                        </button>
                        <button 
                            className={styles.navButton}
                            onClick={handleNextMonth}
                            aria-label="次月"
                        >
                            ›
                        </button>
                    </div>
                </div>
                <div className={styles.weekdays}>
                    <div className={styles.weekday}>日</div>
                    <div className={styles.weekday}>月</div>
                    <div className={styles.weekday}>火</div>
                    <div className={styles.weekday}>水</div>
                    <div className={styles.weekday}>木</div>
                    <div className={styles.weekday}>金</div>
                    <div className={styles.weekday}>土</div>
                </div>
                <div className={styles.weeks}>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className={styles.week}>
                            {week.map((day, dayIndex) => {

                                const longTap = CustomEvent_LongTap(() => {
                                    if (day) _onSelectDate?.(DaytoDate(day));
                                }, 400);


                                const taskCount = getTaskCount(day);
                                const ele = (
                                    <div 
                                        key={dayIndex} 
                                        title={taskCount > 0 ? `${taskCount}件のタスク` : "まだタスクはありません"}
                                        className={`${styles.day} ${isSelected(day) ? styles.selected : ''} ${hasTask(day) ? styles.hasTask : ''}`}
                                        onClick={() => {if (day) _onDateClick?.(DaytoDate(day))}}
                                        onDoubleClick={() => {if (day) _onSelectDate?.(DaytoDate(day))}}
                                        {...longTap}
                                    >
                                        {
                                            taskCount > 0 &&
                                            <span className={styles.taskCount}>{taskCount}</span>
                                        }
                                        {day || ''}
                                    </div>
                                )
                                return ele;
                            })}
                        </div>
                    ))}
                </div>
                {children}
            </div>
        </Screen_Frame>
    );
}
