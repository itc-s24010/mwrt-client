'use client';

import { useState, useEffect, useRef } from 'react';
import type { MediaType } from '@/libs/client/responsive';
import { MediaClassName } from '@/libs/client/responsive';
import { MergeClassNames } from '@/libs/CustomAttribute';
import styles from './index.module.css';
import { DB_Category, DB_Category_ID, DB_Task, Task_List_Query } from '@/libs/api/endpoint';
import { API } from '@/libs/api/api';
import { Element_Controller_Response } from '@/type';
import { UI_Screen_Fill } from '@/page_components/screen/fill';
import { Util } from '@/libs/util';
import { Gen_Select } from '@/page_components/form/select';



type Controller = {
    show(): void;
    hide(): void;
}

type TaskSearchQuery = Task_List_Query & {
    name?: string;
}


type TaskSearchProps = {
    media: MediaType;
    categories: DB_Category[];
    SearchQuery: TaskSearchQuery;
    onChangeSearchQuery?: (query: TaskSearchQuery) => void;
};

export function TaskSearch_Neo({ media, categories, SearchQuery, onChangeSearchQuery }: TaskSearchProps): Element_Controller_Response<Controller> {
    const { categoryId, gte, lte, name } = SearchQuery;

    const [show, setShow] = useState(false);
    
    
    const searchInputRef = useRef<HTMLInputElement>(null);



    const controller: Controller = {
        show() {
            setShow(true);
        },
        hide() {
            setShow(false);
        }
    };


    //自動で検索入力にフォーカス
    useEffect(() => {
        if (show) {
            searchInputRef.current?.focus();
        } else {
            searchInputRef.current?.blur();
        }
    }, [show]);



    const element = (
        <UI_Screen_Fill onClick={() => controller.hide()} className={show ? "" : styles.hide}>


            <div className={styles.taskSearchContainer}
                onClick={(e) => {e.stopPropagation();}}
            >
                <h3 className={styles.title}>タスク検索</h3>
                <div className={styles.searchBox}>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={name ?? ''}
                        onChange={(e) => onChangeSearchQuery?.({...SearchQuery, name: e.target.value})}
                        placeholder="タスク名で検索..."
                        className={styles.searchInput}
                    />
                    {name && (
                        <button
                            onClick={() => onChangeSearchQuery?.({...SearchQuery, name: undefined})}
                            className={styles.clearButton}
                        >
                            ✕
                        </button>
                    )}
                </div>
                <div className={styles.dateRangeBox}>
                    <div className={styles.dateInput} >
                        <label className={styles.dateLabel}>開始日</label>
                        <input
                            type="date"
                            value={gte ? Util.toYYYYMMDD(gte) : ""}
                            onChange={(e) => onChangeSearchQuery?.({...SearchQuery, gte: new Date(e.target.value)})}
                            className={styles.dateField}
                            onClick={(e) => e.currentTarget.showPicker?.()}
                        />
                    </div>
                    <div className={styles.dateInput} >
                        <label className={styles.dateLabel}>終了日</label>
                        <input
                            type="date"
                            value={lte ? Util.toYYYYMMDD(lte) : ""}
                            onChange={(e) => onChangeSearchQuery?.({...SearchQuery, lte: new Date(e.target.value)})}
                            className={styles.dateField}
                            onClick={(e) => e.currentTarget.showPicker?.()}
                        />
                    </div>
                    {(categoryId || gte || lte || name) && (
                        <button
                            className={styles.clearDateButton}
                            onClick={() => {
                                onChangeSearchQuery?.({
                                    categoryId: undefined,
                                    gte: undefined,
                                    lte: undefined,
                                    name: undefined
                                });
                            }}
                        >
                            クリア
                        </button>
                    )}
                </div>
                <div>
                    <div className={styles.categorySelectBox}>
                        <label className={styles.categoryLabel}>カテゴリ</label>
                        <Gen_Select
                            className={styles.categorySelect}
                            options={[{value: undefined, label: "すべて"}, ...categories.map((cat) => ({ value: cat.id, label: cat.name }))]}
                            value={categoryId}
                            _onChange={(value) => onChangeSearchQuery?.({...SearchQuery, categoryId: value})}
                        />
                    </div>
                </div>
            </div>


        </UI_Screen_Fill>
    );


    return { element, controller };
}
