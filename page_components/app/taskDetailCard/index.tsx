import { DB_Task } from "@/libs/api/_db"
import styles from "./index.module.css"
import { MergeAttributes } from "@/libs/CustomAttribute";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    data: DB_Task<true>;
}

export function TaskDetailCard({ data, ...props }: Props) {
    console.log(data);
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}>
            <h3>{data.name}</h3>
            <p>カテゴリ: {data.category.name}</p>
            <p>作成日: {data.createdAt.toLocaleString()}</p>
            <p>更新日: {data.updatedAt.toLocaleString()}</p>


            {
                data.memos.map((memo) => (
                    <div key={memo.id}>{memo.content}</div>
                ))
            }
        </div>
    )
}