import axios from 'axios'
export default {
  state:{
    imgsrc: "",
    imgname:'',
  },
  mutations: {
    SET_IMGSRC: (state, imgsrc) => {
      state.imgsrc = imgsrc
    },
    SET_IMGNAME: (state, imgname) => {
      state.imgname = imgname
    },
  },
  actions: {
    getInfo(context) {
      context.commit('SET_IMGSRC', "");
      context.commit('SET_IMGNAME', "");
    }
  }
}
