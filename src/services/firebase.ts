import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, getDoc, query, where, orderBy, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { MockTest, Question, TestResult, StudentProfile } from '../types';

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
  CLASSES: 'classes',
  SUBJECTS: 'subjects',
  QUESTIONS: 'questions',
  QUESTION_BANKS: 'questionBanks',
  TESTS: 'tests',
  TEST_ATTEMPTS: 'testAttempts',
  RESULTS: 'results',
  OFFLINE_RESULTS: 'offlineResults',
  MATERIALS: 'materials',
  NOTICES: 'notices',
  SETTINGS: 'settings',
};

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

export function addToOfflineSyncQueue(item: { type: 'test_result' | 'student' | 'question' | 'test'; data: any; timestamp: string }) {
  const queue = getOfflineSyncQueue();
  queue.push(item);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

export function clearOfflineSyncQueue() {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
}

// Save Test Result to Firebase or queue locally
export async function syncTestResult(result: TestResult): Promise<{ success: boolean; syncedToCloud: boolean }> {
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
      }
    } catch {
      remaining.push(item);
    }
  }

  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remaining));
  return { totalSynced: synced };
}
