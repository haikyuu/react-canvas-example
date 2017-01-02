import mobxstore from 'mobx-store'
import localstorage from 'mobx-store/localstorage'
let localstorageInitialState = localstorage.read('canvas')
let initialState
if (!localstorageInitialState.size || !localstorageInitialState.elements) {
  initialState = {
      size:{
        width: 1200,
        height: 1200,
      },
      elements: [],
  }
}else{
  initialState = localstorageInitialState
}

const store = mobxstore(initialState)
store.schedule([localstorage.write, 'canvas', store])
// store('elements').replace([])
export default store
