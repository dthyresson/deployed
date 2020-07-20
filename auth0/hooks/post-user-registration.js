/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
const jwt = require('jsonwebtoken');
const request = require('request');

module.exports = function (user, context, cb) {
  console.log('>>> in post-user-registration-hook');
  try {
    console.log(context);
    const payload = { user: user, connection: context.connection };
    const claims = {
      subject: `${context.connection.name}|${user.id}`,
      audience: context.webtask.headers.referer || user.tenant,
      issuer: context.webtask.meta['hook-name'],
      expiresIn: '15m',
    };

    const token = jwt.sign(
      {},
      context.webtask.secrets.DEPLOYED_WEBHOOK_SECRET,
      claims
    );

    const registration = jwt.sign(
      payload,
      context.webtask.secrets.DEPLOYED_WEBHOOK_SECRET,
      claims
    );

    request.post({ url: context.webtask.secrets.DEPLOYED_REGISTER_ENDPOINT,
                   headers: {
                     Authorization: `Bearer ${token}`,
                   },
                   body: { payload: registration },
                   json: true},
                 function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
      // console.log(registration);
      return true;
    });
  }
  catch(error) {
    console.log(error);
    throw new Error(error.message);
  }

  cb();
};
