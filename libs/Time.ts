const MS_IN_SECOND = 1000;


export function ToHMS(ms: number): { hours: number; minutes: number; seconds: number; milliseconds: number } {
    const totalSeconds = Math.floor(ms / MS_IN_SECOND);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(ms % MS_IN_SECOND);

    return { hours, minutes, seconds, milliseconds };
}


export function FormatTime(ms: number): string {
    const { hours, minutes, seconds, milliseconds } = ToHMS(ms);

    return `${`${hours}`.padStart(2, "0")}h ${`${minutes}`.padStart(2, "0")}m ${`${seconds}`.padStart(2, "0")}.${`${milliseconds}`.padStart(3, "0")}s`;
}
