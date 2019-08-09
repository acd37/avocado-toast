module.exports = function (app) {
    const db = require("../../models");
    const passport = require('passport');

    // @route GET categories/test
    app.get("/api/categories/test", (req, res) =>
        res.json({ msg: "Categories routes works!" })
    );

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
                        res.status(200).json({ message: "Category successfully created." })
                    })
                    .catch(err => console.log(err));

            }
        });
    });


    // @route GET api/categories/:userId/
    // @desc gets all categories  for a particular user
    app.get("/api/categories/:userId", passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Category.findAll({
            where: {
                UserId: req.params.userId,
            }
        })
            .then(categories => {
                res.status(200).json(categories)
            })
            .catch(err => console.log(err));
    })

    // @route PUT api/categories/load
    // @desc  moves funds to a category from unbudgeted amount (user.remainingBalance)
    app.put("/api/categories/load", passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Category.findOne({
            where: {
                category_id: req.body.category_id
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

                res.status(200).json({
                    msg: "Balance successfully updated."
                })
            })
                .catch(err => {
                    console.log(err)
                })
        })
            .catch(err => {
                console.log(err)
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
                db.User.findOne({
                    where: {
                        id: req.body.user_id
                    }
                }).then(user => {
                    let newBalance = parseFloat(user.remainingBalance) + parseFloat(category.amount);

                    user.update({
                        remainingBalance: newBalance
                    })
                    res.status(200).json({ admin: "Category was successfully deleted and remaining funds  were transferred to to-be-budgeted." })
                })
                category.destroy();
            })
    })
}