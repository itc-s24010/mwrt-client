import styles from "./index.module.css";




export type GenSelectProps<T> = React.HTMLAttributes<HTMLSelectElement> & {
    options: { value: T; label: string, className?: string }[];
    value: T;
    _onChange?: (value: T) => void;
}

export function Gen_Select<T>({ options, value, _onChange, ...props }: GenSelectProps<T>) {
    return (
        <select
            {...props}
            value={options.findIndex((option) => option.value === value)}
            onChange={(ev) => {
                const selectedIndex = parseInt(ev.target.value);
                const selectedOption = options[selectedIndex];
                if (selectedOption) {
                    _onChange?.(selectedOption.value);
                }
            }}
        >
            {options.map((option, index) => (
                <option key={index} value={index} className={option.className ?? styles.option}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
