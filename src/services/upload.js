const s3 = require('../connections/aws-sdk');

const uploadFiles = async (path, buffer, mimetype) => {
    const file = await s3.upload({
        Bucket: process.env.BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise();

    return {
        url: `https://${process.env.BUCKET}.${process.env.ENDPOINT_S3}/${file.Key}`
    };
};

const deleteFiles = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.BUCKET,
        Key: path
    }).promise();
};

module.exports = {
    uploadFiles,
    deleteFiles
};