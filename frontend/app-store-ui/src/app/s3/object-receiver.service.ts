import { Injectable } from '@angular/core';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import PhotoUtil from '../utils/PhotoUtil';

@Injectable({
  providedIn: 'root',
})
export class ObjectReceiverService {
  accessKeyId: string = '';
  secretAccessKey: string = '';

  constructor() {}

  async getS3ImageSrcByImageName(
    imageName?: string
  ): Promise<string | undefined> {
    if (
      this.accessKeyId === '' ||
      this.secretAccessKey === '' ||
      imageName == 'not-found'
    )
      return '/assets/images/not-found.jpg';

    const client = new S3Client({
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
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
