import React from "react";

export interface ElementWidget{
    value:string,
    width:number,
    height:number,
}
export type currentElementWidgetContextType = {
    sizeWidget:any,
    setSizeWidget: React.Dispatch<React.SetStateAction<any>>
}
export const currentElementWidgetContextState = {
    sizeWidget: null,
    setSizeWidget: () => {}
}
export type widgetValue = {
    height:number,
    width: number,
    value:string
}