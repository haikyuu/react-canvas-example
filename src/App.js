import React from 'react'
import './App.css'
import {
    Layer, Stage
} from 'react-konva'
import { CanvasStore } from './stores'
import { observer } from 'mobx-react'
import {
  Shape
} from './components'
// import DevTools from 'mobx-react-devtools'
import { map, findIndex } from 'lodash/fp'
import uuid from 'uuid/v1'
import _ from 'lodash'
const store = CanvasStore

class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        linked: false
      }
    }
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
      //On delete CASCADE
      const lineIndex = store(
        'elements',
        findIndex(el=>{
          if (el.type === 'line' && el.linkedShapesIds.indexOf(e.id) > -1) {
            return true
          }
          return false
        }))
      if (lineIndex !== -1) {
        store('elements').splice(lineIndex, 1)
      }
      store('elements').splice(index, 1)
    }
    reset() {
      store('elements').replace([])
    }
    onWheel({event, e}) {
      const index = store('elements', findIndex(el=>el.id === e.id))
      let size
      if (store('elements')[index].type === 'circle') {
        size = store('elements')[index].radius
      }else{
        size = store('elements')[index].width
      }
      let newSize = size + event.evt.deltaX * 5
      if (newSize < 10) {
        newSize = 10
      }
      store('elements')[index] = {
        ...store('elements')[index],
        width: newSize,
        height: newSize,
        radius: newSize,
      }
    }
    onDragEnd({event, e}) {
      const index = store('elements', findIndex(el=>el.id === e.id))
      console.log("drag end");
      store('elements')[index].coords = {
        x: event.target.attrs.x,
        y: event.target.attrs.y,
      }
      this.enableHistory()
    }
    onDragStart({event, e}) {
      const index = store('elements', findIndex(el=>el.id === e.id))
      console.log("drag start");
      // this.enableHistory()
      store('elements')[index].coords = {
        x: event.target.attrs.x,
        y: event.target.attrs.y,
      }
    }
    onDragMove({event, e}) {
      const index = store('elements', findIndex(el=>el.id === e.id))
      console.log("drag move");
      this.disableHistory()
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
            onDragMove={(event)=>this.onDragMove({event, e})}
            onDragStart={(event)=>this.onDragStart({event, e})}
            onWheel={(event)=>this.onWheel({event, e})}
            {...e} />
        )
      }))
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
    test(){
      store.test()
    }
    enableHistory(){
      store.enableHistory()
    }
    disableHistory(){
      store.disableHistory()
    }
    linkShapes(){
      const i = _.findIndex(store('elements'), e=>e.type==='line')
      if (i !== -1) {
        return console.warn('only one line is allowed. :p');
      }
      if (store('elements', map(e=>e)).length > 1 ) {
        store('elements').push({
          linkedShapesIds:[
            store('elements')[0].id,
            store('elements')[1].id,
          ],
          id: uuid(),
          type: 'line',
        })
        this.setState({
          linked: true
        })
      }
    }
    render() {
        return (
          <div>
            <button onClick={this.addRectangle}>+ rectangle</button>
            <button onClick={this.addCircle}>+ circle</button>
            <button onClick={this.undo}>undo</button>
            <button onClick={this.redo}>redo</button>
            <button onClick={this.linkShapes.bind(this)}>link</button>
            <button onClick={this.reset.bind(this)}>reset</button>
            <button onClick={this.test.bind(this)}>test</button>
            <button onClick={this.enableHistory.bind(this)}>enable History</button>
            <button onClick={this.disableHistory.bind(this)}>disable History</button>
            {/* <DevTools /> */}
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
