const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../auth/check-auth')

const AgendaItemController = require('../controllers/agendaItems')

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, './notes/');
    },
    filename: function (request, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'text/plain') {
        // accept a file
        cb(null, true);
    }
    else {
        // reject a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', AgendaItemController.getAllAgendaItems);

router.post('/', upload.single('notes'), checkAuth, AgendaItemController.createAgendaItem);

router.get('/:agendaId', checkAuth, AgendaItemController.getAgendaItem);

router.patch('/:agendaId', checkAuth, AgendaItemController.updateAgendaItem);

router.delete('/:agendaId', checkAuth, AgendaItemController.deleteAgendaItem);

module.exports = router