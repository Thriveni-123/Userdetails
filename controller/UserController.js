const UserService = require('../service/UserService');
const constants = require('../constants');

var globalRes;

module.exports.Mail =  async (req,res) => {
    globalRes = res;
    try {
        await UserService.Mail(req.body,MailResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Mail',error); 
    }
}

function MailResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
                    response.status = 200;
                    response.message = constants.USERMESSAGE.SEND;
                    response.body = responseFromService;
            }
     }catch(error){
        console.log('Something went wrong: Controller :MailResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }


  module.exports.Table =  async (req,res) => {
    globalRes = res;
    try {
        await UserService.Table(req,TableResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Table',error); 
    }
}

function TableResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
                    response.status = 200;
                    response.message = constants.USERMESSAGE.FETCH;
                    response.body = responseFromService;
            }
     }catch(error){
        console.log('Something went wrong: Controller :TableResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }
