const sql=require('mysql2')

const connection=sql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'ticket'
}).promise()


module.exports=connection
  