let AWS = require('aws-sdk');
const sns = new AWS.SNS();
const ses = new AWS.SES();
const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
    s3.putObject({
        "Body": "1",
        "Bucket": "indunil1",
        "Key": "10"
    })
        .promise()
        .then(data => {
            console.log(data);           // successful response
            /*
            data = {
                ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
                VersionId: "pSKidl4pHBiNwukdbcPXAIs.sshFFOc0"
            }
            */
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });
    ses.sendEmail({
        Destination: {
            ToAddresses: ['indunil@adroitlogic.com'],
            CcAddresses: [],
            BccAddresses: []
        },
        Message: {
            Body: {
                Text: {
                    Data: 'As you can see, I gradually moved forward with Sigma IDE, with minimum prior knowledge of how to build a serverless application. Sigma handles all the hard works and delivers the coolest Serverless IDE to your hands.'
                }
            },
            Subject: {
                Data: 'subject test 1'
            }
        },
        Source: 'hirudinee+aws@adroitlogic.com',
    }, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });
    sns.publish({
        Message: 'test sample',
        Subject: 'subject 1',
        MessageAttributes: {},
        MessageStructure: 'String',
        TopicArn: 'arn:aws:sns:us-east-1:318300609668:amplify_codecommit_topic'
    }).promise()
        .then(data => {
            // your code goes here
        })
        .catch(err => {
            // error handling goes here
        });


    callback(null, { "message": "Successfully executed" });
}