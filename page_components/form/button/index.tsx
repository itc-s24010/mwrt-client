import styles from "./index.module.css";

type PlainButton_Props = {
    children?: React.ReactNode;
    customAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export function PlainButton({ children, customAttributes }: PlainButton_Props) {
    return (
        <button className={styles.button} {...customAttributes}>{children}</button>
    )
}