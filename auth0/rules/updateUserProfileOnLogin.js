function updateUserProfileOnLogin(user, context, callback) {
    // short-circuit if the user signed up already or is using a refresh token
    // context.stats.loginsCount > 1
    //  if (context.protocol === 'oauth2-refresh-token') {
    //    return callback(null, user, context);
    //  }
    try {
			const jwt = require('jsonwebtoken');
			const request = require('request');

    	const payload = { user: user };
    	const claims = {
        subject: user.user_id,
        audience: context.request.query.audience,
        issuer: context.request.hostname,
        expiresIn: '15m',
      };

	    const token = jwt.sign(
  	    {},
    	  configuration.DEPLOYED_WEBHOOK_SECRET,
      	claims
	    );

    	const registration = jwt.sign(
      	payload,
	      configuration.DEPLOYED_WEBHOOK_SECRET,
  	    claims
    	);

      console.log(registration);

	    request.post({ url: configuration.DEPLOYED_SIGNIN_ENDPOINT,
  	                 headers: {
    	                 Authorization: `Bearer ${token}`,
      	             },
        	           body: { payload: registration },
          	         json: true},
            	     function optionalCallback(error, httpResponse, body) {
	      if (error) {
  	      return console.error('Post failed:', error);
    	  }
      	console.log('Upload successful!  Server responded with:', body);

        return true;
    });
  }
  catch(error) {
    console.log(error);
    throw new Error(error.message);
  }

  callback(null, user, context);
}
