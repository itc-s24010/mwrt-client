import { FillScreen } from "@/page_components/screen/fill";
import { PlainForm } from "../plain_form";

import styles from "./index.module.css";

type PopupForm_Props = {
    children?: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
    customFormAttributes?: React.HTMLAttributes<HTMLFormElement>;
}

export function PopupForm({ children, onSubmit, customAttributes, customFormAttributes }: PopupForm_Props) {
    return (
        <FillScreen customAttributes={customAttributes}>
            <div className={styles.popupFormContainer}>
                <PlainForm onSubmit={onSubmit} customAttributes={{...customFormAttributes, onClick: (e) => { e.stopPropagation(); }}}>
                    {children}
                </PlainForm>
            </div>
        </FillScreen>
    )
}