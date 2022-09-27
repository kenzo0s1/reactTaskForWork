import React from "react";

import {
    currentElementWidgetContextState,
    currentElementWidgetContextType
} from "../interfaces/widgetBoard/elementWidget";

export const currentElementWidgetContext = React.createContext<currentElementWidgetContextType>(currentElementWidgetContextState )