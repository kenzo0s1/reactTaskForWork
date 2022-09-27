import React from "react";
import {
    currentWidgetContextState,
    currentWidgetContextType
} from "../interfaces/currentWidgetContext/currentWidgetContext";

export const currentWidgetContext = React.createContext<currentWidgetContextType>(currentWidgetContextState )