'use strict';
if (process.env.DEV_ENV == "DEVELOPMENT") {
    require('dotenv').config({
        path: '.env.development'
    });
}
var http = require('http');
var qs = require('querystring');
var data;
var allowed_domains = process.env.ALLOWED_DOMAINS.split(',');
const nodemailer = require('nodemailer');
var server = http.createServer(function(req, res) {
    var data = '';
    var payload;
    var body;
    if (req.method == "POST") {
        req.on('data', function(chunk) {
            data += chunk;
            payload = JSON.parse(data);
            body = JSON.stringify(payload, null, 2);
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: true, // secure:true for port 465, secure:false for port 587
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
	    var mail_body = "Your build for the repo " + payload.repository.repo_url + " was successful!";
            mail_body += '<pre>' + body + '</pre>';
            let mailOptions = {
                from: '"' + process.env.FROM_NAME + '" ' + process.env.FROM_MAIL,
                to: process.env.TO_MAIL,
                subject: "Your Build for " + payload.repository.name + " on Docker Hub was Successful",
                html: mail_body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end('post received');
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write("The server only accepts POST request from Docker Hub<br>");
	res.write("Please set the webhook on Docker Hub using this instructions: https://docs.docker.com/docker-hub/webhooks/");
	res.end();
    }
});

server.listen(process.env.PORT);
