import React from "react";

export type currentWidgetContextType = {
    context:any,
    setContext: React.Dispatch<React.SetStateAction<any>>
}

export const currentWidgetContextState = {
    context: null,
    setContext: () => {}
}