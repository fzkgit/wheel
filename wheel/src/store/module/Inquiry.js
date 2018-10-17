import { getCityInfo,getInquiryInfo ,getCityList ,getCityEveryList} from '../../api/index'

const state = {
  cityInfo: {},
  inquiryInfo: [],
  CityList: [],
  CityEveryList: [],
  isHidden:true,
  ShowCity: undefined,
  carId:0,
  isShowAlertContent:false
}

const mutations = {
  updataCityInfo(state,payload){
    state.cityInfo = payload
  },
  updataInquiryInfo(state,payload){
    state.inquiryInfo = payload
  },
  updataCityList(state,payload){
    state.CityList = payload
  },
  updataCityEveryList(state,payload){
    state.CityEveryList = payload
  },
  updataisHidden(state){
    state.isHidden = !state.isHidden
  },
  updataShowCity(state,payload){
    state.ShowCity = payload
  },
  updataCarId(state,payload){
    state.carId = payload
  },
  updataAlertContent(state){
    state.isShowAlertContent = !state.isShowAlertContent
  }
}

const actions = {
  sendCityInfo({commit}) {
    getCityInfo().then( res => {
      commit('updataCityInfo', res.data)
    })
  },
  sendInquiryInfo({commit},payload) {
    getCityInfo().then( res => {
      getInquiryInfo(payload.carId,payload.cityId || res.data.CityID).then( body => {
        commit('updataInquiryInfo', body.data)
      })
    })
  },
  sendCityList({commit}){
    getCityList().then(res=>{
      commit('updataCityList',res.data)
    })
  },
  sendCityEveryList({commit},payload){
    getCityEveryList(payload).then(res=>{
      commit('updataCityEveryList',res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}