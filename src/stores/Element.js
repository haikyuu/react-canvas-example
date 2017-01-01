import { extendObservable } from 'mobx'
var _id = 1
export default class Element {
    constructor(element) {
      extendObservable(this, {
        element:{
           ...{x: 0, y: 0, size: 50, type: 'rectangle'},
           ...element,
           id: ++_id,
        },
      })
    }
    get surface(){
      return this.element.id
    }
    edit({x, y, size}){
      // debugger
      if (x) {
        this.element.x = x
      }
      if (y) {
        this.element.y = y
      }
      if (size) {
        this.element.size = size
      }
    }
}
