export default {
  s3: {
    REGION: 'YOUR_S3_UPLOADS_BUCKET_REGION',
    BUCKET: 'YOUR_S3_UPLOADS_BUCKET_NAME',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://uke4egycm4.execute-api.us-east-1.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_knIsztI5h',
    APP_CLIENT_ID: '5cbhrjn234ipcv2aelaqo1asqa',
    IDENTITY_POOL_ID: 'us-east-1:01b96efc-8f6f-4f94-9160-dc6890678d53',
  },
};
