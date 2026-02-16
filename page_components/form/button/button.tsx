import { MergeAttributes } from "@/libs/CustomAttribute";
import styles from "./button.module.css";
import { SizeType } from "@/type";

type ButtonTypes = "primary" | "secondary" | "danger" | "success";


type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: SizeType;
    _type?: ButtonTypes;
};


const SizeClssMap: Record<SizeType, string> = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
    mega: styles.mega
};


export function UI_Button({size = "medium", _type = "primary", ...props}: Props) {
    return (
        <button {...MergeAttributes(props, {
            className: `${styles.button} ${SizeClssMap[size]} ${styles[_type]}`
        })}/>
    )
}