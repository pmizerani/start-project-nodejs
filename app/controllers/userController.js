const UserModel = require('../models/user');
const UserContactModel = require('../models/user_contact');
const UserWorkInformationModel = require('../models/user_work_information');
const UserInformationModel = require('../models/user_information');
const UserLogsController = require('./userLogsController');
const AccessLevelModel = require('../models/accessLevelModel');
const Messages = require('../helpers/messages');
const encrypt = require('../helpers/utils').encrypt;

class UserController {

	/**
     * create
	 * @param req
	 * @param res
     * @method POST
     * route /api/user
	 */
	create(req, res) {

		const errors = [];
		const data = req.body || {};

		if ( ! data.id_access_level ) errors.push(`ID Access Level ${Messages.MSG04}`);
		if ( ! data.name ) errors.push(`Name ${Messages.MSG04}`);
		if ( ! data.enable ) errors.push(`Enable ${Messages.MSG04}`);
		if ( ! data.email ) errors.push(`Email ${Messages.MSG04}`);
		if ( ! data.password ) errors.push(`Password ${Messages.MSG04}`);

		if(data.user_information) {
			if ( ! data.user_information.cpf ) errors.push(`CPF ${Messages.MSG04}`);
			if ( ! data.user_information.birthdate ) errors.push(`Birthdate ${Messages.MSG04}`);
			if ( ! data.user_information.address ) errors.push(`Address ${Messages.MSG04}`);
			if ( ! data.user_information.number ) errors.push(`Number ${Messages.MSG04}`);
			if ( ! data.user_information.zipcode ) errors.push(`Zipcode ${Messages.MSG04}`);
		}

		if(data.user_contact) {
			data.user_contact.forEach(element => {
				if ( ! element.type ) errors.push(`Type ${Messages.MSG04}`);
				if ( ! element.description ) errors.push(`Description ${Messages.MSG04}`);
			});
		}

		if(data.user_work_information) {
			data.user_work_information.forEach(element => {
				if ( ! element.id_specialization ) errors.push(`ID Specialization ${Messages.MSG04}`);
				if ( ! element.id_state_specialization ) errors.push(`ID state specialization ${Messages.MSG04}`);
				if ( ! element.cns ) errors.push(`CNS ${Messages.MSG04}`);
			});
		}

		if (errors.length > 0) {
			res.badRequest(errors);
			return;
		}

		const created_at = new Date();

		const userData = {
			id_access_level: data.id_access_level,
			name: data.name,
			photo: data.photo,
			digital: data.digital,
			enable: data.enable,
			email: data.email,
			password: encrypt(data.password),
			created_at: created_at
		}

		//Insert new data
		UserModel.insert(userData).then(result => {

			//Check user information to be created
			if(data.user_information) {

				const userInformation = {
					id_user: result[0],
					cpf: data.user_information.cpf,
					rg: data.user_information.rg,
					state_emitter: data.user_information.state_emitter,
					birthdate: data.user_information.birthdate,
					address: data.user_information.address,
					number: data.user_information.number,
					complement: data.user_information.complement,
					zipcode: data.user_information.zipcode
				}

				UserInformationModel.insert(userInformation).then(resultInfo => {
					//ok
				}).catch(err => {
					const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao criar user information para usuário ID: ${result[0]}`;
					UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
				});

			}

			//Check user contact to be created
			if(data.user_contact) {

				data.user_contact.forEach(element => {

					const userContact = {
						id_user: result[0],
						type: element.type,
						description: element.description
					}

					UserContactModel.insert(userContact).then(resultContact => {
						//ok
					}).catch(err => {
						const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao criar user contact para usuário ID: ${result[0]}`;
						UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
					})

				});

			}

			//Check user work information
			if(data.user_work_information) {

				data.user_work_information.forEach(element => {

					const userWork = {
						id_user: result[0],
						id_specialization: element.id_specialization,
						id_state_specialization: element.id_state_specialization,
						cns: element.cns,
						logo: element.logo
					}

					UserWorkInformationModel.insert(userWork).then(resultWork => {
						//ok
					}).catch(err => {
						const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao criar user work information para usuário ID: ${result[0]}`;
						UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
					})

				});

			}

			res.sendJSON(result);

			const message = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id} criou user ID ${result}`;
			UserLogsController.create(req.authenticatedUser.id, message, 'G');

        }).catch(err => {
			res.internalError(err);
        });

    }//end create

	/**
     * update
	 * @param req
	 * @param res
     * @method PUT
     * route /api/user/:id
	 */
	update(req, res) {

		const errors = [];
		const data = req.body || {};
		const id = req.params.id || {};

		if ( ! id ) errors.push(`ID ${Messages.MSG04}`);
		if ( ! data.id_access_level ) errors.push(`ID Access Level ${Messages.MSG04}`);
		if ( ! data.name ) errors.push(`Name ${Messages.MSG04}`);
		if ( ! data.enable ) errors.push(`Enable ${Messages.MSG04}`);
		if ( ! data.email ) errors.push(`Email ${Messages.MSG04}`);
		if ( ! data.password ) errors.push(`Password ${Messages.MSG04}`);

		if(data.user_information) {
			if ( ! data.user_information.cpf ) errors.push(`CPF ${Messages.MSG04}`);
			if ( ! data.user_information.birthdate ) errors.push(`Birthdate ${Messages.MSG04}`);
			if ( ! data.user_information.address ) errors.push(`Address ${Messages.MSG04}`);
			if ( ! data.user_information.number ) errors.push(`Number ${Messages.MSG04}`);
			if ( ! data.user_information.zipcode ) errors.push(`Zipcode ${Messages.MSG04}`);
		}

		if(data.user_contact) {
			data.user_contact.forEach(element => {
				if ( ! element.type ) errors.push(`Type ${Messages.MSG04}`);
				if ( ! element.description ) errors.push(`Description ${Messages.MSG04}`);
			});
		}

		if(data.user_work_information) {
			data.user_work_information.forEach(element => {
				if ( ! element.id_specialization ) errors.push(`ID Specialization ${Messages.MSG04}`);
				if ( ! element.id_state_specialization ) errors.push(`ID state specialization ${Messages.MSG04}`);
				if ( ! element.cns ) errors.push(`CNS ${Messages.MSG04}`);
			});
		}

		if (errors.length > 0) {
			res.badRequest(errors);
			return;
		}

		const updated_at = new Date();

		const userData = {
			id_access_level: data.id_access_level,
			name: data.name,
			photo: data.photo ? data.photo : null,
			digital: data.digital ? data.digital : null,
			enable: data.enable,
			email: data.email,
			password: encrypt(data.password),
			updated_at: updated_at
		}

		//Update data
		UserModel.update(userData, {id:id}).then(result => {

			//Check user information to be updated
			if(data.user_information) {

				const userInformation = {
					id_user: id,
					cpf: data.user_information.cpf,
					rg: data.user_information.rg,
					state_emitter: data.user_information.state_emitter,
					birthdate: data.user_information.birthdate,
					address: data.user_information.address,
					number: data.user_information.number,
					complement: data.user_information.complement,
					zipcode: data.user_information.zipcode
				}

				UserInformationModel.update(userInformation, {id_user: id}).then(resultInformation => {
					//ok
				}).catch(err => {
					const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao excluir user information para usuário ID: ${id}`;
					UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
				})

			}

			//Delete previous contacts
			UserContactModel.delete({id_user:id}).then(resultContactDelete => {

				if(data.user_contact) {

					//Iterate on each contact
					data.user_contact.forEach(element => {

						const userContact = {
							id_user: id,
							type: element.type,
							description: element.description
						}

						UserContactModel.insert(userContact).then(resultContact => {
							//ok
						}).catch(err => {
							const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao criar user contact para usuário ID: ${id}`;
							UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
						})

					});

				}

			}).catch(err => {
				const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao excluir user contact para usuário ID: ${id}`;
				UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
			});

			UserWorkInformationModel.delete({id_user:id}).then(resultWorkDelete => {

				//Check user work information
				if(data.user_work_information) {

					data.user_work_information.forEach(element => {

						const userWork = {
							id_user: id,
							id_specialization: element.id_specialization,
							id_state_specialization: element.id_state_specialization,
							cns: element.cns,
							logo: element.logo
						}

						UserWorkInformationModel.insert(userWork).then(resultWork => {
							//ok
						}).catch(err => {
							const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao criar user work information para usuário ID: ${id}`;
							UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
						})

					});

				}

			}).catch(err => {1
				const messageErro = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id}, erro ao excluir user work information para usuário ID: ${id}`;
				UserLogsController.create(req.authenticatedUser.id, messageErro, 'G');
			})


			res.sendJSON(result);

			const message = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id} atualizou user ID ${id}`;
			UserLogsController.create(req.authenticatedUser.id, message, 'G');

		}).catch(err => {
			res.internalError(err);
		});

	}//end update

	/**
	 * findAll
	 * @param req
	 * @param res
	 * @method GET
	 * route /api/user
	 */
	findAll(req, res) {

		//Get all
		UserModel.find().then(result => {
			res.sendJSON(result);
		}).catch(err => {
			res.internalError(err);
		});

	}//end findAll

	/**
	 * findById
	 * @param req
	 * @param res
	 * @method GET
	 * route /api/user/:id
	 */
	findById(req, res) {

		const errors = [];
		const id = req.params || {} ;
		let user = {};

		if ( ! id ) errors.push(`ID ${Messages.MSG04}`);

		if (errors.length > 0) {
			res.badRequest(errors);
			return;
		}

		//Get one
		UserModel.find(id).then(result => {

			user = result[0];

			let getAccess = getAccessLevels.bind(this, user.id_access_level);
			let getWork = getUserWork.bind(this, user.id, getAccess);
			let getContact = getUserContact.bind(this, user.id, getWork);
			getUserInformation(user.id, getContact);

		}).catch(err => {
			res.internalError(err);
		});

		/**
		 * getUserInformation
		 * @param userId
		 * @param {getUserContact} callBack
		 */
		function getUserInformation(userId, callBack) {

			UserInformationModel.find({ id_user:userId }).then(result => {

				user.user_information = result[0];
				callBack();

			}).catch(err => {
				res.internalError(err);
			});

		}//end getUserInformation

		/**
		 * getUserContact
		 * @param userId
		 * @param {getUserWork} callBack
		 */
		function getUserContact(userId, callBack) {

			UserContactModel.find({ id_user:userId }).then(result => {

				user.user_contact = result;
				callBack();

			}).catch(err => {
				res.internalError(err);
			});

		}//end getUserContact

		/**
		 * getUserWork
		 * @param userId
		 * @param callBack
		 */
		function getUserWork(userId, callBack) {

			UserWorkInformationModel.findByUser({ id_user:userId }).then(result => {

				user.user_work_information = result;
				callBack();

			}).catch(err => {
				res.internalError(err);
			});

		}//end getUserWork

		/**
		 * getAccessLevels
		 * @param id_access_level
		 */
		function getAccessLevels(id_access_level) {

			let accessLevel = {};

			//Find access level
			AccessLevelModel.find({ id:id_access_level }).then(result => {

				accessLevel = result[0];

				//Find menus
				AccessLevelModel.findMenus({id_access_level}).then(resultMenus => {

					accessLevel.menus = resultMenus;
					user.access_level = accessLevel;

					res.sendJSON(user);

				}).catch(err => {
					res.internalError(err);
				});

			}).catch(err => {
				res.internalError(err);
			});

		}//end getAccessLevels

	}//end findById

	/**
	 * delete
	 * @param req
	 * @param res
	 * @method DELETE
	 * route /api/user/:id
	 */
	delete(req, res) {

		const errors = [];
		const id = req.params || {} ;

		if ( ! id ) errors.push(`ID ${Messages.MSG04}`);

		if (errors.length > 0) {
			res.badRequest(errors);
			return;
		}

		//Delete one
		UserModel.delete(id).then(result => {

			res.sendJSON(result);

			const message = `Usuário ${req.authenticatedUser.name} com ID ${req.authenticatedUser.id} excluiu user ID ${id.id}`;
			UserLogsController.create(req.authenticatedUser.id, message, 'G');

		}).catch(err => {
			res.internalError(err);
		});

	}//end delete

}

module.exports = new UserController();