import * as types from './mutations_types';

module.exports = {
	update_remark_dialogs: ({
		commit
	}, remark_dialog) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_REMARK_DIALOGS,remark_dialog);
			resolve();
		});
	},
	delete_remark_dialogs:({
		commit
	}, dialog_id) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_REMARK_DIALOGS,dialog_id);
			resolve();
		});
	},
	update_traderule_remark:({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_REMARK_DIALOGS);
			resolve();
		});
	}

};