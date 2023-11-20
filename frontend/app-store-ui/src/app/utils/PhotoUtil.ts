import { Buffer } from 'buffer';

export default class PhotoUtil {
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

  static handleUploadImageToByteArray(file: File): Promise<string> {
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
}
