import { MergeAttributes } from "@/libs/CustomAttribute";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    x?: number | string;
    y?: number | string;
    mouseEvent?: boolean;
}

export function FloatingElement({ x, y, mouseEvent=false, ...props }: Props) {
    return (
        <div
            {...MergeAttributes(props, {
                style: {
                    position: "absolute",
                    ...(x !== undefined ? { left: x } : {}),
                    ...(y !== undefined ? { top: y } : {}),
                    pointerEvents: mouseEvent ? "auto" : "none",
                }
            })}
        />
    )
}