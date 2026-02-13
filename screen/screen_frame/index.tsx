import { MergeAttributes } from "@/libs/CustomAttribute";
import { ReactNode } from "react";


import styles from "./index.module.css";
import { Screen_Frame_Top, Screen_Frame_Top_Props } from "../top";


type Props = React.HTMLAttributes<HTMLDivElement> & Screen_Frame_Top_Props & {
    root?: boolean;
    top?: ReactNode;
    center?: ReactNode;
    bottom?: ReactNode;

};

export function Screen_Frame({root=false, top, center, bottom, backwardLabel, backward, ...props}: Props) {
    return (
        <div {...MergeAttributes(props, { className: root ? `${styles.screen_frame} ${styles.root}` : styles.screen_frame })}>
            {
                top &&
                <div className={styles.top}>
                    <Screen_Frame_Top className={styles.top} backwardLabel={backwardLabel} backward={backward}>
                        {top}
                    </Screen_Frame_Top>
                </div>
            }
            {
                center &&
                <div className={styles.center}>
                    {center}
                </div>
            }
            {
                bottom && 
                <div className={styles.bottom}>
                    {bottom}
                </div>
            }
        </div>
    )
}