const express = require('express'); 
const router = express.Router();
const {getHomePage,getABC,postCreateUser,getCreatePage,
    postDeleteUser,getUpdatePage,postUpdateUser,
    postHandleDestroyUser} = require('../controllers/homeController')

router.get('/', getHomePage)
router.get('/abc',getABC)
router.get('/create',getCreatePage);

router.get('/update/:id',getUpdatePage);

router.post('/create-user',postCreateUser)
router.post('/update-user',postUpdateUser)
router.post('/delete-user/:id',postDeleteUser)
router.post('/delete-user/',postHandleDestroyUser)


module.exports = router;