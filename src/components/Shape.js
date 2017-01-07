import React from 'react'
import { Circle, Rect, Line } from 'react-konva'
import { observer } from 'mobx-react'
import {CanvasStore} from '../stores'
import { find } from 'lodash/fp'
function Shape(props){
  // debugger
  const {
    coords, radius, type, width, height, id,
    onDragEnd, onWheel, onClick, onDragMove,
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
        onDragMove={onDragMove}
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
       onDragMove={onDragMove}
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
 }else if (type === 'line'){
   const coords1 = CanvasStore('elements', find(e=>e.id === props.linkedShapesIds[0])).coords
   const coords2 = CanvasStore('elements', find(e=>e.id === props.linkedShapesIds[1])).coords
   return (<Line
     points={[
       coords1.x,
       coords1.y,
       coords2.x,
       coords2.y,
     ]}
     stroke={'lightblue'}
     strokeWidth={4}
     lineCap={'round'}
     lineJoin={'round'}
   />)
 }else{
   const error = `Unknown type ${type} given to Shape component as a prop `
   console.warn(error)
   return null
 }
}
export default observer(Shape)
