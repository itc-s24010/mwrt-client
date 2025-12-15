import styles from "./index.module.css";

type PlainTitle_Props = {
    children?: React.ReactNode;
}

export function PlainTitle({ children }: PlainTitle_Props) {
    return (
        <h2 className={styles.title}>{children}</h2>
    )
}