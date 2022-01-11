let db = require('../../db').localConnect();

module.exports = {

    getUsers: () => {

        return new Promise((resolve, reject) => {
            db.query('select * from users_register', function (error, results, fields) {

                if (error) {
                    return reject(error)
                }

                return resolve(results);
            });

        })

    },

    regisitorNewUser: (req) => {

        return new Promise((resolve, reject) => {
            let { username, email, password } = req; //object properrties destructuring syntax

            let query = "INSERT INTO `users_register` (`id`, `username`, `email`, `password`) VALUES (NULL, '" + username + "','" + email + "', '" + password + "')";

            db.query(query, (error, result, fields) => {

                
                if (error) {
                    return reject(error);
                } else {
                    return resolve(result);
                }
            });

        });


    },

    loginUser: (data) => {

        return new Promise((resolve, reject) => {
            let { username, password } = data; //object properrties destructuring syntax

            let query = "SELECT * FROM `users_register` WHERE username = '" + username + "' and password='" + password + "'";

            db.query(query, (error, result, fields) => {
                if (result.length > 0) {
                    return resolve(result);
                } else {
                    return reject({
                        "Error": "user not found.."
                    });
                }

            });

        });

    }
}