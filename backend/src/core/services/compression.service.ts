import { Injectable } from '@nestjs/common';
import { deflate, inflate } from 'pako';

@Injectable()
export class CompressionService {
  private zlib: any;

  public compress(data: any) {
    return JSON.stringify(deflate(JSON.stringify(data)));
    //     this.zlib.deflateSync(data);
  }

  public decompress(data: any) {
    console.log(JSON.parse(JSON.stringify(inflate(data))));
    return JSON.parse(JSON.stringify(inflate(data)));
    //     return this.zlib.inflateSync(data);
  }
}
