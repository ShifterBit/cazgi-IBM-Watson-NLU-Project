const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

function getNLUInstance() {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-03-25',
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url
  });

  return naturalLanguageUnderstanding;
}


app.use(express.static('client'));

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
  res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
  const analyzeParams = {
    url: req.query.url,
    'features': {
      'emotion': {},
    }
  };
  const response = getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.emotion.document, null, 2));
  }).catch(err => {
    console.error("error: ", err);
    return res.send(err);
  })
});

app.get("/url/sentiment", (req, res) => {
  console.log("request: ", req.query);
  const analyzeParams = {
    url: req.query.url,
    'features': {
      'sentiment': {},
    }
  };
  const response = getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.sentiment.document, null, 2));
  }).catch(err => {
    console.log("error: ", err);

    return res.send(err);
  });
});

app.get("/text/emotion", (req, res) => {
  const analyzeParams = {
    url: req.query.text,
    'features': {
      'emotion': {},
    }
  };
  const response = getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.emotion.document, null, 2));
  }).catch(err => {
    console.error("error: ", err);
    return res.send(err);
  });
});

app.get("/text/sentiment", (req, res) => {
  const analyzeParams = {
    url: req.query.text,
    'features': {
      'sentiment': {},
    }
  };
  const response = getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.sentiment.document, null, 2));
  }).catch(err => {
    console.error("error: ", err);
    return res.send(err);
  });
});

let server = app.listen(8080, () => {
  console.log('Listening', server.address().port)
})

