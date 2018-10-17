import { getInfoAndList } from '../../api/index'
import {mergeCar,sortCar,filter,years} from '../../utils/index'
const state = {
  detailArr: [],
  isHidden:false,
  Carmoney: []
}

const mutations = {
  updateDetail(state,payload){
    let obj = {}
    let newCarmoney = {}
    obj['全部'] = mergeCar(sortCar(payload.list))
    years(payload.list).forEach(item=>{
      obj[item] = mergeCar(sortCar(filter(item,payload.list)))
      newCarmoney[item] = mergeCar(sortCar(filter(item,payload.list)))
    })
    payload.list = obj
    state.detailArr = payload
    state.Carmoney = newCarmoney
    state.isHidden = true
  }
}

const actions = {
  getDetailArr({commit},payload){
    getInfoAndList(payload).then(res=>{
      commit('updateDetail',res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}