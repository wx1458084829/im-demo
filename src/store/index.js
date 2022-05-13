import { createStore } from 'vuex'

export default createStore({
  state: {
    imConn:{}
  },
  getters: {
    getImConn: (state) => {
      return state.imConn
    }
  },
  mutations: {
    initConn(state,imConn){
      state.imConn = imConn;
    }
  },
  actions: {
  },
  modules: {
  }
})
