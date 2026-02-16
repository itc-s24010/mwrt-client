"use client";



import { Screen_Home } from "@/app_screen/home/screen";
import { DB_Category, DB_Category_ID, DB_Task } from "@/libs/api/_db";
import { MediaType, ResponsiveMedia } from "@/libs/client/responsive";
import { Controll_APP_Loading } from "@/page_components/app/control_loading";
import { TaskSearch_Neo } from "@/page_components/app/task_search_neo";
import { ScreenMap } from "@/screen/screen";
import { useEffect, useState } from "react";
import { UI_Button } from "@/page_components/form/button/button";





import styles from "./screen.module.css";
import { API } from "@/libs/api/api";
import { Screen_Task_List } from "@/app_screen/task_list/screen";





type ScreenIDs = "home" | "task_list";


export function Screen_Dev() {
    const [media, setMedia] = useState<MediaType>("desktop");
    const [screen, setScreen] = useState<ScreenIDs>("home");

    useEffect(() => {
        ResponsiveMedia({
            minWidth:  1040,
            maxWidth: 1200,
            minHeight:  500,
            maxHeight:  800,
        }, "width", (media) => {
            setMedia(media);
            loadingController.hide(true);

        }, (media) => {
            setMedia(media);

        });
    }, []);


    







    const [categoryId, setSQ_CategoryId] = useState<DB_Category_ID | undefined>();
    const [gte, setSQ_Gte] = useState<Date | undefined>();
    const [lte, setSQ_Lte] = useState<Date | undefined>();
    const [name, setQ_name] = useState<string>("");

    const [showAll, setShowAll] = useState(false);

    const [Cgte, setCgt] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [Clte, setClt] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));




    const { element: LoadingElement, controller: loadingController } = Controll_APP_Loading({});

    const { element: LoadingElement_Searching, controller: loadingController_Searching } = Controll_APP_Loading({_type: "blurred", children: "検索中..."});



    const [categories, setCategories] = useState<DB_Category[]>([]);
    const [tasks, setTasks] = useState<DB_Task[]>([]);




    const { element: TaskSerch, controller: taskSearchController } = TaskSearch_Neo({
        media,
        categories: categories,
        SearchQuery: {
            categoryId,
            gte,
            lte,
            name
        },
        onChangeSearchQuery(query) {
            console.log(query)
            setSQ_CategoryId(query.categoryId);
            setSQ_Gte(query.gte);
            setSQ_Lte(query.lte);
            setQ_name(query.name ?? '');
        }
    });




    const isManualSearch = categoryId !== undefined || gte !== undefined || lte !== undefined || name.length > 0;
    
    const _SQ = isManualSearch ? {
        categoryId,
        gte,
        lte,
        name
    } : {};



    const filteredTasks = isManualSearch ? tasks.filter((task) => {
        if (name.length > 0) return task.name.includes(name);
        return true;
    }) : tasks.filter((task) => task.scheduledStartAt <= Clte && task.scheduledStartAt >= Cgte);


    useEffect(() => {
        API.API_Request_Category_List().then((res) => {
            if (res.success) setCategories(res.data ?? []);
        });
        API.API_Request_Task_List().then((res) => {
            if (res.success) setTasks(res.data ?? []);
        });
    }, [])

    
    useEffect(() => {
        if (!isManualSearch) return;

            getTasks();

    }, [categoryId, gte, lte]);


    useEffect(() => {
        if (isManualSearch) return;

        getTasks();

    }, [isManualSearch]);


    const backToHome = async () => {
        setScreen("home");
        await getTasks();
    }


    const getTasks = async () => {
        loadingController_Searching.show();
        
        const [categoriesRes, tasksRes] = await Promise.all([
            API.API_Request_Category_List(),
            API.API_Request_Task_List(
                isManualSearch ? {
                    categoryId,
                    gte,
                    lte
                } : undefined
            ),
        ]);
        if (categoriesRes.success) setCategories(categoriesRes.data ?? []);
        if (tasksRes.success) setTasks(tasksRes.data ?? []);
        
        loadingController_Searching.hide(true);
    }



    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const selectedTasks = tasks.filter(task => {
        if (!task.scheduledStartAt) return false;
        const taskDate = new Date(task.scheduledStartAt);
        return taskDate.toDateString() === selectedDate?.toDateString();
    });




    const SearchButton = (
        <div className={styles.top_container}>
            <UI_Button onClick={taskSearchController.show}>検索</UI_Button>
        </div>
    );







    const ScreenMap: ScreenMap<ScreenIDs> = {
        "home": () => <Screen_Home media={media} categories={categories} tasks={filteredTasks} SQ={_SQ} onAddTask={(task) => setTasks((p) => [task, ...p])}
            onAddCategory={(category) => setCategories((p) => [category, ...p])}
            onClickSearch={taskSearchController.show}
            onSelectDate={(date) => {
                setSelectedDate(date);
                setScreen("task_list");
            }}
            onChangeMonth={(year, month) => {
                const firstDay = new Date(year, month - 1, 1);
                const lastDay = new Date(year, month, 0);
                setCgt(firstDay);
                setClt(lastDay);
            }}
        />,
        "task_list": () => <Screen_Task_List media={media} date={selectedDate!} tasks={selectedTasks} _onClickBackward={backToHome}
            onUpdatedTask={(updatedTask) => {
                setTasks((prevTasks) => prevTasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
            }}
            onDeletedTask={(taskId) => {
                const filtered = tasks.filter(task => task.id !== taskId);
                setTasks(filtered);
            }}
        />
    };


    return (
        <>
            {LoadingElement_Searching}
            {LoadingElement}
            {ScreenMap[screen]()}
            { TaskSerch }
        </>
    );
}