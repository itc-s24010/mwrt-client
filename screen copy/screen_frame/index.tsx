"use client";


import { MergeAttributes } from "@/libs/CustomAttribute";
import { ReactNode, useState } from "react";


import styles from "./index.module.css";
import { Screen_Frame_Top } from "../top";
import { MediaType } from "@/libs/client/responsive";
import { CustomEvent_Swipe } from "@/libs/client/event/customEvent";


export type AppScreen = ScreenFrameProps & {
    /**
     * 画面の構成を切り替えるためのメディアタイプ
     */
    media: MediaType;
    /**
     * 画面の表示準備が完了したときに呼び出されるコールバック
     */
    _onReady?: () => void;
}


export type ScreenFrameProps = React.HTMLAttributes<HTMLDivElement> & {
    /**トップバーに表示する内容 */
    _top?: ReactNode;
    /**戻るボタンに表示するラベル */
    _backwardLabel?: string;
    /**トップバーの戻るボタンがクリックされたときの処理 */
    _onClickBackward?: () => void;

    /**ボトムバーに表示する内容 */
    _bottom?: ReactNode;

    /**自動で隠すかどうか */
    _autoHide?: boolean;
};


export function Screen_Frame({ _top, _backwardLabel, _onClickBackward, _bottom, _autoHide = true, children, ...props }: ScreenFrameProps) {
    const showTop = _autoHide ? Boolean(_top || _backwardLabel || _onClickBackward) : true;
    const showBottom = _autoHide ? Boolean(_bottom) : true;
    



    const onSwipe = CustomEvent_Swipe((direction) => {
        if (direction === "right") {
            _onClickBackward?.();
        }
    });

    
    
    return (
        <div {...MergeAttributes(props, { className: styles.container, ...onSwipe })} >
            {
                showTop &&
                <div className={styles.top}>
                    <Screen_Frame_Top backwardLabel={_backwardLabel} backward={_onClickBackward}>
                        {_top}
                    </Screen_Frame_Top>
                </div>
            }

            {
                children &&
                <div className={styles.content}>
                    {children}
                </div>
            }

            {
                showBottom &&
                <div className={styles.bottom}>
                    {_bottom}
                </div>
            }
        </div>
    )
}

