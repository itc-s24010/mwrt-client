export type CustomAttribute = React.HTMLAttributes<HTMLElement>;

export function MergeAttributes(base: React.HTMLAttributes<HTMLElement>, Custom: React.HTMLAttributes<HTMLElement>): React.HTMLAttributes<HTMLElement> {
    return {
        ...base,
        ...Custom,
        className: MergeClassNames(base.className ?? "", Custom.className ?? "")
    };
}

export function MergeClassNames(...classNames: string[]): string {
    return classNames.join(" ");
}