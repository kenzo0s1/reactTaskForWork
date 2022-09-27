import React from 'react';
import '../../../styles/dashboard/element.scss'
import {ElementDashboard} from "../../../interfaces/dashboard/element";

const Element = (props: ElementDashboard) => {
    return (
            <div className="elem-data">
                {props.value}
            </div>
    );
};

export default Element;