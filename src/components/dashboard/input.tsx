import React, {useContext, useState} from 'react';
import '../../styles/dashboard/input.scss'
import {Input} from "../../interfaces/dashboard/input";
import {dashboardWidgetContext} from "../../contexts/sizeBoard";

const InputComponent = (props:Input) => {
    const [size,setSize] = useState(props)
    const {sizeBoard,setSizeBoard} = useContext(dashboardWidgetContext)
    function handleChangeSizeHeight(event: any) {
        setSize({height: size.height, width: event.currentTarget.value})
        setSizeBoard({height: size.height, width: event.currentTarget.value})
    }

    function handleChangeSizeWidth(event: any) {
        console.log(sizeBoard)
        setSize({height: event.currentTarget.value, width: size.width})
        setSizeBoard({height: event.currentTarget.value, width:size.width})
    }

    return (
        <div className={"input"}>
            <h6>Width</h6>
            <input type="number" value={size.width} onChange={event => handleChangeSizeHeight(event)} placeholder={"width"} />
            <h6>Height</h6>
            <input type="number" value={size.height} onChange={event => handleChangeSizeWidth(event)} placeholder={"height"}/>
        </div>
    );
};

export default InputComponent;