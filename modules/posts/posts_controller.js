const postModel = require ('./posts_model');
const db = require('../../config/db_config');
const trackModel = require('../tracks/tracks_model');
const userModel = require('../users/users_model');

class Posts {
  
    constructor() { }

    createPost() {
        return async (req, res) => {
            let { user_id, post_discription, pic_url } = req.body;

            if (!user_id || !pic_url) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const post = await postModel.create({ user_id, post_discription, pic_url });
                return res.status(200).send({ status: true, msg: 'Post Created Successfully' });
            } catch (error) {
                console.log('Error in post creation', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    getTimeline() {
        return async (req, res) => {
            try {
                const tracks = await trackModel.findAndCountAll({  include: [userModel], order: [['createdAt', 'DESC']] });
                const posts = await postModel.findAndCountAll({ include: [userModel], order: [['createdAt', 'DESC']] });
                let newRows = JSON.parse(JSON.stringify(tracks.rows));
                Array.prototype.push.apply(newRows, JSON.parse(JSON.stringify(posts.rows)));
                newRows.sort((a,b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                return res.status(200).send({ data: newRows });
            } catch (error) {
                console.log('Error in listing posts for timeline', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    postListById() {
        return async (req, res) => {
            
            let { id } = req.params;
            
            if (!id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
            
            try {
                const result = await postModel.findAndCountAll({ where: { user_id: id } });
                let { rows, count } = result;
                return res.status(200).send({ data: rows, count });
            } catch (error) {
                console.log('Error in listing posts', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    postDelete() {
        return async (req, res) => {
            const { id } = req.body;

            if (!req.body ||!id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const result = await postModel.findOne({ where: { id: id } });
                if (result) {
                    const result2 = await result.update({  is_deleted: true });
                    return res.status(200).send({ msg: 'Post deleted successfully' });
                } else {
                    return res.status(404).send({ msg: 'Post not found against this id' });
                }
            } catch(err) {
                console.log('Error in post delete', error);
                return res.status(500).send({ msg: 'Internal Server Error', error: err });
            }
        }
    }

}

module.exports = new Posts();
