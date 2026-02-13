import { Screen_Frame_Top_Props } from "./top";

export type ScreenMap<screenId extends string> = {
    [key in screenId]: () => React.ReactNode;
}


export type ScreenSelectorCallback<screenId extends string> = (screenId: screenId) => void;


export type AppScreen<ScreenIds extends string = string> = Screen_Frame_Top_Props & {
    root?: boolean;
    media: MediaType;
    selectScreen?: (screen: ScreenIds) => void;
    onReady?: () => void;
};