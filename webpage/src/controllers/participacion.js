const Participation = require('../models').Participation;

module.exports = {
  list(req, res) {
    return Participation
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((participations) => res.status(200).send(participations))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Participation
      .findById(req.params.id, {
      })
      .then((participation) => {
        if (!participation) {
          return res.status(404).send({
            message: 'Participation not found.',
          });
        }
        return res.status(200).send(participation);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Participation
      .create({
        participation_names: req.body.participation_names,
        participation_lastnames: req.body.participation_lastnames,
        participation_email: req.body.participation_email,
        participation_comments: req.body.participation_comments,
        participation_originalroute: req.body.participation_originalroute,
        participation_date: req.body.participation_date,
        participation_route: req.body.participation_route,
        participation_status: req.body.participation_status,
        participation_queuetime: req.body.participation_queuetime,
        ContestId: req.body.ConsursoId,
      })
      .then((participation) => res.status(201).send(participation))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Participation
      .findById(req.params.id, {
      })
      .then(participation => {
        if (!participation) {
          return res.status(404).send({
            message: 'Participation not found.',
          });
        }
        return participation
          .update({
            participation_names: req.body.participation_names || participation.participation_names,
            participation_lastnames: req.body.participation_lastnames || participation.participation_lastnames,
            participation_email: req.body.participation_email || participation.participation_email,
            participation_comments: req.body.participation_comments || participation.participation_comments,
            participation_originalroute: req.body.participation_originalroute || participation.participation_originalroute,
            participation_date: req.body.participation_date || participarion.participation_date,
            participation_route: req.body.participation_route || participation.participation_route,
            participation_status: req.body.participation_status || participation.participation_status,
            participation_queuetime: req.body.participation_queuetime || participation.participation_queuetime,
          })
          .then(() => res.status(200).send(participation))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },


  delete(req, res) {
    return Participation
      .findById(req.params.id)
      .then(participation => {
        if (!participation) {
          return res.status(400).send({
            message: 'Participation not found.',
          });
        }
        return participation
          .destroy()
          .then(() => res.status(200).send(participation))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};