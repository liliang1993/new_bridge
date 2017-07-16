import * as types from './mutations_types'
import Vue from 'vue';
module.exports = {
    [types.UPDATE_REMARK_DIALOGS](state,remark_dialog) {
        console.log('remark_dialog',remark_dialog);
        Vue.set(state.remark_dialogs,remark_dialog.key,remark_dialog.config);
    },
    [types.DELETE_REMARK_DIALOGS](state,remark_dialog_id) {
        console.log('555',state.remark_dialogs,remark_dialog_id)
            for(var k in state.remark_dialogs){
                    if(remark_dialog_id === k){
                        Vue.delete(state.remark_dialogs,k);
                    }
            }
    },
    [types.UPDATE_TRADERULE_REMARK](state) {
            state.update_traderule_remark = true;
    }
};