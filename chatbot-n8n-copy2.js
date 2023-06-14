const express = require('express');
const http = require('http');
const {WebhookClient} = require('dialogflow-fulfillment');
const { body, validationResult} = require('express-validator')
const dialogflow = require('@google-cloud/dialogflow');
const { query } = require('express');
const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const request = require('request')
GOOGLE_APPLICATION_CREDENTIALS = "./teste-kihs-e36b8aad7371.json"

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/", express.static(__dirname + "/"))

app.get("/", (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

//do wweb-js

const { WaitTask, errors } = require('puppeteer');
const qrcode = require('qrcode-terminal');

 const sheetdb = require('sheetdb-node');
 const clientSheet = sheetdb({ address: '0dn8zbcrq2vad' })

const { Client, LocalAuth, Buttons } = require('./index');
const { executionAsyncId } = require('async_hooks');
const { application } = require('express');
const { json } = require('express');

const client = new Client({
    authStrategy: new LocalAuth()
});


//do wweb-js


app.post('/webhook', function(request, response){
    const agent = new WebhookClient ({ request, response });
        let intentMap = new Map();
        intentMap.set('nomedaintencao', nomedafuncao)
    });;
    function nomedafuncao (agent) {
}

const sessionClient = new dialogflow.SessionsClient({keyfilename: "teste-kihs-e36b8aad7371.json"});

async function detectIntent(
        projectId,
        sessionId,
        query,
        contexts,
        languageCode
) {
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts:contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
    let context;
    let intentResponse;
    for (const query of queries) {
        try {
            console.log(`Pergunta: ${query}`);
            intentResponse = await detectIntent(
                projectId,
                sessionId,
                query,
                context,
                languageCode
            )
            console.log(`Intent: ${intentResponse.queryResult.intent.displayName}`);
            console.log('Enviando Resposta');
            console.log('Resposta: ' + intentResponse.queryResult.fulfillmentText);
            return `${intentResponse.queryResult.fulfillmentText}`
        } catch (error) {
            console.log(error);
        }
    }
}

async function findIntent(projectId, sessionId, queries, languageCode) {
    let context;
    let intentResponse;
    for (const query of queries) {
        try {
            console.log(`Pergunta: ${query}`);
            intentResponse = await detectIntent(
                projectId,
                sessionId,
                query,
                context,
                languageCode
            )
            console.log(`Intent: ${intentResponse.queryResult.intent.displayName}`);
            console.log('Enviando Resposta');
            console.log('Resposta: ' + intentResponse.queryResult.fulfillmentText);
            return `${intentResponse.queryResult.intent.displayName}`
        } catch (error) {
            console.log(error);
        }
    }
}

function isEmptyObjetct(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
})

client.initialize()

app.post('/send-message', [
    body('number').notEmpty(),
    body('message').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req).formatWith(({
        msg
    }) => {
        return msg;
    })

if (!errors.isEmpty()) {
    return res.status(422).json({
        status: false,
        message: errors.mapped()
    })
}

const number = req.body.number;
const message = req.body.message;

client.sendMessage(number, message).then(response => {
    res.status(200).json({
        status: true,
        message: 'Mensagem enviada111',
        response: response
    });
}).catch(err => {
    res.status(500).json({
        status: false,
        message: 'Mensagem não enviadasssss',
        response: err.text
    });
    console.log(err);
});
});

client.on('message', async message => {
    
    var options = {
        'method': 'POST',
        'url': 'https://n8n-production-35b5.up.railway.app/webhook-test/d18ffdb2-a236-4980-8683-7c1cf9c80d06',
        'headers': {
            'Content-Type': 'application/json'
        },
        json: message
    };

    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        } 
        else {
            console.log(response.body)
        }
    })
});


server.listen(port, function() {
    console.log('App rodando na porta *: ' + port);
});


