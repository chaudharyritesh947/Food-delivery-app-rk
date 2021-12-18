var mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

const sendEmail = (data) => {
  const orderItems = JSON.parse(JSON.stringify(data.cartData));
  let items = '';

  //making text for all the items purchased
   orderItems.items.forEach((element)=>{
    items = items + `Name: ${element.name} Description: ${element.description} Price: ${element.price} \n`;
   });

   //making data object
    var data = {
        from: `Food delivery app <chaudharyritesh947@gmail.com>`,
        to: data.user.email,
        subject: 'Thanks for order with FDA',
        text: `Total amount to be paid is: ${orderItems.amount} \n ${items} `,

    };

    //sending mail via mailgun
    mailgun.messages().send(data, function (error, body) {
        if(error){
            console.log(error, "Could not send the confirmation mail for ", data);
        }
        else{
            console.log(body);
        }
    });
}

module.exports = {
    sendEmail
}



 
