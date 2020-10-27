const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const {aws_accessKeyId, aws_secretAccessKey} = require('../config');

aws.config.update({
    accessKeyId: aws_accessKeyId,
    secretAccessKey: aws_secretAccessKey,
})

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'amazon-clone-ver1',
        acl: 'public-read',
        metadata: (req,file,cb)=> {
            cb(null, {
                fieldName: file.fieldname
            },)
        },
        key: (req,file,cb)=> {
            cb(null, Date.now().toString())
        }
    }),
    
})

module.exports = upload;