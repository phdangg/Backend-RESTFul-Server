const connection = require('../config/database');
const {getAllUsers,getUserByID,updateUserByID,deleteUserByID} = require('../services/CRUDService')
const getHomePage = async (req,res) => {
    let result = await getAllUsers();
    return res.render('home.ejs',{listUsers: result})
}
const getABC = (req,res) => {
    res.send('check ABC')
}
const postCreateUser = async (req,res)=>{
    console.log('>>> req.body',req.body)
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;

    const [result, fields] = await connection.then(establishedConnection => 
        establishedConnection.execute('\
        INSERT INTO Users(email,name,city)\
        VALUES (?,?,?)',        
        [email,name,city]));
    
    console.log('>>> result',result);
    res.send('Created user succeed')
}
const postUpdateUser = async (req,res)=>{
    console.log(">>> Post update")

    let id = req.body.id;
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;

    await updateUserByID(id,email,name,city)

    //res.send("Update succeed")
    res.redirect("/")
}   
const getCreatePage = (req,res)=>{
    res.render('create.ejs')
}
const getUpdatePage = async (req,res)=>{
    const userID = req.params.id;
    let user = await getUserByID(userID)
    res.render('edit.ejs',{user: user})
}
const postDeleteUser = async (req,res)=>{
    const userID = req.params.id;
    let user = await getUserByID(userID)
    console.log(">>> this is postDeleteUser",user)
    res.render("delete.ejs",{user: user})
}
const postHandleDestroyUser = async (req,res)=>{
    const id = req.body.id;
    await deleteUserByID(id);
    res.redirect('/')
}
module.exports = {
    getHomePage,
    getABC,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleDestroyUser
}