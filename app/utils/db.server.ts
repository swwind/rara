import { PrismaClient } from "@prisma/client";
import { Client, ClientOptions } from "minio";
import { unstable_createMemoryUploadHandler, UploadHandler } from "remix";
import { S3 } from "./s3";

if (!process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY) {
  throw new Error("S3_ACCESS_KEY and S3_SECRET_KEY must be set");
}

const s3Config: ClientOptions = {
  endPoint: process.env.S3_ENDPOINT || "localhost",
  port: Number(process.env.S3_PORT || 9000),
  useSSL: false,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
};

const bucket = process.env.S3_BUCKET;

if (!bucket) {
  throw new Error("S3_BUCKET must be set");
}

const maxFileSize = Number(process.env.MAX_FILE_SIZE || 20_000_000);

const uploaderHandlerOption: Parameters<
  typeof unstable_createMemoryUploadHandler
>[0] = {
  maxFileSize,
};

let db: PrismaClient;
let s3: S3;
let uploadHandler: UploadHandler;

declare global {
  var __db: PrismaClient | undefined;
  var __s3: S3 | undefined;
  var __uploadHandler: UploadHandler | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
  db.$connect();
  s3 = new S3(new Client(s3Config), bucket);
  uploadHandler = unstable_createMemoryUploadHandler(uploaderHandlerOption);
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  if (!global.__s3) {
    global.__s3 = new S3(new Client(s3Config), bucket);
  }
  if (!global.__uploadHandler) {
    global.__uploadHandler = unstable_createMemoryUploadHandler(
      uploaderHandlerOption
    );
  }

  db = global.__db;
  s3 = global.__s3;
  uploadHandler = global.__uploadHandler;
}

export { db, s3, uploadHandler };
