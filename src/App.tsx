import React, {useState} from 'react';
import './styles/App.scss';
import {currentWidgetContext} from "./contexts/widgetContext";
import Dashboard from "./components/dashboard/dashboard";
import BoardWithWidget from "./components/boardWithWidget/boardWithWidget";
import {dashboardWidgetContext} from "./contexts/sizeBoard";
import {currentElementWidgetContext} from "./contexts/sizeWidget";
import {dashboardValue} from "./interfaces/dashboard/dashboard";
import {widgetValue} from "./interfaces/widgetBoard/elementWidget";
import Input from "./components/dashboard/input";

function App() {
    const [context, setContext] = useState(null)
    const [sizeBoard, setSizeBoard] = useState<dashboardValue>({width:10,height:10})
    const [sizeWidget, setSizeWidget] = useState<widgetValue>({height: 1, width: 1, value:`Value`})
      return (
        <div id={"app"}>
            <currentWidgetContext.Provider value={{context, setContext}}>
                <dashboardWidgetContext.Provider value={{setSizeBoard,sizeBoard}}>
                    <Dashboard width={sizeBoard.width} height={sizeBoard.height}/>
                </dashboardWidgetContext.Provider>
                <currentElementWidgetContext.Provider value={{sizeWidget,setSizeWidget}}>
                    <BoardWithWidget value={sizeWidget.value} width={sizeWidget.width} height={sizeWidget.height}  />
                </currentElementWidgetContext.Provider>
            </currentWidgetContext.Provider>
        </div>
      );
}

export default App;
