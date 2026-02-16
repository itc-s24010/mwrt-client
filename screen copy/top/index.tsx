import { MergeAttributes } from "@/libs/CustomAttribute";
import styles from "./index.module.css";
import { UI_Button } from "@/page_components/form/button/button";

export type Screen_Frame_Top_Props = React.HTMLAttributes<HTMLDivElement> & {
    backwardLabel?: string;
    backward?: () => void;
};

export function Screen_Frame_Top( { backwardLabel, backward, children, ...props }: Screen_Frame_Top_Props) {
    return (
        <div {...MergeAttributes(props, {
            className: styles.top
        })}>
            {backward && <UI_Button size="extraLarge" onClick={backward}>{backwardLabel ?? "戻る"}</UI_Button>}

            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}