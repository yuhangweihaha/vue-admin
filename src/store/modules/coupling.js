import axios from 'axios'
export default {
    state:{
        active: 0,
        activeName: 'first',
    },
    mutations:{
        SET_ACTIVE:(state,active)=>{
            state.active = active
        },
        SET_ACTIVENAME:(state,activeName)=>{
            state.activeName = activeName
        }
    },
    actions:{
        getIfo(context){
            context.commit('SET_ACTIVE',0);
            context.commit('SET_ACTIVENAME','first');
        }
    }
}