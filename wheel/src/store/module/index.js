import { getMasterBrandList, getMakeList } from '../../api/index'
const state = {
  MasterBrandList: {},
  MakeList: [],
  ishidden:false
}

const mutations = {
  masterBrandList(state,payload) {
    state.MasterBrandList = payload
    state.ishidden = true
  },
  makeList(state,payload) {
    state.MakeList = payload
  }
}

const actions = {
  masterBrandListAsync({commit}){
    getMasterBrandList().then(res=>{
      let obj = {}
      res.data.forEach(item=>{
        if(obj[item.Spelling.slice(0,1)]===undefined){
          obj[item.Spelling.slice(0,1)] = []
          obj[item.Spelling.slice(0,1)].push(item)
        }else{
          obj[item.Spelling.slice(0,1)].push(item)
        }
      })
      commit('masterBrandList',obj)
    })
  },
  makeListAsync({commit},payload){
    getMakeList(payload).then(res=>{
      commit('makeList',res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}