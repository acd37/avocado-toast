module.exports = function (app) {
    const db = require("../../models");
    const passport = require('passport');

    // @route GET categories/test
    app.get("/api/transactions/test", (req, res) =>
        res.json({ msg: "Transactions routes works!" })
    );


    // @route POST api/transactions/
    // @desc creates a new transaction
    app.post("/api/transactions", passport.authenticate('jwt', { session: false }), (req, res) => {
        const newTransaction = {
            description: req.body.description,
            amount: req.body.amount,
            UserId: req.body.UserId,
            CategoryCategoryId: req.body.CategoryId
        };

        db.Transaction.create(newTransaction)
            .then(() => {
                db.Category.findOne({
                    where: {
                        category_id: req.body.CategoryId
                    }
                }).then(category => {
                    if (category) {
                        let newBalance = parseFloat(category.amount) + parseFloat(req.body.amount);
                        category.update({
                            amount: newBalance
                        })
                    }

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
                            console.log(user)
                            res.status(200).json(user)
                        })
                        .catch(err => console.log(err));
                }).catch(err => {
                    console.log(err);
                })

            })
            .catch(err => console.log(err));
    });


    // @route GET api/transactions/:userId
    // @desc gets all transactions for a user
    app.get("/api/transactions/all", passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Transaction.findAll({
            where: {
                UserId: req.body.UserId,
            }
        })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(err => console.log(err));
    });


    // @route GET api/transactions/:categoryId/:userId
    // @desc gets all transactions for a user for a particular category
    app.get("/api/transactions/transaction", passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Transaction.findAll({
            where: {
                CategoryCategoryId: req.body.CategoryId,
                UserId: req.body.UserId,
            }
        })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(err => console.log(err));
    });


    // @route DELETE api/transactions/
    // @desc deletes a transaction
    app.delete('/api/transactions', passport.authenticate('jwt', { session: false }), (req, res) => {
        db.Transaction.destroy({
            where: {
                transaction_id: req.body.transaction_id
            }
        })
            .then(() => {
                res.status(200).json({ admin: "Transaction was successfully deleted." })
            });
    });


}