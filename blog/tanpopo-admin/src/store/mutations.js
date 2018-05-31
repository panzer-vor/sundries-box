import * as types from './mutation-types'



export default {
  [types.LOGIN](state , {name , data}){
    saveState(name , data)
    state[name] = data
  },
};

let saveState = (name,data)=>{
  data = JSON.stringify(data)
  localStorage.setItem(name , data)
}
