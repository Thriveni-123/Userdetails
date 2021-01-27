const constants = require('../constants');
var Database = require("../database/database");
var nodemailer = require('nodemailer');

module.exports.Mail =  async ({email},callback) => {
    try {
        await Database.connectionPool.getConnection(async function(err, connection){ 
             connection.changeUser({
                 database : Database.databaseName
             }, function(err) {
                 if (err) {
                     console.log("Database is not selected");
                     callback(new Error(err),null,null);
                 }else { //if database is selected
                    //////////////////////////////
                                    var transporter=nodemailer.createTransport({//this function send mail
                                        service:'Gmail',
                                        auth:{
                                            user:'thrivenirg123@gmail.com',
                                            pass:'rg123',
                                        }       
                                    });
                                    var mailOptions={
                                        from:'b.thriveni@gmail.com',
                                        to:email,
                                        subject:' Nodejs Job details',
                                        text: `Hi \r\n regard job opening :\r\nThanks \r\n nodejs Team`
                                         
                                    };
                                    transporter.sendMail(mailOptions,function(error,info){
                                        if(error){
                                           console.log(error);
                                        }
                                        else{
                                           console.log('emaill send');
                                       }
                                   });          
                                                  
                                   callback(null,{},1); // send the user password from mail
                  /////////////////////////
                 } // end of if database is selected
             });//end of changeUser
             connection.release();//release the connection
         });  // end of getConnection              
 }catch(error){
     console.log('Something went wrong: Service: SendEmail',error);
     callback(new Error(error),null,null);
 }

}

module.exports.Table =  async (req,callback) => {
    var tablename=req.body.tablename;
    try {
           await Database.connectionPool.getConnection(async function(err, connection){ 
                connection.changeUser({
                    database : Database.databaseName
                }, function(err) {
                    if (err) {
                    // console.log(err);
                        console.log("Database is not selected");
                        callback(new Error(err),null,null);
                    // throw err
                    }else { //if database is selected
                        var SelectTable = "SELECT * FROM "+tablename;
                        connection.query(SelectTable, async function (err, result, fields) { //query
                            if (err){
                            console.log("Query  is not executed");
                            callback(new Error(err),null,null);
                            //throw err
                            }else 
                            {
                                Object.keys(result).forEach(async function(key) {
                                    var user= result[key];
                                    getList.push(user);  
                                    });
                                    var json_arr={};
                                    json_arr["userdetails"]=getList;
                                    callback(null,json_arr,1);
                            }
                        });//end of connection.query
                        ////////////////////////////
                      
                    } // end of if database is selected
                });//end of changeUser
                connection.release();//release the connection
            }); // end of getConnection
              
    }catch(error){
        console.log('Something went wrong: Service: Table',error);
        //throw new Error(error);
        callback(new Error(error),null,null);
    }
  
  }