const trackModel = require ('./tracks_model');
const db = require('../../config/db_config');

class Tracks {
  
    constructor() { }

    createTrack() {
        return async (req, res) => {
            
            let { user_id, vibes, tags, artist, artist_ownership, artist_role, isrc, monetise, agreement, legal, track_display_name, track_url, track_discription, list_on_profile, track, track_pic  } = req.body;

            if (!artist || !artist_ownership || !artist_role || !agreement ||!legal ||!track_display_name ||!track_url ||!track ||!track_pic) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const trackResult = await trackModel.create({ vibes: JSON.stringify(vibes), tags: JSON.stringify(tags), user_id, artist, artist_ownership, artist_role, isrc, monetise, agreement, legal, track_display_name, track_url, track_discription, list_on_profile, track, track_pic });
                return res.status(200).send({ status: true, msg: 'Track Created Successfully' });
            } catch (error) {
                console.log('Error in track creation', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }
    
    updateTrack() {
        return async (req, res) => {
            
            let { track_id, user_id, vibes, tags, artist, artist_ownership, artist_role, isrc, monetise, agreement, legal, track_display_name, track_url, track_discription, list_on_profile, track, track_pic  } = req.body;

            if (!artist || !artist_ownership || !artist_role || !agreement ||!legal ||!track_display_name ||!track_url ||!track ||!track_pic) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const checkTrack = await trackModel.findOne({ id: track_id });
                if (checkTrack && checkTrack.user_id == user_id) {
                    const trackResult = await checkTrack.update({ vibes: JSON.stringify(vibes), tags: JSON.stringify(tags), artist, artist_ownership, artist_role, isrc, monetise, agreement, legal, track_display_name, track_url, track_discription, list_on_profile, track, track_pic });
                    return res.status(200).send({ status: true, msg: 'Track Created Successfully' });
                } else {
                    return res.status(404).send({ status: true, msg: 'Track not found against this info' });
                }
            } catch (error) {
                console.log('Error in track updation', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    tracksList() {
        return async (req, res) => {
            try {
                const result = await trackModel.findAndCountAll({ order: [['createdAt', 'DESC']] });
                let { rows, count } = result;
                return res.status(200).send({ data: rows, count });
            } catch (error) {
                console.log('Error in listing tracks', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    trackListSpecificUser() {
        return async (req, res) => {
            let { id } = req.params;
            try {
                const result = await trackModel.findAndCountAll({ where: { user_id: id }, order: [['createdAt', 'DESC']] });
                let { rows, count } = result;
                return res.status(200).send({ data: rows, count });
            } catch (error) {
                console.log('Error in listing tracks for specific user', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }
    
    getTrackById() {
        return async (req, res) => {
            let { id } = req.params;
            try {
                const result = await trackModel.findOne({ where: { id: id }});
                return res.status(200).send({ data: result });
            } catch (error) {
                console.log('Error in getting specific track by id', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    trackDelete() {
        return async (req, res) => {
            const { id } = req.body;

            if (!req.body ||!id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            try {
                const result = await trackModel.findOne({ where: { id: id } });
                if (result) {
                    const result2 = await result.update({  is_deleted: true });
                    return res.status(200).send({ msg: 'Track deleted successfully' });
                } else {
                    return res.status(404).send({ msg: 'Track not found against this id' });
                }
            } catch(err) {
                return res.status(500).send({ msg: 'Internal Server Error', error: err });
            }
        }
    }

}

module.exports = new Tracks();
