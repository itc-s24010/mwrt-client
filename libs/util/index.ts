import { DB_Task, Task_List_Query } from "../api/endpoint";

function formatTimeText(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;


    const hoursText = `${hours}時間 `;
    const minutesText = `${minutes.toString().padStart(2, '0')}分 `;
    const secondsText = `${seconds.toString().padStart(2, '0')}秒`;

    return `${hoursText}${minutesText}${secondsText}`;
};



function calculateTotalWorkTime(tasks: DB_Task[]): number {
    return tasks.reduce((total, task) => {
        if (task.startedAt && task.endedAt) {
            const startTime = new Date(task.startedAt).getTime();
            const endTime = new Date(task.endedAt).getTime();
            return total + (endTime - startTime);
        }
        return total;
    }, 0);
}


function toYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function toYYYYMMDD_HHMM(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


function inDateRange(date: Date, gte?: Date, lte?: Date): boolean {
    if (gte && date < gte) return false;
    if (lte && date > lte) return false;
    return true;
}





export const Util = {
    formatTimeText,
    calculateTotalWorkTime,
    toYYYYMMDD,
    toYYYYMMDD_HHMM,
    inDateRange
};