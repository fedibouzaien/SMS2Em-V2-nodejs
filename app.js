const TWILIO_ACCOUNT_SID ="AC9744fef0de0326c45d3d6e5e65b86505";
const TWILIO_AUTH_TOKEN ="abaf7b235e71f663e47c4b3fcea2de6e";

let lookups = require('./carriers');

const lineReader = require('line-reader');

const client = require('twilio')(TWILIO_ACCOUNT_SID , TWILIO_AUTH_TOKEN);

lineReader.eachLine('./input/numbers.txt', (num, last) => {
    // console.log(line);
    client.lookups.phoneNumbers(num)
  .fetch({ type: ['carrier'] })
  .then(phone_number => {
    // console.log(phone_number.carrier) // All of the carrier info.
    // console.log(phone_number.carrier.name) // Just the carrier name.
    let email = lookups.sms(phone_number.carrier.name, num);
    if (email == null){
        console.log(phone_number.carrier.name,"found but no email")
    }else{
        console.log(phone_number.carrier.name , email )
    }
    
  });
});

