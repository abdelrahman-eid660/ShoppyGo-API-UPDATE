import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// تحديد المسار بدقة باستخدام process.cwd()
const filePath = resolve(process.cwd(), 'src/config/shoppygo-9d02a-firebase-adminsdk-fbsvc-822e87515d.json');

// التأكد من وجود الملف قبل قراءته
if (!existsSync(filePath)) {
  throw new Error(`❌ Firebase service account file not found at: ${filePath}`);
} else {
  console.log('✅ Firebase service account file loaded successfully from:', filePath);
}

const serviceAccount = JSON.parse(readFileSync(filePath, 'utf8'));

export const firebaseApp =
  admin.apps.length > 0
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });