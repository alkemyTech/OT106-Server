// Adds the environment variables
require('dotenv').config();
// This could be removed if the environment variables are already added,
// but that will depend on when they are added

const { createReadStream } = require('fs');
const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

// Creates an Amazon S3 service client object
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Uploads a file to Amazon S3 bucket
// This will create/update depending if the key already exists or not
// You could create/access folders adding them to filename
const uploadFile = (filename, buffer) =>{
    try {
      let sUrl;
      let sKey= `${filename}.jpg`
      s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: sKey,
          Body: buffer
        })
      );
        
      sUrl= `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${sKey}`;
      return sUrl;
        
  } catch (error) {
      console.log(error);
      throw new Error()
  }
  }
// Lists up to 1000 files from the bucket
// In order to list more files you should list again sending the key of the
// last file received until IsTruncated (a property in the response) is false
const listFiles = lastFileKey =>
  s3Client.send(
    new ListObjectsCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Marker: lastFileKey,
    })
  );

// Deletes a file from Amazon S3 bucket
const deleteFile = filename =>
  s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
    })
  );

module.exports = {
  uploadFileToAmazonS3Bucket: uploadFile,
  listFilesFromAmazonS3Bucket: listFiles,
  deleteFileFromAmazonS3Bucket: deleteFile,
};
