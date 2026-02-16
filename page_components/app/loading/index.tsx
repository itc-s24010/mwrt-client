import styles from "./index.module.css";
import { FillTypes, UI_Screen_Fill } from "@/page_components/screen/fill";

type Props = React.HTMLAttributes<HTMLElement> & {
    _type?: FillTypes;
}


export function APP_Loading({children, _type="opaque", ...props}: Props) {
    return (
        <UI_Screen_Fill _type={_type} {...props}>
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <div className={styles.text}>{children ?? "Loading..."}</div>
                
            </div>
        </UI_Screen_Fill>
    );
}

