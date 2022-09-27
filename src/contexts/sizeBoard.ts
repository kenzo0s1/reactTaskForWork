import React from "react";

import {dashboardContextState, dashboardContextType} from "../interfaces/dashboard/dashboard";

export const dashboardWidgetContext = React.createContext<dashboardContextType>(dashboardContextState )