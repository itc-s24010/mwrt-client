import { UI_Screen_Fill } from "@/page_components/screen/fill";
import { Element_Controller_Response } from "@/type";
import { useState } from "react";
import { CategoryForm } from "../category_form";
import { DB_Category } from "@/libs/api/_db";

type Controller = {
    show(): void;
    hide(): void;
}

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
    onAddCategory(category: DB_Category): void;
}



export function ControlCategoryForm({...props}: Props): Element_Controller_Response<Controller> {
    const [show, setShow] = useState(false);


    const controller: Controller = {
        show() {
            setShow(true);
        },
        hide() {
            setShow(false);
        }
    };

    const element = (
        <UI_Screen_Fill onClick={() => controller.hide()}>
            <CategoryForm {...props} onClick={(ev) => ev.stopPropagation()}/>
        </UI_Screen_Fill>
    );

    return {
        element: show ? element : null,
        controller
    };
}