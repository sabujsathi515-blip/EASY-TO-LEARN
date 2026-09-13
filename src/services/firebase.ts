import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  Auth,
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  FirebaseStorage,
} from 'firebase/storage';
import { MockTest, Question, TestResult, StudentProfile, StudyMaterial, Notice } from '../types';

// Read Firebase configuration from environment variables if provided
const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Check if valid Firebase configuration is present
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY'
);

let app: any = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    console.log('✅ Firebase initialized successfully for EASY TO LEARN');
  } catch (err) {
    console.warn('⚠️ Firebase initialization deferred, using local persistent engine:', err);
  }
}

export { db, auth, storage };

// Firestore collection names adhering to the specification
export const COLLECTIONS = {
  USERS: 'users',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  ADMINS: 'admins',
  CLASSES: 'classes',
  SUBJECTS: 'subjects',
  CHAPTERS: 'chapters',
  QUESTIONS: 'questions',
  QUESTION_BANKS: 'questionBanks',
  TESTS: 'tests',
  TEST_ATTEMPTS: 'testAttempts',
  RESULTS: 'results',
  OFFLINE_RESULTS: 'offlineResults',
  MATERIALS: 'materials',
  NOTICES: 'notices',
  CERTIFICATES: 'certificates',
  SETTINGS: 'settings',
};

// ============================================================================
// Firebase Storage Uploader with Fallback DataURL generator
// ============================================================================
export interface UploadResult {
  fileUrl: string;
  storagePath: string;
  fileName: string;
  fileSize: string;
  isCloudStorage: boolean;
}

