import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

class PhotoUtil {
  static urlToImageByByteData(data: any): string {
    const binaryData = Buffer.from(data, 'base64');
    const byteArray = new Uint8Array(binaryData);
    return URL.createObjectURL(new Blob([byteArray]));
  }

  static handleUploadUrlToImage(file: File): string {
    return URL.createObjectURL(file);
  }

  static loadImage(imageAsString: string): string {
    return this.urlToImageByByteData(imageAsString);
  }

  // static upload image
  // handleUpload(event: any) {
  //   let file = event.files[0];
  //   this.imageUrl = this.handleUploadUrlToImage(file);
  //   this.handleUploadImageToByteArray(file);
  // }

  //static  handleUploadImageToByteArray(file: File): any {
  //   let reader = new FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onload = () => {
  //     const buffer = Buffer.from(new Uint8Array(reader.result as ArrayBuffer));
  //     const base64String = buffer.toString('base64');
  //     this.imageAsString = base64String;
  //     //change
  //     // this.imageUrl2 = this.loadImage(this.imageAsString);
  //   };
  // }

  static handleUploadImageToByteArray2(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        const buffer = Buffer.from(
          new Uint8Array(reader.result as ArrayBuffer)
        );
        const base64String = buffer.toString('base64');
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  // awsImageAsBytes: any;
  // urlToImageByBytesAWS?: string;
  // imageName?: string;

  // getS3ImageSrcByImageName(imageName?: string) {
  //   console.log('start');
  //   this.imageName = imageName;

  //   const client = new S3Client({
  //     credentials: {
  //       accessKeyId: 'XXX',
  //       secretAccessKey: 'XXX',
  //     },
  //     region: 'us-east-1',
  //   });
  //   console.log('main');

  //   const main = async () => {
  //     const command = new GetObjectCommand({
  //       Bucket: 'images-store-application',
  //       Key: 'items/' + this.imageName,
  //     });

  //     try {
  //       const response = await client.send(command);
  //       this.awsImageAsBytes = await response.Body!.transformToString();
  //       console.log(this.awsImageAsBytes);
  //       this.urlToImageByBytesAWS = this.urlToImageByByteData(
  //         this.awsImageAsBytes
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   main();
  // }

  awsImageAsBytes: any;
  urlToImageByBytesAWS?: string;
  imageName?: string;

  async getS3ImageSrcByImageName(
    imageName?: string
  ): Promise<string | undefined> {
    console.log('start');
    this.imageName = imageName;

    const client = new S3Client({
      credentials: {
        accessKeyId: 'XXX',
        secretAccessKey: 'XXX',
      },
      region: 'us-east-1',
    });
    console.log('main');

    const main = async () => {
      const command = new GetObjectCommand({
        Bucket: 'images-store-application',
        Key: 'items/' + this.imageName,
      });

      try {
        const response = await client.send(command);
        this.awsImageAsBytes = await response.Body!.transformToString();
        console.log(this.awsImageAsBytes);
        this.urlToImageByBytesAWS = this.urlToImageByByteData(
          this.awsImageAsBytes
        );
      } catch (err) {
        console.error(err);
      }
    };

    await main();

    return this.urlToImageByBytesAWS;
  }

  urlToImageByByteData(data: any): string {
    const binaryData = Buffer.from(data, 'base64');
    const byteArray = new Uint8Array(binaryData);
    return URL.createObjectURL(new Blob([byteArray]));
  }
}
