import React, {useContext} from 'react';
import {ElementWidget} from "../../../interfaces/widgetBoard/elementWidget";
import '../../../styles/boardWithWidget/elementBoard.scss'
import {currentWidgetContext} from "../../../contexts/widgetContext";


const ElementWidgets = (props:ElementWidget) => {
    const {context,setContext} = useContext(currentWidgetContext)

    function dragStartHandler() {
        setContext(props)
        console.log(context)
    }

    return (
        <div
            draggable={true}
            className={"elementBoard"}
            onDragStart={dragStartHandler}
            style={{width:`${props.width * 50}px` ,height:`${props.height * 50}px` , marginTop:"50px" }}
        >
            {props.value}
        </div>
    );
};

export default ElementWidgets;