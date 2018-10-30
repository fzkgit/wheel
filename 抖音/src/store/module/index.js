const state = {
  isShow:false,
  data: [],
}

const mutations = {
  updateIsShow(state){
    state.isShow = !state.isShow
  },
  updateDate(state,payload){
    state.data = state.data.concat(payload)
  },
  updateNum(state,payload) {
    state.data.forEach((item,index)=>{
      if(payload===index){
        if(!item.isNumChange){
          item.num++
          item.isNumChange = true
        } else {
          item.num--
          item.isNumChange = false
        }
      }
    })
  },
  updateNewData(state,payload){
    state.data.unshift(payload)
  }
}

const actions = {
  getData({commit}){
    fetch('https://www.easy-mock.com/mock/5b892bc730db1803ed746a52/example/sx/yk')
    .then(res=>res.json())
    .then(body=>{
      commit('updateDate',body)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}