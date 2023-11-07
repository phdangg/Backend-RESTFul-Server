const connection = require('../config/database')
const getAllUsers = async () =>{
    let [result,fields] = await (await connection).query('SELECT * FROM Users');
    return result;
}

const getUserByID = async (userID)=>{
    
    let [result,fields] = await (await connection).query('SELECT * FROM Users WHERE id = ?',[userID])
    
    let user = result && result.length > 0 ? result[0] : {}
    return user;
}
const updateUserByID = async (id,email,name,city)=>{
    const [result, fields] = await connection.then(establishedConnection => 
        establishedConnection.execute('\
        UPDATE Users\
        SET email=?, name=?, city=?\
        WHERE id = ?',[email,name,city,id]));
}
const deleteUserByID = async (id)=>{
    const [result, fields] = await connection.then(establishedConnection => 
        establishedConnection.execute('\
        DELETE FROM Users WHERE id=?',        
        [id]));
}
module.exports = {
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserByID
}