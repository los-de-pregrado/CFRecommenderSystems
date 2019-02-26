const spawn = require('child_process').spawn;
const Participation = require("../../models").Participation;
var path = require('path');
const format = '_final.mp3';
const parent = path.join(__dirname, 'voices');
const finalParent = path.join(__dirname, 'finalVoices');
var Queue = require('better-queue');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var q = new Queue(function (batch, cb) {
    var timenow = new Date();
    if(batch[0] != null && batch[1] != null &&batch[2] != null ){
        module.exports.updateQueueTime((timenow - batch[0].time)/1000,batch[0].id);
        module.exports.updateQueueTime((timenow - batch[1].time)/1000,batch[1].id);
        module.exports.updateQueueTime((timenow - batch[2].time)/1000,batch[2].id);
        let p1 = module.exports.processAudio(batch[0].id, batch[0].route, batch[0].email, batch[0].name);
        let p2 = module.exports.processAudio(batch[1].id, batch[1].route, batch[1].email, batch[1].name);
        let p3= module.exports.processAudio(batch[2].id, batch[2].route, batch[2].email, batch[2].name);
        Promise.all([p1, p2, p3]).then(values => { 
            cb();
        });
    } else if (batch[0] != null && batch[1] != null){
        module.exports.updateQueueTime((timenow - batch[0].time)/1000,batch[0].id);
        module.exports.updateQueueTime((timenow - batch[1].time)/1000,batch[1].id);
        let p1 = module.exports.processAudio(batch[0].id, batch[0].route, batch[0].email, batch[0].name);
        let p2 = module.exports.processAudio(batch[1].id, batch[1].route, batch[1].email, batch[1].name);
        Promise.all([p1, p2]).then(values => { 
            cb();
        });
    } else if(batch[0] != null){
        module.exports.updateQueueTime((timenow - batch[0].time)/1000,batch[0].id);
        module.exports.processAudio(batch[0].id, batch[0].route, batch[0].email, batch[0].name).then(function (result) {
            cb();
        });
    }

}, { batchSize: 3 })

module.exports = {
    processAudio: function (id, route, email, name) {
        console.log(__dirname);
        var input = path.normalize(path.join(parent, route));
        console.log(input);
        var filename = path.basename(input);
        var ext = path.extname(input);
        var outname = filename.replace(ext, format);
        var output = path.join(finalParent, outname);
        return new Promise((resolve, reject) => {
            const ffmpeg = spawn('ffmpeg', ['-y', '-i', `${input}`, '-vn', '-ar', '44100', '-ac', '2', '-ab', '192k', '-f', 'mp3', `${output}`]);
            ffmpeg.stderr.on('data', (data) => {

            });
            ffmpeg.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                if (code == 0) {
                    module.exports.updateParticipation(outname, 'Convertida', id);

                    var mailOptions = {
                        from: 'super.voices@yahoo.com',
                        to: email,
                        subject: 'Tu inscripcion al concurso ya fue procesada',
                        text: 'Hola '.concat(name, '! ', 'Tu inscripcion ', route, ' ya esta disponible en la pagina del concurso')
                    };

                    const msg = {
                        to: email,
                        from: 'supervoicescontests@gmail.com',
                        subject: 'Tu inscripcion al concurso ya fue procesada',
                        text: '¡Hola '.concat(name, '! ', 'Tu inscripcion ', route, ' ya esta disponible en la pagina del concurso'),
                        html: '<strong>¡Hola '.concat(name, '! ', 'Tu inscripcion ', route, ' ya esta disponible en la pagina del concurso</strong>'),
                      };

                    sgMail.send(msg, (error)=>{
                        if(error){
                            console.log(error);
                        }
                        else{
                            console.log("Sent email!");
                        }
                    });

                } else {
                    module.exports.updateParticipation(null, 'En proceso', id);
                }
                resolve(code);
            });
        });
    },

    updateQueueTime: function (time, id) {
        Participation.findById(id, {

        })
            .then(participation => {
                participation.update({
                    participation_queuetime: time || participation.participation_queuetime,
                })
                    .then((new_participation) => { })
                    .catch((error) => { console.log(error) });
            })
            .catch((error) => { console.log(error) });
    },

    updateParticipation: function (final_route, status, id) {
        Participation.findById(id, {

        })
            .then(participation => {
                participation.update({
                    participation_route: final_route || participation.route,
                    participation_status: status || participation.status,
                })
                    .then((new_participation) => { })
                    .catch((error) => { console.log(error) });
            })
            .catch((error) => { console.log(error) });
    },

    newJob: function (id, route, email, name) {   
        module.exports.updateParticipation(null, 'Procesando', id);
        q.push({
            id: id,
            route: route,
            email: email,
            name: name,
            time: new Date()
        });
    },

    consultDB: function () {
        Participation.findAll({
            where: {
                participation_status: 'En proceso'
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        })
            .then((participations) => {
                for (var i in participations) {
                    module.exports.newJob(participations[i].id, participations[i].participation_originalroute, participations[i].participation_email, participations[i].participation_names);
                }
            })
            .catch((error) => { });
    },

    consultDBLeftovers: function () {
        Participation.findAll({
            where: {
                participation_status: 'Procesando'
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        })
            .then((participations) => {
                for (var i in participations) {
                    module.exports.updateParticipation(null, 'En proceso', participations[i].id);
                }
            })
            .catch((error) => { });
    },

    executor: function () {
        setInterval(function () {
            module.exports.consultDB()
        }, 600000);
    }
}