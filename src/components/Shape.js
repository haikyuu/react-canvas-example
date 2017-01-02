import React from 'react'
import { Circle, Rect } from 'react-konva'
import { observer } from 'mobx-react'

function Shape(props){
  // debugger
  const {
    coords, radius, type, width, height, id,

    onDragEnd, onWheel, onClick,
  } = props
  if (type === 'circle') {
    return (
      <Circle
        ref={id}
        x={coords.x}
        y={coords.y}
        radius={radius}
        cornerRadius={5}
        fill={'steelblue'}
        shadowBlur={10}
        onClick={onClick}
        onWheel={onWheel}
        onDragEnd={onDragEnd}
        draggable
        shadowColor='black'
      />
    )
  }else if(type === 'rectangle'){
    return (
      <Rect
       ref={id}
       x={coords.x}
       y={coords.y}
       onClick={onClick}
       onDragEnd={onDragEnd}
       onWheel={onWheel}
       width={width}
       height={height}
       cornerRadius={5}
       fill={'papayawhip'}
       shadowBlur={10}
       draggable
       shadowColor='black'
     />
 )
 }else{
   const error = `Unknown type ${type} given to Shape component as a prop `
   console.warn(error)
   return <div>{error}</div>
 }
}
export default observer(Shape)
