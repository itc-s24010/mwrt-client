import { MergeAttributes } from "@/libs/CustomAttribute";
import { FloatingElement } from "@/page_components/floating"


import styles from "./index.module.css";



type PositionType = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    position: PositionType;
}



export function ControllerPopupBox({position, ...props}: Props) {
    return <FloatingElement {...MergeAttributes(props, {className: `${styles.container} ${styles[position]}`})} mouseEvent={true}/>
}