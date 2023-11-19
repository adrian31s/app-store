import { Injectable } from '@angular/core';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import PhotoUtil from '../utils/PhotoUtil';

@Injectable({
  providedIn: 'root',
})
export class ObjectReceiverService {
  constructor() {}

  async getS3ImageSrcByImageName(
    imageName?: string
  ): Promise<string | undefined> {
    const client = new S3Client({
      credentials: {
        accessKeyId: 'AKIA2Y4DV6GK2TG5GOHI',
        secretAccessKey: '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',
      },
      region: 'us-east-1',
    });

    let urlToImageByBytesAWS: any;

    const main = async () => {
      const command = new GetObjectCommand({
        Bucket: 'images-store-application',
        Key: imageName,
      });

      try {
        const response = await client.send(command);
        let awsImageAsBytes = await response.Body!.transformToString();
        urlToImageByBytesAWS = PhotoUtil.urlToImageByByteData(awsImageAsBytes);
      } catch (err) {
        console.error(err);
      }
    };

    await main();

    return urlToImageByBytesAWS;
  }
}
