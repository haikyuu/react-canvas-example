import React from 'react';
import './App.css';
import {
    Layer, Stage, Group
} from 'react-konva';
import { CanvasStore } from './stores'
import { observer } from 'mobx-react'
import {
  Rectangle,
  Circle,
} from './components'
import DevTools from 'mobx-react-devtools';

const store = new CanvasStore()
class App extends React.Component {
    onClick(e) {
      store.delete(e)
    }
    onWheel({event, e}) {
      const newSize = e.element.size + event.evt.deltaX * 5
      if (newSize < 10) {
        return
      }
      e.edit({
        size: newSize,
      })
    }
    onDragEnd({event, e}) {
      e.edit({
        x: event.target.x(),
        y: event.target.y(),
      })
    }
    addRectangle(){
      store.addElement({type: 'rectangle'})
    }
    addCircle(){
      store.addElement({type: 'circle'})
    }
    render() {
        return (
          <div>
            <button onClick={this.addRectangle}>+ rectangle</button>
            <button onClick={this.addCircle}>+ circle</button>
            <DevTools />
            <Stage ref="stage" width={store.width} height={store.height}>
              <Layer ref="layer">
                <Group width={50} height={50} draggable ref="group">
                  {
                    store.elements.map(e=>{
                      if (e.element.type === 'rectangle') {
                        return (
                          <Rectangle
                            key={e.element.id}
                            ref={e.element.id}
                            {...e.element}
                            onClick={()=>this.onClick(e)}
                            onWheel={(event)=>this.onWheel({event, e})}
                            onDragEnd={(event)=>this.onDragEnd({event, e})}

                          />
                        )
                      }
                      if (e.element.type === 'circle') {
                        return (
                          <Circle
                            key={e.element.id}
                            ref={e.element.id}
                            {...e.element}
                            onClick={()=>this.onClick(e)}
                            onWheel={(event)=>this.onWheel({event, e})}
                            onDragEnd={(event)=>this.onDragEnd({event, e})}
                          />
                        )
                      }
                    })
                  }
                </Group>
                </Layer>
              </Stage>

          </div>
        );
    }
}

export default observer(App)
