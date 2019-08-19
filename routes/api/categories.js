module.exports = function (app) {
    const db = require("../../models");
    const passport = require('passport');

    // @route GET categories/test
    app.get("/api/categories/test", (req, res) =>
        res.json({ msg: "Categories routes works!" })
    );

    // @route PUT categories/reset
    app.put('/api/categories/reset', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Category.update(
            { amount: 0 },
            {
                where: {
                    UserId: req.user.id
                }
            }
        ).then(() => {
            db.User.update({
                remainingBalance: 0
            },
                {
                    where: {
                        id: req.user.id
                    }
                }).then(() => {
                    db.User.findOne({
                        where: {
                            id: req.user.id
                        },
                        include: [
                            { model: db.Transaction },
                            { model: db.Category }
                        ]
                    }).then(user => {
                        res.status(200).json(user);
                    })

                })

        })
    })

    // @route GET all categories
    // @desc gets all categories
    // app.get('/api/categories', passport.authenticate('jwt', { session: false }), (req, res) => {
    //     db.Category.findAll({
    //         where: {
    //             UserId: req.user.id
    //         }
    //     }).then(categories => {
    //         if (!categories) {
    //             res.status(404) > json({
    //                 categories: "No categories found for this user."
    //             })
    //         } else {
    //             res.status(200).json(categories)
    //         }

    //     })
    // })

    // @route POST api/categories/
    // @desc creates a new category
    app.post("/api/categories", passport.authenticate('jwt', { session: false }), (req, res) => {

        db.Category.findOne({
            where: {
                UserId: req.body.UserId,
                description: req.body.description
            }
        }).then(category => {
            if (category) {
                return res.status(400).json({ email: "This category already exists for this user." })
            } else {
                const newCategory = {
                    description: req.body.description,
                    UserId: req.body.UserId
                };

                db.Category.create(newCategory)
                    .then(category => {
                        db.User.findOne({
                            where: {
                                id: req.body.UserId,
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
                    .catch(err => console.log(err));

            }
        });
    });


    // @route GET api/categories/:userId/
    // @desc gets all categories  for a particular user
    // app.get("/api/categories/:userId", passport.authenticate('jwt', { session: false }), (req, res) => {
    //     db.Category.findAll({
    //         where: {
    //             UserId: req.params.userId,
    //         }
    //     })
    //         .then(categories => {
    //             res.status(200).json(categories)
    //         })
    //         .catch(err => console.log(err));
    // })

    // @route PUT api/categories/load
    // @desc  moves funds to a category from unbudgeted amount (user.remainingBalance)
    app.put("/api/categories/load", passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Category.findOne({
            where: {
                category_id: req.body.CategoryId
            }
        }).then(category => {
            let newBalance = parseFloat(category.amount) + parseFloat(req.body.transferAmount);
            category.update({
                amount: newBalance
            })

            db.User.findOne({
                where: {
                    id: category.UserId
                }
            }).then(user => {
                let newBalance = parseFloat(user.remainingBalance) - parseFloat(req.body.transferAmount);
                user.update({
                    remainingBalance: newBalance
                })
                    .then(() => {
                        return db.User.findOne({
                            where: {
                                id: req.user.id
                            },
                            include: [
                                { model: db.Transaction },
                                { model: db.Category }
                            ]
                        })
                            .then((user) => res.json(user))


                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
                .catch(err => {
                    console.log(err)
                })
        })
    })



    // @route DELETE api/categories/
    // @desc deletes a category

    app.delete('/api/categories', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Category.findOne({
            where: {
                category_id: req.body.category_id
            }
        })
            .then(category => {

                category.destroy().then(() => {
                    db.User.findOne({
                        where: {
                            id: req.user.id
                        },
                        include: [
                            { model: db.Transaction },
                            { model: db.Category }
                        ]
                    }).then(user => {
                        let newBalance = parseFloat(user.remainingBalance) + parseFloat(category.amount);

                        user.update({
                            remainingBalance: newBalance
                        })
                        res.status(200).json(user);

                    })
                }

                )


            })
    })




    // @route PUT api/categories/load
    // @desc  moves funds to a category from unbudgeted amount (user.remainingBalance)
    app.put("/api/categories/release", passport.authenticate('jwt', { session: false }), (req, res) => {



        db.Category.findOne({
            where: {
                category_id: req.body.CategoryId
            }
        }).then(category => {
            let newBalance = parseFloat(category.amount) - parseFloat(req.body.releaseAmount);
            category.update({
                amount: newBalance
            })

            db.User.findOne({
                where: {
                    id: category.UserId
                }
            }).then(user => {
                let newBalance = parseFloat(user.remainingBalance) + parseFloat(req.body.releaseAmount);
                user.update({
                    remainingBalance: newBalance
                })
                    .then(() => {
                        return db.User.findOne({
                            where: {
                                id: req.user.id
                            },
                            include: [
                                { model: db.Transaction },
                                { model: db.Category }
                            ]
                        })
                            .then((user) => res.json(user))


                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
                .catch(err => {
                    console.log(err)
                })
        })
    })
}
