module.exports = function (app) {
    const bcrypt = require("bcryptjs");
    const db = require("../../models");
    const Sequelize = require("sequelize");


    // @route GET users/test
    app.get("/api/users/test", (req, res) =>
        res.json({ msg: "Users routes works!" })
    );

    // @route POST api/users/
    // @desc creates a new user
    app.post("/api/users", (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                return res.status(400).json({ email: "This email already exists." })
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
                        newUser.password = hash

                        db.User.create(newUser)
                            .then(user => {
                                res.status(200).json({ message: "User account successfully created." })
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    });

    // @route GET /api/users/:userId
    // @desc get a user by id

    // include: [ {
    //     model: m.message, as: 'groupMessages',
    //     attributes: ['id','message', 'type', 'thumb', 'createdAt','senderId'],
    //     include: [ {
    //         model: m.userMessage, as: 'messageState',
    //         attributes: ['id','state', 'messageId', 'recieverId', 'createdAt']
    //     }],
    //     limit:1
    // }],


    app.get("/api/users/", (req, res) => {
        db.User.findOne({
            where: {
                id: req.body.id,
            },
            include: [
                { model: db.Transaction },
                { model: db.Category }
            ]
        })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => console.log(err));
    })


    // UPDATE

    // @route PUT /api/users/reset
    // @desc reset the remaining balance user selection
    app.put('/api/users', (req, res) => {
        db.User.findOne({
            where: {
                id: req.body.id
            }
        })
            .then(user => {
                if (user) {
                    user.update({
                        remainingBalance: req.body.remainingBalance
                    })

                    res.status(200).json({
                        msg: "Remaining balance successfully updated."
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    })


    // @route DELETE /api/users
    // @desc delete a user
    app.delete('/api/users', (req, res) => {
        db.User.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(() => {
                res.status(200).json({ admin: "User was successfully deleted." })
            })
            .catch(err => {
                console.log(err);
            })
    })
}