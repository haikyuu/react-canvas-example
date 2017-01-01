import React from 'react'
import { Rect } from 'react-konva'
import { observer } from 'mobx-react'
function Rectangle(props){
  return (
    <Rect
     ref={props.id}
     key={props.id}
     x={props.x}
     y={props.y}
     onClick={props.onClick}
     onDragEnd={props.onDragEnd}
     onWheel={props.onWheel}
     width={props.size}
     height={props.size}
     cornerRadius={5}
     fill={'papayawhip'}
     shadowBlur={10}
     draggable
     shadowColor='black'
   />
 )
}
export default observer(Rectangle)
