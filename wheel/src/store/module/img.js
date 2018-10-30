import {getImageList, getCategoryImgList, getModelImageYearColor} from '../../api/index';

const state = {
  ImageList: [],
  CategoryImgList: [],
  isShow: false,
  list: [],
  ModelImageYearColor: {},
  swiperIsShow:false,
  obj: {}
}

const mutations = {
  updateImageList(state,payload){
    state.ImageList = payload
  },
  updateCategoryImgList(state,payload){
    state.CategoryImgList = payload
  },
  updateIsShow(state,payload){
    state.isShow = payload
  },
  updateModelImageYearColor(state,payload){
    state.ModelImageYearColor = payload
  },
  updateswiperIsShow(state){
    state.swiperIsShow = !state.swiperIsShow
  },
  updateObj(state,payload){
    state.obj = payload
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