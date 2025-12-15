"use client";

import { PlainButton } from "@/page_components/form/button";
import { PopupForm } from "@/page_components/form/popup_form";
import { PlainTitle } from "@/page_components/title";
import { useState } from "react";

export function PageContent() {
    const [showPopup, setShowPopup] = useState(false);


    return (
        <div>
            <PlainTitle> Test Page </PlainTitle>
            <PlainButton customAttributes={
                {
                    onClick: () => { setShowPopup(!showPopup);}
                }
            }>
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
            
        </div>
    )
}