// const { S3Client, ListObjectsCommand } = require('@aws-sdk/client-s3');
// const { Upload } = require('@aws-sdk/lib-storage');

// const s3 = new S3Client({
//     endpoint: process.env.ENDPOINT_S3,
//     region: process.env.AWS_REGION,
//     credentials: {
//         accessKeyId: process.env.KEY_ID,
//         secretAccessKey: process.env.KEY_APP
//     }
// });

const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.KEY_APP
    }
});

module.exports = s3;