import { Screen_Frame_Top_Props } from "./top";

export type ScreenMap<screenId extends string> = {
    [key in screenId]: () => React.ReactNode;
}


export type ScreenSelectorCallback<screenId extends string> = (screenId: screenId) => void;
