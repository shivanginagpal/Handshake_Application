'use strict'
let profileExsists = async (id, table,conn)=>{

    console.log(`Id is ${id} searching in table: ${table}`);
    if (conn){
        var result = await conn.query('Select * from ?? where id = ?',[table,id]);
        console.log(result);
        if (result.length > 0){
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = {profileExsists}