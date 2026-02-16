import { MergeAttributes } from "@/libs/CustomAttribute"

import styles from "./index.module.css";


type Props = React.FormHTMLAttributes<HTMLFormElement> & {

}


export function UI_Form(props: Props) {
    return (
        <form {...MergeAttributes(props, {
            className: styles.container
        })}/>
    )
}