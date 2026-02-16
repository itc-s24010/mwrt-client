import { MergeAttributes, MergeClassNames } from "@/libs/CustomAttribute";
import styles from "./index.module.css";


export type FillTypes = "opaque" | "blurred";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    _type?: FillTypes;
}


export function UI_Screen_Fill({children, _type="blurred", ...props}: Props) {
    return (
        <div {...MergeAttributes(props, {className: MergeClassNames(
            styles.fillScreen,
            styles[_type]
        )})}>
            <div>
                {children}
            </div>
        </div>
    )
}