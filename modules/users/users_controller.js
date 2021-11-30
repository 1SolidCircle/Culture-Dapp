const userModel = require ('./users_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const db = require('../../config/db_config');

const transporter = nodemailer.createTransport({
    service: config.mailing.service,
    auth: {
        user: config.mailing.username,
        pass: config.mailing.password
    }
});


class Users {
  
    constructor() { }

    userRegister() {
        return async (req, res) => {
            let { firstName, lastName, email, password, role, username } = req.body;

            if (!firstName ||!lastName ||!email ||!password ||!role ||!username) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
        
            try {
                const userExists = await userModel.findOne({ 
                    where: {
                        [db.DataTypes.Op.or] : [
                            { email: email.toLowerCase() },
                            { username: username.toLowerCase() }
                        ]
                    } 
                });
                if (userExists && userExists.email.toLowerCase() == email.toLowerCase()) {
                    return res.status(401).send({ msg: 'User against this email  already exist' });
                } else if (userExists && userExists.username.toLowerCase() == username.toLowerCase()) {
                    return res.status(401).send({ msg: 'User against this username already exist' });
                } else {
                    let generateHash = function (password) {
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                    };
                    
                    let hashPassword = generateHash(password);
                    let obj = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email.toLowerCase(),
                        password: hashPassword,
                        username: username,
                        profile_url: username,
                        role: role
                    };
                    const user = await userModel.create(obj);
                    return res.status(200).send({ status: true, msg: 'User Registered Successfully' });
                }
            } catch (error) {
                console.log('Error in user registeration', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    profileUpdate() {
        return async (req, res) => {
            
            let { id, country, profile_url, firstName, lastName, profile_bio, isProfilePublic, instagram_link, facebook_link, twitter_link, discord_link, youtube_link, website_link, profile_pic, profile_banner, mobile_banner } = req.body;
            
            try {
                const result = await userModel.findOne({ where: { id: id } });
                if (result) {
                    const result2 = await result.update({ country, profile_url, first_name: firstName, last_name: lastName, profile_bio, isProfilePublic, instagram_link, facebook_link, twitter_link, discord_link, youtube_link, website_link, profile_pic, profile_banner, mobile_banner });
                    return jwt.sign({ id: result.id, profile_bio: profile_bio, profile_pic: profile_pic, status: result.status, username: result.username, role: result.role, firstName: firstName, lastName: lastName, email: result.email }, config.privateKey, { expiresIn: '7 days' }, function(err, token) {
                        if (err) {
                            console.log('Error in generating jwt token. ', err);
                            return res.status(500).json({ msg: 'Internal Server Error', error: err });
                        } else {
                            return res.status(200).send({ 
                                token: token,
                                user: { 
                                    id: result.id,
                                    firstName: firstName, 
                                    lastName: lastName, 
                                    username: result.username,
                                    email: result.email, 
                                    status: result.status,
                                    role: result.role,
                                    profile_pic: profile_pic,
                                    profile_bio: profile_bio
                                },
                                msg: 'Profile Updated Successfully' 
                            });
                        }
                    });
                } else {
                    return res.status(404).send({ msg: 'User not found against this id' });
                }
            } catch (error) {
                console.log('Error in profile update', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    getProfileById() {
        return async (req, res) => {
            let { id } = req.params;

            if (!id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const result = await userModel.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });
                if (result) {
                    return res.status(200).send({ data: result });
                } else {
                    return res.status(404).send({ msg: 'User profile not found against this id' });
                }

            } catch (error) {
                console.log('Error in getting user profile', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }
    
    usersList() {
        return async (req, res) => {

            let { role } = req.params;

            if (!role && (role != 'bidder' || role != 'seller')) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const result = await userModel.findAndCountAll({ where: { role: role }});
                let { rows, count } = result;
                return res.status(200).send({ data: rows, count });
            } catch (error) {
                console.log('Error in listing users', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    userLogin() {
        return async (req, res) => {
            let { email, password } = req.body;

            if (!email ||!password) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
            
            try {
                const userExists = await userModel.findOne({ where: { email: email.toLowerCase() } });
                if (userExists) {
                    let validPasscode = await bcrypt.compareSync(password, userExists.password);
                    if (validPasscode) {
                        return jwt.sign({ id: userExists.id, profile_pic: userExists.profile_pic, profile_bio: userExists.profile_bio, status: userExists.status, username: userExists.username, role: userExists.role, firstName: userExists.first_name, lastName: userExists.last_name, email: userExists.email }, config.privateKey, { expiresIn: '7 days' }, function(err, token) {
                            if (err) {
                                console.log('Error in generating jwt token. ', err);
                                return res.status(500).json({ msg: 'Internal Server Error', error: err });
                            } else {
                                return res.status(200).send({ 
                                    token: token,
                                    user: { 
                                        id: userExists.id,
                                        firstName: userExists.first_name, 
                                        lastName: userExists.last_name, 
                                        username: userExists.username,
                                        email: userExists.email, 
                                        status: userExists.status,
                                        role: userExists.role,
                                        profile_bio: userExists.profile_bio,
                                        profile_pic: userExists.profile_pic 
                                    }
                                });
                            }
                        });
                    } else {
                        return res.status(401).send({ msg: `Incorrect email/password.` });
                    }
                } else {
                    return res.status(404).send({ msg: `Couldn't find your account` });
                }
            } catch (error) {
                console.log('Error in user login', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }
   
    sentResetPassLink() {
        return async (req, res) => {
            const { email } = req.body;

            if (!req.body || !email) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
        
            try {
                const result = await userModel.findOne({ where: { email: email.toLowerCase() } });
                if (result) {
                    return jwt.sign({ id: result.id, email: result.email }, config.privateKey, { expiresIn: '1h' }, function(err, token) {
                        if (err) {
                            console.log('Error in generating jwt token. ', err);
                            return res.status(500).json({ msg: 'Internal Server Error', error: err });
                        } else {
                            let data = `<b>Culture Dapp reset password</b>
                                <p>Click on this link to rest your password. Link expired after 1 hour.</p><br><br> 
                                <a href='http://localhost:3000/reset/password/${token}' target='_blank'>
                                http://localhost:3000/reset/password/${token}
                                </a>
                            `;
                            const mailOptions = {
                                from: config.mailing.username,
                                to: result.email,
                                subject: 'Culture Dapp Streaming Reset Password',
                                html: data
                            };
                            return transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log('Error: ', error);
                                    return res.status(500).send({ error, msg: 'Internal Server Error' });
                                } else {
                                    return res.status(200).send({ msg: 'Reset password link sent successfully.' });
                                }
                            });
                        }
                    });
                } else {
                    return res.status(404).send({ msg: `No Account exist against the email`})
                }
            } catch (error) {
                return res.status(500).send({ msg: 'Internal Server Error', error: error });
            }
        }
    }
    
    saveResetPass() {
        return async (req, res) => {
            const { token, password } = req.body;

            if (!req.body ||!token ||!password) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                let decoded = jwt.verify(token, `${config.privateKey}`);
                let email = decoded.email;
                const result = await userModel.findOne({ where: { email: email.toLowerCase() } });
                if (result) {
                    let generateHash = function (password) {
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                    };
                    let hashPassword = generateHash(password);
                    const result2 = await result.update({  password: hashPassword });
                    return res.status(200).send({ msg: 'Password reset successfully' });
                } else {
                    return res.status(404).send({ msg: 'User not found against this token' });
                }
            } catch(err) {
                console.log(err);
                return res.status(400).send({ msg: 'Invalid/Expired token', error: err });
            }
        }
    }

    userDelete() {
        return async (req, res) => {
            const { id } = req.body;

            if (!req.body ||!id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const result = await userModel.findOne({ where: { id: id } });
                if (result) {
                    const result2 = await result.update({  is_deleted: true });
                    return res.status(200).send({ msg: 'User deleted successfully' });
                } else {
                    return res.status(404).send({ msg: 'User not found against this id' });
                }
            } catch(err) {
                return res.status(500).send({ msg: 'Internal Server Error', error: err });
            }
        }
    }

    validateToken() {
        return async(req, res) => {
            let { token } = req.body;
            if (!token) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
            try {
                let decoded = jwt.verify(token, `${config.privateKey}`);
                delete decoded.iat; delete decoded.exp;
                return res.status(200).send({ msg: 'Verified Successfully', data: decoded });
            } catch(err) {
                return res.status(500).send({ msg: 'Internal Server Error', error: err });
            }
        }
    }

}

module.exports = new Users();
