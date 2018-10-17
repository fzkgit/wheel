import {getImageList, getCategoryImgList, getModelImageYearColor} from '../../api/index';

const state = {
  ImageList: [],
  CategoryImgList: [],
  isShow: false,
  list: [],
  ModelImageYearColor: {},
  swiperIsShow:false
}

const mutations = {
  updateImageList(state,payload){
    state.ImageList = payload
  },
  updateCategoryImgList(state,payload){
    state.CategoryImgList = payload
  },
  updateIsShow(state){
    state.isShow = !state.isShow
  },
  updateModelImageYearColor(state,payload){
    state.ModelImageYearColor = payload
  },
  updateswiperIsShow(state){
    state.swiperIsShow = !state.swiperIsShow
  }
}

const actions = {
  sendImageList({commit},payload){
    getImageList(payload).then(res => {
      commit('updateImageList',res.data)
    })
  },
  sendCategoryImgList({commit,state},payload){
    getCategoryImgList(payload).then(res=>{
      state.list = state.list.concat(res.data.List)
      res.data.List = state.list
      commit('updateCategoryImgList',res.data)
    })
  },
  sendModelImageYearColor({commit,state},payload){
    getModelImageYearColor(payload).then(res=>{
      commit('updateModelImageYearColor',res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}