export async function uploadEducationalFile(
  file: File,
  classId: number,
  category: string,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `materials/class-${classId}/${category}/${timestamp}_${safeName}`;
  const fileSizeStr = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`;

  // If Firebase Storage is active and configured
  if (isFirebaseConfigured && storage && navigator.onLine) {
    try {
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return await new Promise<UploadResult>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(Math.round(progress));
          },
          (error) => {
            console.warn('Firebase storage upload failed, falling back to local encoding:', error);
            // Fallback to local DataURL
            encodeFileAsDataUrl(file).then((dataUrl) => {
              resolve({
                fileUrl: dataUrl,
                storagePath,
                fileName: file.name,
                fileSize: fileSizeStr,
                isCloudStorage: false,
              });
            }).catch(reject);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            if (onProgress) onProgress(100);
            resolve({
              fileUrl: downloadUrl,
              storagePath,
              fileName: file.name,
              fileSize: fileSizeStr,
              isCloudStorage: true,
            });
          }
        );
      });
    } catch (err) {
      console.warn('Storage ref error, fallback to local encoding:', err);
    }
  }

  // Local fallback conversion for development/offline
  if (onProgress) {
    onProgress(30);
    setTimeout(() => onProgress(70), 100);
    setTimeout(() => onProgress(100), 200);
  }
  const dataUrl = await encodeFileAsDataUrl(file);
  return {
    fileUrl: dataUrl,
    storagePath,
    fileName: file.name,
    fileSize: fileSizeStr,
    isCloudStorage: false,
  };
}

function encodeFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Delete file from Firebase Storage
export async function deleteStorageFile(storagePath: string): Promise<boolean> {
  if (!isFirebaseConfigured || !storage || !storagePath) return false;
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
    return true;
  } catch (err) {
    console.warn('Could not delete from storage:', err);
    return false;
  }
}

// ============================================================================
// Firestore Operations for Study Materials
// ============================================================================
export async function syncMaterialToFirestore(material: StudyMaterial): Promise<boolean> {
  if (!isFirebaseConfigured || !db || !navigator.onLine) {
    addToOfflineSyncQueue({ type: 'material', data: material, timestamp: new Date().toISOString() });
    return false;
  }
  try {
    const docRef = doc(db, COLLECTIONS.MATERIALS, material.id);
    await setDoc(docRef, material);
    return true;
  } catch (err) {
    console.warn('Firestore sync error for material:', err);
    addToOfflineSyncQueue({ type: 'material', data: material, timestamp: new Date().toISOString() });
    return false;
  }
}

export async function deleteMaterialFromFirestore(materialId: string, storagePath?: string): Promise<boolean> {
  if (storagePath) {
    await deleteStorageFile(storagePath);
  }
  if (!isFirebaseConfigured || !db) return true;
  try {
    const docRef = doc(db, COLLECTIONS.MATERIALS, materialId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Error deleting material from firestore:', err);
    return false;
  }
}

// ============================================================================
// Firestore Operations for Questions & Mock Tests
// ============================================================================
export async function syncQuestionToFirestore(question: Question): Promise<boolean> {
  if (!isFirebaseConfigured || !db || !navigator.onLine) {
    addToOfflineSyncQueue({ type: 'question', data: question, timestamp: new Date().toISOString() });
    return false;
  }
  try {
    const docRef = doc(db, COLLECTIONS.QUESTIONS, question.id);
    await setDoc(docRef, question);
    return true;
  } catch (err) {
    console.warn('Firestore sync error for question:', err);
    addToOfflineSyncQueue({ type: 'question', data: question, timestamp: new Date().toISOString() });
    return false;
  }
}

export async function deleteQuestionFromFirestore(questionId: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return true;
  try {
    const docRef = doc(db, COLLECTIONS.QUESTIONS, questionId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    return false;
  }
}

export async function syncMockTestToFirestore(test: MockTest): Promise<boolean> {
  if (!isFirebaseConfigured || !db || !navigator.onLine) {
    addToOfflineSyncQueue({ type: 'test', data: test, timestamp: new Date().toISOString() });
    return false;
  }
  try {
    const docRef = doc(db, COLLECTIONS.TESTS, test.id);
    await setDoc(docRef, test);
    return true;
  } catch (err) {
    addToOfflineSyncQueue({ type: 'test', data: test, timestamp: new Date().toISOString() });
    return false;
  }
}

export async function syncStudentToFirestore(student: StudentProfile): Promise<boolean> {
  if (!isFirebaseConfigured || !db || !navigator.onLine) {
    addToOfflineSyncQueue({ type: 'student', data: student, timestamp: new Date().toISOString() });
    return false;
  }
  try {
    const docRef = doc(db, COLLECTIONS.STUDENTS, student.id);
    await setDoc(docRef, student);
    return true;
  } catch (err) {
    addToOfflineSyncQueue({ type: 'student', data: student, timestamp: new Date().toISOString() });
    return false;
  }
}

// Offline sync queue management
const OFFLINE_QUEUE_KEY = 'e2l_offline_sync_queue_v1';

export function getOfflineSyncQueue(): any[] {
  try {
    const data = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToOfflineSyncQueue(item: {
  type: 'test_result' | 'student' | 'question' | 'test' | 'material';
  data: any;
  timestamp: string;
}) {
  const queue = getOfflineSyncQueue();
  queue.push(item);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

export function clearOfflineSyncQueue() {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
}

// Save Test Result to Firebase or queue locally
export async function syncTestResult(
  result: TestResult
): Promise<{ success: boolean; syncedToCloud: boolean }> {
  if (isFirebaseConfigured && db && navigator.onLine) {
    try {
      const docRef = doc(db, COLLECTIONS.RESULTS, result.id);
      await setDoc(docRef, result);
      return { success: true, syncedToCloud: true };
    } catch (err) {
      console.warn('Cloud sync error, storing locally in offline queue:', err);
      addToOfflineSyncQueue({ type: 'test_result', data: result, timestamp: new Date().toISOString() });
      return { success: true, syncedToCloud: false };
    }
  } else {
    // Queue locally when offline or unconfigured
    addToOfflineSyncQueue({ type: 'test_result', data: result, timestamp: new Date().toISOString() });
    return { success: true, syncedToCloud: false };
  }
}

// Flush offline queue when reconnected
export async function flushOfflineSyncQueue(): Promise<{ totalSynced: number }> {
  const queue = getOfflineSyncQueue();
  if (queue.length === 0 || !isFirebaseConfigured || !db || !navigator.onLine) {
    return { totalSynced: 0 };
  }

  let synced = 0;
  const remaining: any[] = [];

  for (const item of queue) {
    try {
      if (item.type === 'test_result') {
        const docRef = doc(db, COLLECTIONS.RESULTS, item.data.id);
        await setDoc(docRef, item.data);
        synced++;
      } else if (item.type === 'student') {
        const docRef = doc(db, COLLECTIONS.STUDENTS, item.data.id);
        await setDoc(docRef, item.data);
        synced++;
      } else if (item.type === 'material') {
        const docRef = doc(db, COLLECTIONS.MATERIALS, item.data.id);
        await setDoc(docRef, item.data);
        synced++;
      } else if (item.type === 'question') {
        const docRef = doc(db, COLLECTIONS.QUESTIONS, item.data.id);
        await setDoc(docRef, item.data);
        synced++;
      } else if (item.type === 'test') {
        const docRef = doc(db, COLLECTIONS.TESTS, item.data.id);
        await setDoc(docRef, item.data);
        synced++;
      }
    } catch {
      remaining.push(item);
    }
  }

  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remaining));
  return { totalSynced: synced };
}

