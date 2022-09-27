import React, {useContext, useState} from 'react';
import ElementWidgets from "./elementWidget/elementWidget";
import '../../styles/boardWithWidget/boardWithWidget.scss'
import {widgetValue} from "../../interfaces/widgetBoard/elementWidget";
import {currentElementWidgetContext} from "../../contexts/sizeWidget";
const BoardWithWidget = (props:widgetValue) => {
    const [size,setSize] = useState(props)
    const {setSizeWidget,sizeWidget} = useContext(currentElementWidgetContext)
    function handleChangeSizeWidth(event: any) {
        setSize({height: size.height, width: parseInt(event.currentTarget.value) , value:size.value})
        setSizeWidget({height: size.height, width: parseInt(event.currentTarget.value) , value:size.value})
    }

    function handleChangeSizeHeight(event: any) {
        console.log(sizeWidget)
        setSize({height: parseInt(event.currentTarget.value), width: size.width,value:size.value})
        setSizeWidget({height: parseInt(event.currentTarget.value), width:size.width , value:size.value})
    }
    function handleChangeSizeValue(event: any) {
        console.log(sizeWidget)
        setSize({height: size.height, width: size.width,value:event.currentTarget.value})
        setSizeWidget({height: size.height, width:size.width , value:event.currentTarget.value})
    }
    return (
        <div className={"boardWithWidget"}>
            <div className={"zizi"}>
                <h6>Height:</h6>
                <input type="number" value={size.height} onChange={event => handleChangeSizeHeight(event)} placeholder={"width"} />
                <h6>Width:</h6>
                <input type="number" value={size.width} onChange={event => handleChangeSizeWidth(event)} placeholder={"height"}/>
                <h6>Value:</h6>
                <input  type="text" value={size.value} onChange={event => handleChangeSizeValue(event)} placeholder={"height"}/>

                <ElementWidgets height={size.height} width={size.width} value={sizeWidget.value}/>

            </div>
        </div>
    );
};

export default BoardWithWidget;