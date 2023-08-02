import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';

const uuidv4 = v4;
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

class UploadBucket {
  postImageDir: string;

  constructor() {
    // 포스트 사진 저장 경로
    this.postImageDir = 'images/show-posts';
  }

  // 버킷 업로드 틀
  upload = (saveDir: string) =>
    multer({
      storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME as string,
        key: (req, file, callback) => {
          callback(null, `${saveDir}/${Date.now()}_${uuidv4()}`);
        },
        acl: 'public-read-write',
        contentType: multerS3.AUTO_CONTENT_TYPE, // 파일의 Content-Type 자동 설정
        metadata: (req, file, callback) => {
          callback(null, { fieldName: file.fieldname });
        },
      }),
    });

  // 공연 포스트 사진 버킷 업로드
  postImage = (targetFile: string) => this.upload(this.postImageDir).single(targetFile);
}

export default UploadBucket;
