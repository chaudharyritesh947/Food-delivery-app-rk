const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: '',
  from: 'ritesh@gopazo.com',
  subject: 'Thanks for order with FDA',
  text: ''
};
const sendEmail = (data) => {
    const orderItems = JSON.parse(JSON.stringify(data.cartData));
    let items = '';
  
    //making text for all the items purchased
     orderItems.items.forEach((element)=>{
      items = items + `Name: ${element.name} Description: ${element.description} Price: ${element.price} \n`;
     });
  
     msg.text = `Total amount to be paid is: ${orderItems.amount} \n ${items} `;
     msg.to = data.user.email,

     console.log(msg);
     sgMail
     .send(msg)
     .then(() => {}, error => {
       console.error(error);
       if (error.response) {
         console.error(error.response.body)
       }
     });
    
  }
  
module.exports = {
      sendEmail
}
  
  