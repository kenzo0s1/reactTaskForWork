import React from "react";

export interface DashboardInterface{
    height:number,
    width:number
}
export type dashboardContextType = {
    sizeBoard:any,
    setSizeBoard: React.Dispatch<React.SetStateAction<any>>
}
export type dashboardValue = {
    height:number,
    width: number
}
export const dashboardContextState = {
    sizeBoard: null,
    setSizeBoard: () => {}
}