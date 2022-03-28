const { Router } = require('express');
const controladorArchivos= require('../controladores/controladorArchivosC');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname, '../public/imgC'));
    },
    filename: function(req,file,cb){
        const unico = Date.now() + '-' + Math.round(Math.random()* 1E9);
        cb(null, file.fieldname + '-' + unico + file.mimetype.replace("/","."));
    }
});
const upload = multer({
    storage: storage,
});
const router = Router();
router.post('/imgC', upload.single('imgC'), controladorArchivos.Recibir);
module.exports = router;