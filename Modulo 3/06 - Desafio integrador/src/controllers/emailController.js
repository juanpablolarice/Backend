// const nodemailer = require('nodemailer')
// const config = require('../config/config')
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodemailer.createTransport({
    service: config.mailing.SERVICE,
    port: 587,
    auth: {
        user: config.mailing.USER,
        pass: config.mailing.PASSWORD
    }
})

transporter.verify(function(error, success) {
    if(error){
        console.log(error)
    }else{
        console.log('Server is ready to take our messages')
    }
})

export const sendEmailCheckout = async (user) => {     
    let template = (`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <title>Confirmación de registro</title>
                    
                    <!-- Start Common CSS -->
                    <style type="text/css">
                    
                    </style>
                    <!-- End Common CSS -->
                </head>
                <body>
                    <h2>Felicitaciones!</h2>
                    <h3>Tu registro se completo correctamente.</h3>
                </body>
            </html>
    `)

        const mailOptions = {
            from: 'coderhouse@ecommerce.com',
            to: user.email,
            subject: 'Confirmación de registro',
            html: template
        }
            
        try {
            let result = transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    return false
                }                
            })
            return true
        } catch (error) {
            return false
        }
}


// module.exports = { sendEmailCheckout }