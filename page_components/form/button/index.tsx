import { MergeAttributes } from "@/libs/CustomAttribute";
import styles from "./index.module.css";

type Options = React.ButtonHTMLAttributes<HTMLButtonElement>


export function PlainButton(props: Options) {
    return (
        <button {...MergeAttributes({className: styles.button}, props)}></button>
    )
}

export const ButtonStyles = Object.freeze({
    Large: styles.button_large,
    Small: styles.button_small,
    HoverEffect: styles.button_hoverEffect,
    Rounded: styles.button_rounded,
    HoverScale: styles.button_hoverScale,
    Transition: styles.button_transition,
})