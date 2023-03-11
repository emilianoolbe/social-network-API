// --> Multer + path
const multer = require('multer');
const path = require('path');

// Guardado en memoria
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    
    //Seteo type del file
    let type = file.mimetype.starsWith('image/');

    //Extensiones aceptadas
    let aceptedExtensions = ['.png', '.jpg', '.jpeg','.gif'];

    //Capturo extensión del archivo cargado
    let fileExtension = path.extname(file.originalname);

    //Valido
    return type && aceptedExtensions.includes(fileExtension) ? cb(null, true) : cb(null,false);
};

const upload = multer({storage, fileFilter});

module.exports = upload;