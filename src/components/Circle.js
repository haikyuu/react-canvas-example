import React from 'react'
import { Circle } from 'react-konva'
import { observer } from 'mobx-react'
function circle(props){
  return (
    <Circle
     x={props.x}
     y={props.y}
     radius={props.size}
     cornerRadius={5}
     fill={'steelblue'}
     shadowBlur={10}
     onClick={props.onClick}
     onWheel={props.onWheel}
     onDragEnd={props.onDragEnd}
     draggable
     shadowColor='black'
   />
 )
}
export default observer(circle)
