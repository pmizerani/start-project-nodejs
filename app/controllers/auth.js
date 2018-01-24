const UserModel = require('../models/user');
const UserInformationModel = require('../models/user_information');
const UserContactModel = require('../models/user_contact');
const UserWorkInformationModel = require('../models/user_work_information');
const AccessLevelModel = require('../models/accessLevelModel');
const valid = require('../helpers/validation');
const encrypt = require('../helpers/utils').encrypt;
const jwt = require('../classes/jwt');

class AuthController {

	/**
	 * auth
	 * @param req
	 * @param res
	 * @method POST
	 * route /api/auth
	 */
	auth(req, res) {

		const errors = [];
		const {email, password} = req.body || {};
		let user = {};
		
		if (!valid.email(email)) errors.push('E-mail address is not valid');
		if (!password) errors.push('Password is required');

		if (errors.length > 0) {
			res.badRequest(errors);
			return;
		}

		UserModel.findByUserCredentials({
			email, password: encrypt(password)
		}).then(result => {

			const logged = result.length > 0;

			if (!logged) {
				res.unauthorized();
				return;
			}

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

					const token = jwt.create(user);
					res.sendJSON({token});

				}).catch(err => {
					res.internalError(err);
				});

			}).catch(err => {
				res.internalError(err);
			});

		}//end getAccessLevels

	}//end auth

}

module.exports = new AuthController();