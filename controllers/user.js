const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");

module.exports.registerUser = (req,res) => {

  // Checks if the email is in the right format
  if (!req.body.email.includes("@")){
      return res.status(400).send({ error: "Email invalid" });
  }
  // Checks if the mobile number has the correct number of characters
  else if (req.body.mobileNo.length !== 11){
      return res.status(400).send({ error: "Mobile number invalid" });
  }
  // Checks if the password has atleast 8 characters
  else if (req.body.password.length < 8) {
      return res.status(400).send({ error: "Password must be atleast 8 characters" });
  // If all needed requirements are achieved
  } else {
      let newUser = new User({
          username : req.body.username,
          email : req.body.email,
          mobileNo : req.body.mobileNo,
          password : bcrypt.hashSync(req.body.password, 10)
      })

      return newUser.save()
      .then((result) => res.status(201).send({ message: "Registered Successfully" }))
      .catch(err => {
        console.error("Error in saving: ", err);
        return res.status(500).send({ error: "Error in save" })
      })
  }

};

module.exports.login = (req, res) => {

	if(req.body.email.includes("@")){
		return User.findOne({email: req.body.email})
		.then(result => {

			// User does not exist
			if(result === null){

				return res.status(404).send({ error: "No Email Found" });

			// User exists
			} else {

				// The compareSync method is used to compare a non encryted password from the login form to the encrypted password from the database and returns "true" or "false" value depending on the result.
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

				// If passwords match/result above is true
				if(isPasswordCorrect){

					// Generate an access token
					return res.status(200).send({
						access: auth.createAccessToken(result)
					})

				// Password do not match
				} else {

					return res.status(401).send({ error: "Email and passowrd do not match" });

				}

			}

		})
		.catch(err => {
			console.error("Error in find: ", err)
			return res.status(500).send({ error: "Error in find"})
		});

	} else {

		res.status(400).send({ error: "Invalid" });

	}
}

module.exports.userDetails = (req, res) => {

	try {
		
		return User.findById(req.user.id)
		.then(user => {

			if (user.id){
				user.password = "";
				return res.status(200).send({ user });

			} else {

				return res.status(404).send({ error: "User not found"});

			}

		})
		.catch(err => {
			console.error("Error in fetching user profile", err)
			return res.status(500).send({ error: 'Failed to fetch user profile' })
		})

	} catch (err){

		console.error("Error in user profile", err)
		return res.status(500).send({ error: 'Error in user profile' })
	}
};

module.exports.setAsAdmin = async (req, res) => {
	try {
			// Check if the current user is an admin
			if (!req.user.isAdmin) {
					return res.status(403).send({ error: "Only admin users can update admin status" });
			}

			// Get the user ID from the URL parameters
			const { userId } = req.params;

			// Find the user by ID and update their isAdmin field
			const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin: true });

			if (!updatedUser) {
					return res.status(404).send({ error: "User not found" });
			}

			// Return a success message
			return res.status(200).send({ message: "Admin status updated successfully" });
	} catch (error) {
			console.error(error);
			return res.status(500).send({ error: "Failed to update admin status" });
	}
};



module.exports.updatePassword = async (req, res) => {
	try {
		console.log(req.body);

		const {newPassword} = req.body;
		const {id} = req.user;

		// Hashing the new password in the req.body (newPassword)
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await User.findByIdAndUpdate(id, {password: hashedPassword});

		// Sending a success response
		res.status(200).json({message: "Password reset successfuly"})
	}
	catch {
		console.error(error);
		res.status(500).json({message: "Internal Server Error"})
	}
}


module.exports.singleUserDetails = async (req, res) => {
    try {
        // Check if the current user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).send({ error: "Only admin users can access user details" });
        }

        // Get the userId from the request parameters
        const { userId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Remove sensitive information before sending the response
        user.password = "";

        // Return the user details
        return res.status(200).send({ user });
    } catch (error) {
        console.error("Error in fetching user details", error);
        return res.status(500).send({ error: 'Failed to fetch user details' });
    }
};