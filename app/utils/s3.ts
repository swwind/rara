import { Client } from "minio";

function streamToBuffer(stream: NodeJS.ReadableStream) {
  const buffer: any[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    stream.on("data", (data) => buffer.push(data));
    stream.on("end", () => resolve(Buffer.concat(buffer)));
    stream.on("error", (err) => reject(err));
  });
}

export class S3 {
  #client: Client;
  #bucket: string;

  constructor(client: Client, bucket: string) {
    this.#client = client;
    this.#bucket = bucket;
  }

  async writeFile(filename: string, file: File) {
    return await this.#client.putObject(
      this.#bucket,
      filename,
      Buffer.from(await file.arrayBuffer())
    );
  }

  async readFile(filename: string) {
    const data = await this.#client.getObject(this.#bucket, filename);
    return await streamToBuffer(data);
  }

  async readFilePartial(filename: string, offset: number, length: number) {
    const data = await this.#client.getPartialObject(
      this.#bucket,
      filename,
      offset,
      length
    );
    return await streamToBuffer(data);
  }

  async deleteFile(filename: string) {
    return await this.#client.removeObject(this.#bucket, filename);
  }
}
