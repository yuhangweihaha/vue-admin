
const state = {
     planId: '',
     dataId:''
}

// getters
const getters = {
    planId : state => state.planId,
    dataId : state => state.dataId
}

// actions
const actions = {
	     
}

// mutations
const mutations = {
	updatePlanId (state, data) {
    	state.planId = data;
  },
  updatedataId (state, data) {
    state.dataId = data;
},
}

export default {
  state,
  getters,
  actions,
  mutations
}
