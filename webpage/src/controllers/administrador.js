const Admin = require('../models').Admin;
const Contest = require('../models').Contest;

module.exports = {
  list(req, res) {
    return Admin
      .findAll({
        include: [Contest],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((admins) => res.status(200).send(admins))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Admin
      .findById(req.params.id, {
        include: [Contest],
      })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({
            message: 'Admin not found.',
          });
        }
        return res.status(200).send(admin);
      })
      .catch((error) => res.status(400).send(error));
  },

  getConcursosById(req, res) {
    return Admin
      .findById(req.params.id, {
        include: [Contest],
      })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({
            message: 'Admin not found.',
          });
        }
        return res.status(200).send(admin.Contests);
      })
      .catch((error) => res.status(400).send(error));
  },

  getConcursoByIds(req, res) {
    return Admin
      .findById(req.params.admin_id, {
        include: [Contest],
      })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({
            message: 'Admin not found.',
          });
        }
        Contest.findById(req.params.id, {
        })
          .then((contest) => {
            if (!contest) {
              return res.status(404).send({
                message: 'Contest not found.',
              });
            }
            return res.status(200).send(contest);
          })
      })
      .catch((error) => res.status(400).send(error));
  },

  updateConcursoByIds(req, res) {
    return Admin
      .findById(req.params.admin_id, {
        include: [Contest],
      })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({
            message: 'Admin not found.',
          });
        }
        Contest.findById(req.params.id, {
        })
          .then((contest) => {
            if (!contest) {
              return res.status(404).send({
                message: 'Contest not found.',
              });
            }
            contest
              .update({
                contest_name: req.body.contest_names || contest.contest_names,
                contest_banner: req.body.contest_banner || contest.contest_banner,
                contest_url: req.body.contest_url || contest.contest_url,
                contest_begindate: req.body.contest_begindate || contest.contest_begindate,
                contest_enddate: req.body.contest_enddate || contest.contest_enddate,
                contest_prize: req.body.contest_prize || contest.contest_prize,
                contest_script: req.body.contest_script || contest.contest_script,
                contest_guidelines: req.body.contest_guidelines || contest.contest_guidelines,
              })
              .then(() => res.status(200).send(contest))
              .catch((error) => res.status(400).send(error));
          })
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Admin
      .create({
        admin_names: req.body.admin_names,
        admin_lastnames: req.body.admin_lastnames,
        admin_email: req.body.admin_email,
        admin_password: req.body.admin_password,
      })
      .then((admin) => res.status(201).send(admin))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Admin
      .findById(req.params.id, {
        include: [Contest],
      })
      .then(admin => {
        if (!admin) {
          return res.status(404).send({
            message: 'Admin not found.',
          });
        }
        return admin
          .update({
            admin_names: req.body.admin_names || admin.admin_names,
            admin_lastnames: req.body.admin_lastnames || admin.admin_lastnames,
            admin_email: req.body.admin_email || admin.admin_email,
            admin_password: req.body.admin_password || admin.admin_password,
          })
          .then(() => res.status(200).send(admin))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Admin
      .findById(req.params.id)
      .then(admin => {
        if (!admin) {
          return res.status(400).send({
            message: 'Admin not found.',
          });
        }
        return admin
          .destroy()
          .then(() => res.status(200).send(admin))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  addConcurso(req, res) {
    return Admin
      .findById(req.params.id, {
        include: [Contest],
      })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({
            message: 'Admin not found.',
          });
        }
        Contest.create({
          contest_name: req.body.contest_name,
          contest_banner: req.body.contest_banner,
          contest_url: req.body.contest_url,
          contest_begindate: req.body.contest_begindate,
          contest_enddate: req.body.contest_enddate,
          contest_prize: req.body.contest_prize,
          contest_script: req.body.contest_script,
          contest_guidelines: req.body.contest_guidelines,
          AdminId: req.params.id,
        }).then((contest) =>  res.status(200).send(contest)).catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error));
  },

  deleteConcursoByIds(req, res) {
    return Admin
      .findById(req.params.admin_id, {
        include: [Contest],
      })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({
            message: 'Admin not found.',
          });
        }
        Contest.findById(req.params.id, {
        })
          .then((contest) => {
            if (!contest) {
              return res.status(404).send({
                message: 'Contest not found.',
              });
            }
            return contest
              .destroy()
              .then(() => res.status(200).send(contest))
              .catch((error) => res.status(400).send(error));
          })
      })
      .catch((error) => res.status(400).send(error));
  },


};