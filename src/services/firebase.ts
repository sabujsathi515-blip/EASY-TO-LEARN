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
  onSnapshot,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
import { MockTest, Question, TestResult, MockTestSubmission, StudentProfile, StudyMaterial, Notice } from '../types';
import { FIREBASE_CONFIG, checkIsFirebaseConfigured } from '../config/firebaseConfig';

// Read Firebase configuration from config/env
export const firebaseConfig = FIREBASE_CONFIG;

// Check if valid Firebase configuration is present
export const isFirebaseConfigured = checkIsFirebaseConfigured();

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

export function getFirebaseStatus() {
  return {
    isAvailable: !!db,
    projectId: firebaseConfig.projectId || 'easylearn-live-edu',
    appName: app ? app.name : 'offline',
  };
}

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
  MOCK_TEST_SUBMISSIONS: 'mockTestSubmissions',
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
      } else if (item.type === 'mock_test_submission') {
        const docRef = doc(db, COLLECTIONS.MOCK_TEST_SUBMISSIONS, item.data.id);
        await setDoc(docRef, {
          ...item.data,
          submittedAt: serverTimestamp(),
        });
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

// ============================================================================
// MOCK TEST SUBMISSIONS SYSTEM (Firebase Firestore Collection: mockTestSubmissions)
// ============================================================================

export const MOCK_SUBMISSIONS_STORAGE_KEY = 'e2l_mock_test_submissions_v1';

export function getLocalMockSubmissions(): MockTestSubmission[] {
  try {
    const raw = localStorage.getItem(MOCK_SUBMISSIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse local mock submissions:', e);
    return [];
  }
}

export function saveLocalMockSubmissions(submissions: MockTestSubmission[]) {
  try {
    localStorage.setItem(MOCK_SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
  } catch (e) {
    console.warn('Failed to cache mock submissions to localStorage:', e);
  }
}

/**
 * Saves a student's mock test submission into Firebase Firestore (mockTestSubmissions)
 * Guarantees zero data loss: records in local storage instantly, syncs to cloud if online.
 */
export async function saveMockTestSubmission(
  submissionData: Omit<MockTestSubmission, 'id'> & { id?: string }
): Promise<{ success: boolean; id: string; syncedToCloud: boolean; error?: string }> {
  const docId = submissionData.id || `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date();
  
  const formattedDate = submissionData.submissionDate || now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = submissionData.submissionTime || now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const timeSec = submissionData.timeTaken || 0;
  const timeTakenFormatted = submissionData.timeTakenFormatted || (
    timeSec >= 60
      ? `${Math.floor(timeSec / 60)} মি: ${timeSec % 60} সে:`
      : `${timeSec} সেকেন্ড`
  );

  const localSubmission: MockTestSubmission = {
    ...submissionData,
    id: docId,
    submissionDate: formattedDate,
    submissionTime: formattedTime,
    timeTakenFormatted,
    submittedAt: now.toISOString(),
    syncedToCloud: false,
  };

  // 1. Always save to local storage immediately
  const existingLocal = getLocalMockSubmissions();
  const updatedLocal = [localSubmission, ...existingLocal.filter((s) => s.id !== docId)];
  saveLocalMockSubmissions(updatedLocal);

  // 2. If Firebase is active and user is online, attempt cloud write
  if (isFirebaseConfigured && db && navigator.onLine) {
    try {
      const docRef = doc(db, COLLECTIONS.MOCK_TEST_SUBMISSIONS, docId);
      
      const firestorePayload = {
        id: docId,
        studentName: submissionData.studentName || 'Unknown Student',
        studentId: submissionData.studentId || 'N/A',
        className: submissionData.className || 'General',
        subject: submissionData.subject || 'General',
        testName: submissionData.testName || 'Mock Test',
        testId: submissionData.testId || '',
        classId: submissionData.classId || 0,
        subjectId: submissionData.subjectId || '',
        totalQuestions: submissionData.totalQuestions || 0,
        attemptedQuestions: submissionData.attemptedQuestions || 0,
        correctAnswers: submissionData.correctAnswers || 0,
        wrongAnswers: submissionData.wrongAnswers || 0,
        unansweredQuestions: submissionData.unansweredQuestions || 0,
        totalMarks: submissionData.totalMarks || 0,
        obtainedMarks: submissionData.obtainedMarks || 0,
        percentage: submissionData.percentage || 0,
        timeTaken: submissionData.timeTaken || 0,
        timeTakenFormatted,
        submissionDate: formattedDate,
        submissionTime: formattedTime,
        submittedAt: serverTimestamp(),
        studentAnswers: submissionData.studentAnswers || {},
        questionReviews: submissionData.questionReviews || [],
        isPassed: Boolean(submissionData.isPassed),
      };

      await setDoc(docRef, firestorePayload);

      // Update cloud sync state locally
      localSubmission.syncedToCloud = true;
      const syncedList = [localSubmission, ...existingLocal.filter((s) => s.id !== docId)];
      saveLocalMockSubmissions(syncedList);

      console.log(`✅ Saved submission ${docId} directly to Firestore mockTestSubmissions`);
      return { success: true, id: docId, syncedToCloud: true };
    } catch (err: any) {
      console.warn('⚠️ Cloud Firestore write error, kept in local storage:', err);
      addToOfflineSyncQueue({
        type: 'mock_test_submission' as any,
        data: localSubmission,
        timestamp: new Date().toISOString(),
      });
      return {
        success: true,
        id: docId,
        syncedToCloud: false,
        error: err?.message || 'Network error saving to cloud. Saved locally.',
      };
    }
  }

  // If offline or unconfigured, queue locally
  addToOfflineSyncQueue({
    type: 'mock_test_submission' as any,
    data: localSubmission,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    id: docId,
    syncedToCloud: false,
    error: isFirebaseConfigured ? 'Offline: Saved locally, will sync when online' : 'Firebase not configured: Saved to local storage',
  };
}

/**
 * Fetches all student submissions from Firestore (mockTestSubmissions)
 * Falls back to local storage seamlessly if offline or during setup.
 */
export async function fetchMockTestSubmissions(): Promise<MockTestSubmission[]> {
  const localList = getLocalMockSubmissions();

  if (isFirebaseConfigured && db && navigator.onLine) {
    try {
      const colRef = collection(db, COLLECTIONS.MOCK_TEST_SUBMISSIONS);
      const q = query(colRef, orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);

      const cloudList: MockTestSubmission[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as any;
        let submittedAtStr = new Date().toISOString();
        if (data.submittedAt?.toDate) {
          submittedAtStr = data.submittedAt.toDate().toISOString();
        } else if (typeof data.submittedAt === 'string') {
          submittedAtStr = data.submittedAt;
        }

        cloudList.push({
          ...data,
          id: d.id,
          submittedAt: submittedAtStr,
          syncedToCloud: true,
        });
      });

      // Merge local un-synced items with cloud items
      const mergedMap = new Map<string, MockTestSubmission>();
      cloudList.forEach((item) => mergedMap.set(item.id, item));
      localList.forEach((item) => {
        if (!mergedMap.has(item.id)) {
          mergedMap.set(item.id, item);
        }
      });

      const finalList = Array.from(mergedMap.values());
      saveLocalMockSubmissions(finalList);
      return finalList;
    } catch (err) {
      console.warn('Error fetching submissions from cloud, using local:', err);
      return localList;
    }
  }

  return localList;
}

/**
 * Subscribes to real-time updates of student submissions for Admin Dashboard
 */
export function subscribeToMockTestSubmissions(
  callback: (submissions: MockTestSubmission[]) => void
): () => void {
  // Always trigger immediately with current local data
  callback(getLocalMockSubmissions());

  if (!isFirebaseConfigured || !db) {
    return () => {};
  }

  try {
    const colRef = collection(db, COLLECTIONS.MOCK_TEST_SUBMISSIONS);
    const q = query(colRef, orderBy('submittedAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const cloudList: MockTestSubmission[] = [];
        snapshot.forEach((d) => {
          const data = d.data() as any;
          let submittedAtStr = new Date().toISOString();
          if (data.submittedAt?.toDate) {
            submittedAtStr = data.submittedAt.toDate().toISOString();
          } else if (typeof data.submittedAt === 'string') {
            submittedAtStr = data.submittedAt;
          }

          cloudList.push({
            ...data,
            id: d.id,
            submittedAt: submittedAtStr,
            syncedToCloud: true,
          });
        });

        // Merge with local un-synced items
        const localList = getLocalMockSubmissions();
        const mergedMap = new Map<string, MockTestSubmission>();
        cloudList.forEach((item) => mergedMap.set(item.id, item));
        localList.forEach((item) => {
          if (!mergedMap.has(item.id)) {
            mergedMap.set(item.id, item);
          }
        });

        const finalList = Array.from(mergedMap.values());
        saveLocalMockSubmissions(finalList);
        callback(finalList);
      },
      (error) => {
        console.warn('Real-time mockTestSubmissions listener error:', error);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Could not establish real-time listener:', err);
    return () => {};
  }
}

/**
 * Delete a student submission from database and local storage
 */
export async function deleteMockTestSubmission(submissionId: string): Promise<boolean> {
  // Remove from local cache
  const localList = getLocalMockSubmissions();
  const updated = localList.filter((s) => s.id !== submissionId);
  saveLocalMockSubmissions(updated);

  if (isFirebaseConfigured && db && navigator.onLine) {
    try {
      const docRef = doc(db, COLLECTIONS.MOCK_TEST_SUBMISSIONS, submissionId);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.warn('Error deleting submission from Firestore:', err);
      return false;
    }
  }

  return true;
}

// ============================================================================
// FIREBASE AUTHENTICATION HELPERS FOR ADMIN LOGIN
// ============================================================================

export async function signInAdminWithFirebase(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  if (!isFirebaseConfigured || !auth) {
    // Return friendly status indicating offline/fallback mode is available
    return {
      success: false,
      error: 'Firebase Auth is not configured. Please use Master PIN to access.',
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return { success: true, user: userCredential.user };
  } catch (err: any) {
    let message = 'Firebase login failed';
    if (err.code === 'auth/user-not-found') message = 'No admin account found with this email';
    else if (err.code === 'auth/wrong-password') message = 'Incorrect password';
    else if (err.code === 'auth/invalid-email') message = 'Invalid email address format';
    else if (err.message) message = err.message;

    return { success: false, error: message };
  }
}

export async function registerAdminWithFirebase(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  if (!isFirebaseConfigured || !auth) {
    return { success: false, error: 'Firebase Auth is not configured' };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    return { success: true, user: userCredential.user };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Could not register admin account' };
  }
}

export async function signOutAdmin(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out error:', e);
    }
  }
}

export function onAdminAuthStateChanged(callback: (user: any) => void): () => void {
  if (!isFirebaseConfigured || !auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}


