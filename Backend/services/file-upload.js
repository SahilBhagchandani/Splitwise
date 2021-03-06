const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = "splitwiselab2";
const region = "us-east-2";
const accessKeyId = "AKIA2VMPZYBZIBNOLOXH";

const secretAccessKey = "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";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename + ".jpg",
    ACL: "public-read",
    ContentType: "image/png",
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
