import React from 'react'
import './App.css'
import {
    Layer, Stage,
} from 'react-konva'
import { CanvasStore } from './stores'
import { observer } from 'mobx-react'
import {
  Shape
} from './components'
import DevTools from 'mobx-react-devtools'
import { map, findIndex } from 'lodash/fp'
import uuid from 'uuid/v1'
const store = CanvasStore

class App extends React.Component {
    addRectangle(){
      store('elements').push({
        coords:{
          x: 10,
          y: 10,
        },
        height: 50,
        width: 50,
        id: uuid(),
        type: 'rectangle',
      })
    }
    onClick(e) {
      const index = store('elements', findIndex(el=>el.id === e.id))
      store('elements').splice(index, 1)
    }
    onWheel({event, e}) {
      const newSize = e.size + event.evt.deltaX * 5
      if (newSize < 10) {
        return
      }
      const index = store('elements', findIndex(el=>el.id === e.id))
      store('elements')[index].size = newSize
    }
    onDragEnd({event, e}) {
      const index = store('elements', findIndex(el=>el.id === e.id))
      store('elements')[index].coords = {
        x: event.target.attrs.x,
        y: event.target.attrs.y,
      }
    }
    addCircle(){
      store('elements').push({
        coords:{
          x: 10,
          y: 10,
        },
        radius: 50/2,
        id: uuid(),
        type: 'circle',
      })
    }
    getElements(){
      const elements = store('elements', map(e=>{
        return (
          <Shape
            key={e.id}
            onClick={()=>this.onClick(e)}
            onDragEnd={(event)=>this.onDragEnd({event, e})}
            onWheel={(event)=>this.onWheel({event, e})}
            {...e} />
        )
      }))
      console.log("elements: ", elements)
      return elements
    }
    undo() {
      if (store.canUndo('elements')) {
        store.undo('elements')
      }
    }
    redo() {
      if (store.canRedo('elements')) {
        store.redo('elements')
      }
    }
    render() {
        return (
          <div>
            <button onClick={this.addRectangle}>+ rectangle</button>
            <button onClick={this.addCircle}>+ circle</button>
            <button onClick={this.undo}>undo</button>
            <button onClick={this.redo}>redo</button>
            <DevTools />
            <Stage ref="stage" width={store('size').get('width')} height={store('size').get('height')}>
              <Layer ref="layer">
                  {
                    this.getElements()
                  }
                </Layer>
              </Stage>

          </div>
        )
    }
}

export default observer(App)
