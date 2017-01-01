import { extendObservable } from 'mobx'
import Element from './Element'
import _ from 'lodash'
export default class CanvasStore {
    constructor() {
      extendObservable(this, {
        width: 1200,
        height: 1200,
        elements:[
          new Element()
        ],
        get report() {
            return this.elements.length
        }
      })
    }
    addElement(props = {size: 50, x: 10, y: 10}){
      this.elements.push(new Element(props))
    }
    delete(e){
      const index = _.findIndex(this.elements, el=>el.element.id === e.element.id)
      this.elements.splice(index, 1)
    }
}
