const service = require('../../services/comics/comics.service');
const serviceInstance = new service();

const SESConfig = {
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_SECRET_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1"
}
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
class ComicsController {

    async getAllComicsData(req, res, next) {
        // Create S3 service object
        const s3 = new AWS.S3();

        // Create the parameters for calling listObjects
        const bucketParams = {
            Bucket: 'twc-us-east-1-production-comics',
        };

    
        // Call S3 to obtain a list of the objects in the bucket
        s3.listObjects(bucketParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Contents[0]);
                console.log("Url: ", "https://"+ "twc-us-east-1-production-comics" +".s3.us-east-1.amazonaws.com/" + data.Contents[0].Key)
            }
        });
        try {
            const AllComicsData = await serviceInstance.allcomicsService();
            return res.status(200).send(AllComicsData);
        } catch (err) {
            console.log("Error: " + err.message);
            err.message = "Error encountered while retrieving all comics data"
            next(err);
        }
    }

    async userComicsController(req, res, next) {
        try {
            const response = await serviceInstance.userComicsService(req);
            return res.status(200).send(response);
        } catch (err) {
            console.log("Error: " + err.message);
            err.message = "Error encountered while retrieving user comics data"
            next(err);
        }
    }

    async comicInfoController(req, res, next) {
        try {
            const response = await serviceInstance.ComicInfoService(req.body);
            return res.status(200).send(response);
        } catch (err) {
            console.log("Error: " + err.message);
            err.message = "Error encountered while retrieving comic info data"
            next(err);
        }
    }
}

module.exports = ComicsController;
