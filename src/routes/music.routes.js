const express = require("express");
const router = express.Router();
const musicController = require("../controlllers/music.controller");
const authMiddleware = require("../middlewares/auth.meddleware");
const multer =  require('multer');


const upload =  multer({
    storage:multer.memoryStorage()
})



router.post("/upload", authMiddleware.authArtist ,upload.single("music"),musicController.createMusic)

router.post("/album", authMiddleware.authArtist,musicController.createAlbum);

router.get("/",authMiddleware.authUser , musicController.getAllMusics)

router.get("/album",authMiddleware.authUser, musicController.getALlAlbums)

router.get("/album/:albumId",authMiddleware.authUser,musicController.getAlbumById)


module.exports  = router;