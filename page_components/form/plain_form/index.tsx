import styles from "./index.module.css";

type PlainForm_Props = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode;
    customAttributes?: React.HTMLAttributes<HTMLFormElement>;
}

export function PlainForm({ children, onSubmit, customAttributes }: PlainForm_Props) {
    return (
        <form className={styles.form} onSubmit={onSubmit} {...customAttributes}>
            {children}
        </form>
    )
}