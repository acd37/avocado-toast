module.exports = function(app) {
	const bcrypt = require('bcryptjs');
	const db = require('../../models');
	const passport = require('passport');

	// @route GET users/test
	// @desc tests the  users route
	app.get('/api/users/test', (req, res) => res.json({ msg: 'Users routes works!' }));

	// @route PUT  api/users/income
	// @desc adds income to user profile

	app.put('/api/users/income', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.User
			.findOne({
				where: {
					id: req.user.id
				}
			})
			.then((user) => {
				let newBalance = parseFloat(user.remainingBalance) + parseFloat(req.body.amount);
				db.User
					.update(
						{ remainingBalance: newBalance },
						{
							where: {
								id: req.user.id
							}
						}
					)
					.then(() => {
						db.User
							.findOne({
								where: {
									id: req.user.id
								},
								include: [ { model: db.Transaction }, { model: db.Category } ]
							})
							.then((user) => {
								res.status(200).json(user);
							});
					});
			});
	});

	// @route POST api/users/
	// @desc creates a new user
	app.post('/api/users', (req, res) => {
		db.User
			.findOne({
				where: {
					email: req.body.email
				}
			})
			.then((user) => {
				if (user) {
					return res.status(400).json({ email: 'This email already exists.' });
				} else {
					const newUser = {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: req.body.password
					};

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;

							db.User
								.create(newUser)
								.then((user) => {
									res.status(200).json({
										message: 'User account successfully created.',
										userCreated: true
									});
								})
								.catch((err) => console.log(err));
						});
					});
				}
			});
	});

	// @route GET /api/users
	// @desc get a user by id
	app.get('/api/users/', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.User
			.findOne({
				where: {
					id: req.user.id
				},
				include: [ { model: db.Transaction }, { model: db.Category } ],
				order: [ [ db.Category, 'description', 'asc' ] ]
			})
			.then((user) => {
				res.status(200).json(user);
			})
			.catch((err) => console.log(err));
	});

	// @route PUT /api/users/
	// @desc reset the remaining balance user selection
	app.put('/api/users', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.User
			.findOne({
				where: {
					id: req.body.id
				}
			})
			.then((user) => {
				if (user) {
					user.update({
						remainingBalance: req.body.remainingBalance
					});

					res.status(200).json({
						msg: 'Remaining balance successfully updated.'
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	// @route DELETE /api/users/
	// @desc delete a user
	app.delete('/api/users', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.Category
			.destroy({
				where: {
					UserId: req.user.id
				}
			})
			.then(() => {
				db.User
					.destroy({
						where: {
							id: req.user.id
						}
					})
					.then(() => {
						res.status(200).json({
							msg: 'User was successfully deleted.',
							success: true
						});
					})
					.catch((err) => {
						console.log(err);
					});
			});
	});

	// @route PUT /api/users/:id
	// @desc update a user
	app.put('/api/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.User
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then((user) => {
				console.log(user);
				if (!user) {
					return res.status(400).json({ user: 'A user with this ID could not be found.' });
				} else {
					const updatedUser = {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email
					};

					user
						.update(updatedUser)
						.then((user) => {
							res.status(200).json({
								user,
								success: {
									profile: 'Your user profile has been successfully updated!'
								}
							});
						})
						.catch((err) => console.log(err));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	// @route /api/users/password/:id
	// @desc updates user password
	app.put('/api/users/password/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.User
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then((user) => {
				if (!user) {
					return res.status(400).json({ user: 'A user with this ID could not be found.' });
				} else {
					const updatedUser = {
						password: req.body.password
					};

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(updatedUser.password, salt, (err, hash) => {
							if (err) throw err;
							updatedUser.password = hash;

							user
								.update(updatedUser)
								.then((user) => {
									res.status(200).json({
										user,
										success: {
											password: 'Your password has been successfully updated!'
										}
									});
								})
								.catch((err) => console.log(err));
						});
					});
				}
			});
	});
};
