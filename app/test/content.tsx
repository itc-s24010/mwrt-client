"use client";

import { Timer } from "@/page_components/app/timer";
import { PlainButton } from "@/page_components/form/button";
import { PopupForm } from "@/page_components/form/popup_form";
import { PlainTitle } from "@/page_components/title";
import { useState } from "react";

export function PageContent() {
    const [showPopup, setShowPopup] = useState(false);

    const [lapTimes, setLapTimes] = useState<number[]>([]);


    return (
        <div>
            <PlainTitle> Test Page </PlainTitle>
            <PlainButton onClick={() => { setShowPopup(!showPopup)}}>
                ポップアップテスト
            </PlainButton>
            {
                showPopup &&
                <PopupForm
                    customAttributes={{
                        onClick: (e) => {
                            e.preventDefault();
                            setShowPopup(false);
                        }
                    }}
                >
                    <label htmlFor="testInput">Test Input</label>
                    <input id="testInput" type="text" />
                </PopupForm>
            }



            <Timer custom={{
                onStart: () => {
                    console.log("Timer started");
                },
                onStop: (time) => {
                    console.log("Timer stopped at", time);
                },
                allowLap: true,
                onLap: (time) => {
                    setLapTimes((prev) => [...prev, time]);
                }
            }}></Timer>

            <div>
                {
                    lapTimes.map((time, index) => (
                        <div key={index}>Lap {index + 1}: {(time / 1000).toFixed(2)}s</div>
                    ))
                }
            </div>
            
        </div>
    )
}