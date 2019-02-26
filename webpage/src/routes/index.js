var express = require('express');
var router = express.Router();
const adminController = require('../controllers').administrador;
const concursoController = require('../controllers').concurso;
const participacionController = require('../controllers').participacion;

/* Webpack looks for /public/index.html automatically to render homepage. */

router.get('/api/admin', adminController.list);
router.get('/api/admin/:id', adminController.getById);
router.post('/api/admin/:id', adminController.addConcurso);
router.post('/api/admin', adminController.add);
router.put('/api/admin/:id', adminController.update);
router.delete('/api/admin/:id', adminController.delete);
router.get('/api/admin/:id/concursos', adminController.getConcursosById);
router.post('/api/admin/:id/concursos', adminController.addConcurso);
router.put('/api/admin/:admin_id/concursos/:id', adminController.updateConcursoByIds);
router.get('/api/admin/:admin_id/concursos/:id', adminController.getConcursoByIds);
router.delete('/api/admin/:admin_id/concursos/:id', adminController.deleteConcursoByIds);
router.get('/api/concurso', concursoController.list);
router.get('/api/concurso/:id', concursoController.getById);
router.get('/api/concursos/:contest_url', concursoController.getByUrl);
router.get('/api/concurso/:id/participaciones', concursoController.getParticipationsById);
router.post('/api/concurso/:id/participaciones', concursoController.addParticipation);
router.post('/api/concurso', concursoController.add);
router.put('/api/concurso/:id', concursoController.update);
router.delete('/api/concurso/:id', concursoController.delete);
router.get('/api/participacion', participacionController.list);
router.get('/api/participacion/:id', participacionController.getById);
router.post('/api/participacion', participacionController.add);
router.put('/api/participacion/:id', participacionController.update);
router.delete('/api/participacion/:id', participacionController.delete);

module.exports = router;