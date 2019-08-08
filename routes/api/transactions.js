module.exports = function (app) {
    const db = require("../../models");
    const Sequelize = require("sequelize");

    // @route GET categories/test
    app.get("/api/transactions/test", (req, res) =>
        res.json({ msg: "Transactions routes works!" })
    );


    // @route POST api/transactions/
    // @desc creates a new transaction
    app.post("/api/transactions", (req, res) => {
        const newTransaction = {
            description: req.body.description,
            amount: req.body.amount,
            UserId: req.body.UserId,
            CategoryCategoryId: req.body.CategoryId
        };

        db.Transaction.create(newTransaction)
            .then(transaction => {
                db.User.findOne({
                    where: {
                        id: req.body.UserId
                    }
                }).then(user => {
                    if (user) {
                        let newBalance = parseFloat(user.remainingBalance) + parseFloat(req.body.amount);
                        user.update({
                            remainingBalance: newBalance
                        })
                    }

                    res.status(200).json({ message: "Transaction successfully recorded." })
                }).catch(err => {
                    console.log(err);
                })

            })
            .catch(err => console.log(err));



    });

    // @route GET api/transactions/:userId
    // @desc gets all transactions for a user
    app.get("/api/transactions/all", (req, res) => {
        db.Transaction.findAll({
            where: {
                UserId: req.body.UserId,
            }
        })
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(err => console.log(err));
    })

    // @route GET api/transactions/:categoryId/:userId
    // @desc gets all transactions for a user for a particular category
    app.get("/api/transactions/transaction", (req, res) => {
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
    })


    // UPDATE


    // @route DELETE api/transactions/
    // @desc deletes a transaction
    app.delete('/api/transactions', (req, res) => {
        db.Transaction.destroy({
            where: {
                transaction_id: req.body.transaction_id
            }
        })
            .then(() => {
                res.status(200).json({ admin: "Transaction was successfully deleted." })
            })
    })


}