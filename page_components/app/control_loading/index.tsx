"use client";

import { MergeAttributes } from "@/libs/CustomAttribute";
import { APP_Loading } from "../loading";


import styles from "./index.module.css";
import { useState } from "react";
import { Element_Controller_Response } from "@/type";
import { FillTypes } from "@/page_components/screen/fill";



type Props = React.HTMLAttributes<HTMLElement> & {
    _type?: FillTypes;
}




export function Controll_APP_Loading({ _type, ...props}: Props): Element_Controller_Response<Controller> {
    const [className, setClassName] = useState("");
    const loading = <APP_Loading _type={_type} {...MergeAttributes(props, { className })}/>;
    return {
        element: loading,
        controller: {
            show: (fade) => {
                setClassName(fade ? styles.fadeIn : "");
            },
            hide: (fade) => {
                setClassName(fade ? styles.fadeOut : styles.hidden);
            }
        }
    };
}


type Controller = {
    show: (fade?: boolean) => void;
    hide: (fade?: boolean) => void;
}