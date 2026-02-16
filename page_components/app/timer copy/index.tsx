"use client";


import { useEffect, useState } from "react";

import styles from "./index.module.css";
import { MergeAttributes, MergeClassNames } from "@/libs/CustomAttribute";
import { UI_Button } from "@/page_components/form/button/button";
import { FormatTime } from "@/libs/Time";

type Options = React.HTMLAttributes<HTMLDivElement> & {
    offsetms?: number;
    
    _allowLap?: boolean;
    onStart: () => void;
    onStop: (time: number) => void;
    _onLap?: (time: number) => void;

    isStarted: boolean;
    canReset: boolean;
    _onTick?: (time: number) => void;

    customTimeFormat?: (ms: number) => string;
};


export function Timer_Neo({ offsetms: offset=0, _allowLap, onStart, onStop, _onLap, _onTick, isStarted, canReset, customTimeFormat=FormatTime, ...props}: Options) {
    //タイマー開始時刻をmsで管理
    const [startTime, setStartTime] = useState<number>(isStarted ? performance.now() - offset : 0);
    //経過時間をmsで管理
    const [time, setTime] = useState(0);
    //停止時の時間を保存するためのstate
    const [resultTime, setResultTime] = useState(0);
    const [running, setRunning] = useState(isStarted);

    useEffect(() => {
        const tick = () => {
            setTime(performance.now());
            requestAnimationFrame(tick);
        };
        tick();

    }, []);



    const current = running ? time - startTime : offset;

    
    if (running) _onTick?.(current);


    const displayTime = customTimeFormat ? customTimeFormat(current) : `Time: ${(current / 1000).toFixed(2)}s`;
    
    return <div {...MergeAttributes(props, {className: MergeClassNames(styles.timerContainer, !running ? styles.border_red : "")})}>
        <div className={styles.timeDisplay}>{displayTime}</div>
        

        <div className={styles.controllContainer}>
            <UI_Button onClick={() => {
                if (running) {
                    if (!confirm("タイマーを停止しますか？")) return;
                    setRunning(false);
                    setResultTime(current);
                    setTime(0);
                    onStop?.(current);

                } else {
                    onStart?.();
                    setStartTime(performance.now() - offset);
                    setRunning(true);

                }
            }} 
            disabled={!running && !canReset}
            title={running ? "停止" : "開始"}>
                {
                    running ? "⏹" : "▶"
                }
            </UI_Button>
            
            {
                _allowLap &&
                <UI_Button  onClick={() => {
                    if (running) {
                        _onLap?.(current);
                    }
                }} disabled={!running} title="ラップタイム取得">
                    ⏱
                </UI_Button>
            }
        </div>
    </div>;
}