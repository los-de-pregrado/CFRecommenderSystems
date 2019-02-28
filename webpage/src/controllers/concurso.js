const Contest = require('../models').Contest;
const Participation = require("../models").Participation;

module.exports = {
  list(req, res) {
    return Contest
      .findAll({
        include: [Participation],
        order: [
          ['createdAt', 'DESC'],
          [Participation, 'createdAt', 'DESC'],
        ],
      })
      .then((contests) => res.status(200).send(contests))
      .catch((error) => { res.status(400).send(error); });
  },

  getByUrl(req, res) {
    return Contest
      .findAll({
        where: {
          contest_url: req.params.contest_url
        },
        include: [Participation],
        order: [
          ['createdAt', 'DESC'],
          [Participation, 'createdAt', 'DESC'],
        ],
      })
      .then((contests) => res.status(200).send(contests))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Contest
      .findById(req.params.id, {
        include: [Participation],
        order: [
          [Participation, 'createdAt', 'DESC'],
        ],
      })
      .then((contest) => {
        if (!contest) {
          return res.status(404).send({
            message: 'Contest not found.',
          });
        }
        return res.status(200).send(contest);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Contest
      .create({
        contest_name: req.body.contest_name,
        contest_banner: req.body.contest_banner,
        contest_url: req.body.contest_url,
        contest_begindate: req.body.contest_begindate,
        contest_enddate: req.body.contest_enddate,
        contest_prize: req.body.contest_prize,
        contest_script: req.body.contest_script,
        contest_guidelines: req.body.contest_guidelines,
        contest_winner: req.body.contest_winner,
      })
      .then((contest) => res.status(201).send(contest))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Contest
      .findById(req.params.id, {
      })
      .then(contest => {
        if (!contest) {
          return res.status(404).send({
            message: 'Contest not found.',
          });
        }
        return contest
          .update({
            contest_name: req.body.contest_names || contest.contest_name,
            contest_banner: req.body.contest_banner || contest.contest_banner,
            contest_url: req.body.contest_url || contest.contest_url,
            contest_begindate: req.body.contest_begindate || contest.contest_begindate,
            contest_enddate: req.body.contest_enddate || contest.contest_enddate,
            contest_prize: req.body.contest_prize || contest.contest_prize,
            contest_script: req.body.contest_script || contest.contest_script,
            contest_guidelines: req.body.contest_guidelines || contest.contest_guidelines,
            contest_winner: req.body.contest_winner || contest.contest_winner,
          })
          .then(() => res.status(200).send(contest))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Contest
      .findById(req.params.id)
      .then(contest => {
        if (!contest) {
          return res.status(400).send({
            message: 'Contest not found.',
          });
        }
        return contest
          .destroy()
          .then(() => res.status(200).send(contest))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  getParticipationsById(req, res) {
    return Contest
      .findById(req.params.id, {
        include: [Participation],
      })
      .then((contest) => {
        if (!contest) {
          return res.status(404).send({
            message: 'Contest not found.',
          });
        }
        return res.status(200).send(contest.Participations);
      })
      .catch((error) => res.status(400).send(error));
  },

  addParticipation(req, res) {
    return Contest
      .findById(req.params.id, {
        include: [Participation],
      })
      .then((contest) => {
        if (!contest) {
          return res.status(404).send({
            message: 'Contest not found.',
          });
        }
        Participation.create({
          participation_names: req.body.participation_names,
          participation_lastnames: req.body.participation_lastnames,
          participation_email: req.body.participation_email,
          participation_comments: req.body.participation_comments,
          participation_originalroute: req.body.participation_originalroute,
          participation_date: req.body.participation_date,
          participation_route: req.body.participation_route,
          participation_status: req.body.participation_status,
          participation_queuetime: req.body.participation_queuetime,
          ContestId: req.params.id,
        })
          .then((participant) => {
              res.status(200).send(participant);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error)
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error)
      });
  },
};