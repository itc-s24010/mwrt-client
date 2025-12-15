import styles from "./index.module.css";

type Props = {
    children?: React.ReactNode;
    customAttributes?: React.HTMLAttributes<HTMLDivElement>;
}
export function FillScreen({ children, customAttributes }: Props) {
    return (
        <div className={styles.fillScreen} {...customAttributes}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}