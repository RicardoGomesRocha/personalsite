import { writeFile } from 'fs';
import { environment } from './environment';

const targetPath = 'src/environments/environment.prod.ts';

// Firebase environment variables
environment.firebase.apiKey = process.env['FIREBASE_API_KEY'] || '';
environment.firebase.authDomain = process.env['FIREBASE_AUTH_DOMAIN'] || '';
environment.firebase.databaseURL =
  process.env['FIREBASE_AUTH_DATABASE_URL'] || '';
environment.firebase.projectId = process.env['FIREBASE_AUTH_PROJECT_ID'] || '';
environment.firebase.storageBucket =
  process.env['FIREBASE_STORAGE_BUCKET'] || '';
environment.firebase.messagingSenderId =
  process.env['FIREBASE_MESSAGING_SENDER_ID'] || '';
environment.firebase.appId = process.env['FIREBASE_API_ID'] || '';
environment.firebase.measurementId =
  process.env['FIREBASE_MEASUREMENT_ID'] || '';

environment.production = true;

const fileContent = `export const environment = ${JSON.stringify(environment)}`;

writeFile(targetPath, fileContent, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
