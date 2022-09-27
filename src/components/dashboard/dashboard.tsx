import React, {useContext, useEffect, useState} from 'react';
import Element from "./element/element";
import '../../styles/dashboard/dashboard.scss'
import {currentWidgetContext} from "../../contexts/widgetContext";
import { DashboardInterface} from "../../interfaces/dashboard/dashboard";
import InputComponent from "./input";
import {dashboardWidgetContext} from "../../contexts/sizeBoard";

const Dashboard = (props : DashboardInterface) => {
    const {sizeBoard} = useContext(dashboardWidgetContext)
    // console.log(sizeBoard)
    let i = 0
    let arr: React.SetStateAction<{ id: number; value: string; visible: boolean; variableDrop: boolean; }[]> = []
    while (i < sizeBoard.width * sizeBoard.height){
        arr.push(
            {
                id: i,
                value:"",
                visible:false,
                variableDrop:true
            }
        )
        i++
    }
    // console.log(arr)
    const [itemsArr,setItemsArr ] = useState(arr)
    useEffect(() => {
        let num = 0

        setItemsArr(arr)
        while(num < sizeBoard.width*sizeBoard.height){
            let doc:any = document.getElementById(`${num}`)
            if (doc){
                doc.style.gridColumnStart = null
                doc.style.gridColumnEnd = null
                doc.style.gridRowStart = null
                doc.style.gridRowEnd = null
            }

            num++
        }
    },[sizeBoard]);
    const {context} = useContext(currentWidgetContext)
    function deleteItemsFromArr(index:any,count:any,startRow:number,rows:number){
        let copyArr = Object.assign([], itemsArr);
        for( let row = 0; row< rows; row++){
            console.log('row' + row)
            for( let i = 0; i < copyArr.length; i++){
                // @ts-ignore
                if ( copyArr[i].id ===  row*props.width+ index) {
                    if(row == 0){
                        copyArr.splice(  i+1 , count-1);
                    }else{
                        copyArr.splice(  i , count);
                    }
                }
            }
        }
        setItemsArr(copyArr)
    }


    function addItemsToArrayByStart(rows:number,index:any,height:number,width:number){
        let copyArr = Object.assign([], itemsArr);
        for(let row = 0 ; row < rows; row ++){
            for(let item = 0;item<copyArr.length;item++){
                // @ts-ignore
                if(copyArr[item].id == index){
                    if(row==0){
                        for(let countAdd = 1;countAdd < width;countAdd++){
                            copyArr.splice(  index+countAdd +(row*props.width) , 0,{id: index+countAdd+(row*props.width), visible: false, value: '' , variableDrop:true});
                        }
                    }else{
                        for(let countAdd = 0;countAdd < width;countAdd++){
                            copyArr.splice(  index+countAdd +(row*props.width) -1 , 0,{id: index+countAdd+(row*props.width), visible: false, value: '' , variableDrop:true});
                        }
                    }



                }
            }
        }
        setItemsArr(copyArr)
    }
    function setValueToSetItemsArr(index: number,value:any , visible:boolean,variableDrop:boolean , width:number,height:number ) {
        setItemsArr(prevState =>
            prevState.map(item =>
                item.id === index
                    ? { ...item, value: value , visible: visible ,variableDrop:variableDrop , width:width,height:height }
                    : item
            )
        )
    }

    function dragOverHandler(event: any,currentElement:any) {
        event.preventDefault()
        const index = currentElement.id
        const startRow = Math.trunc(currentElement.id / props.width)

        if((index) % props.width + context.width -1 < props.width && startRow + context.height - 1< props.height){

            if(!checkVisible(index) ){
                event.target.style.background = 'green'
                getStyle(event,index)

            }else{
                event.target.style.background = 'red'
            }
        }else{
            event.target.style.background = 'red'
        }
    }
    function checkVisible(index: number){
        let checkVisibleClear
        for(let row = 0; row<context.height;row++){
            // console.log("Row" + row)
            for(let column = 0 ; column<context.width ; column++ ){
                const count = index+column + (row * props.width)
                if(!itemsArr[count].visible && !checkVisibleClear ){
                     console.log(count+ 'is clear')
                }else{
                    checkVisibleClear = true
                }
            }
        }
        return checkVisibleClear
    }
    function getStyle(event:any,index:number) {

        event.currentTarget.style.gridColumnStart = (index % props.width)  +1
        event.currentTarget.style.gridColumnEnd = (index % props.width) +context.width +1
        event.currentTarget.style.gridRowStart = Math.trunc(index / props.width) + 1
        event.currentTarget.style.gridRowEnd = Math.trunc(index / props.width) + context.height + 1
    }
    function getNoneStyle(event :any){
        event.currentTarget.style.gridColumnStart = null
        event.currentTarget.style.gridColumnEnd = null
        event.currentTarget.style.gridRowStart = null
        event.currentTarget.style.gridRowEnd = null
    }
    function dropHandler(event: any , currentElement : any) {
        event.preventDefault()
        event.target.style.background = 'whitesmoke'
        const index = currentElement.id
        const startRow = Math.trunc(index / props.width)
        // console.log(startRow)
        if((index) % props.width + context.width -1 < props.width && startRow + context.height - 1< props.height){
            if(!checkVisible(index) ){
                deleteItemsFromArr(index,context.width,startRow,context.height)
                getStyle(event,index)
                setValueToSetItemsArr(index , context.value, true , false,context.width,context.height)
            }
        }

    }

    function dragLeaveHandler(event: any, variableDrop:boolean) {
        event.target.style.background = 'whitesmoke'
        if (variableDrop){
            getNoneStyle(event)
        }else{
            console.log('none')
        }
    }

    function dragEndHandler(event: any ) {

    }

    async function dragStartHandler(event: any, currentElement: any) {
        const index = currentElement.id
        addItemsToArrayByStart(context.height,index,currentElement.height,currentElement.width)
        setValueToSetItemsArr(index , '', false , true,currentElement.width,currentElement.height)
    }

    return (
        <div className={"dashMain"}>
            <InputComponent width={props.width} height={props.height}/>
            <div
                style={{gridTemplateColumns:`repeat(${props.width}, 1fr)`}}
                className={"dashboard"}
            >
                {
                    itemsArr.map((e) => {
                        return <div
                            id={`${e.id}`}
                            draggable={e.visible}
                            key={e.id}
                            className={"element"}
                            onDragStart={event => dragStartHandler(event , e)}
                            onDragOver={(event => {
                                dragOverHandler(event,e);
                            })}
                            onDrop={event => dropHandler(event,e)}
                            onDragEnd={event => {
                                dragEndHandler(event);
                            }}
                            onDragLeave={(event => {
                                dragLeaveHandler(event, e.variableDrop);
                            })}
                        >
                                    <Element
                                        id={e.id}
                                        value={e.value}
                                    />
                        </div>
                    })
                }
            </div>
        </div>

    );
};

export default Dashboard;