/**
 * EASY TO LEARN - Firebase Configuration
 * 
 * ---------------------------------------------------------------------------------
 * FIREBASE SETUP INSTRUCTIONS (কিভাবে FIREBASE সেটআপ করবেন):
 * ---------------------------------------------------------------------------------
 * 1. Firebase Console-এ যান: https://console.firebase.google.com/
 * 2. একটি নতুন প্রজেক্ট তৈরি করুন বা বিদ্যমান প্রজেক্ট নির্বাচন করুন (যেমন: EasyToLearn-Portal)।
 * 3. Project Settings -> General -> "Your apps"-এ গিয়ে Web App (</>) যোগ করুন।
 * 4. সেখানে দেখানো 'firebaseConfig' অবজেক্টটির মান নিচের ফিল্ডগুলোতে পেস্ট করুন,
 *    অথবা প্রজেক্টের .env ফাইলে VITE_FIREBASE_* চলক হিসেবে লিখুন।
 * ---------------------------------------------------------------------------------
 */

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};

export const FIREBASE_CONFIG = {
  // আপনার Firebase API Key এখানে বসান (অথবা .env ফাইলে VITE_FIREBASE_API_KEY)
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSy_YOUR_FIREBASE_API_KEY_HERE",

  // আপনার Firebase Auth Domain (যেমন: easy-to-learn-portal.firebaseapp.com)
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "your-app-id.firebaseapp.com",

  // আপনার Firebase Project ID (যেমন: easy-to-learn-portal)
  projectId: env.VITE_FIREBASE_PROJECT_ID || "your-project-id",

  // আপনার Firebase Storage Bucket (যেমন: easy-to-learn-portal.appspot.com)
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",

  // আপনার Messaging Sender ID
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",

  // আপনার Firebase App ID
  appId: env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
};

// Check if credentials have been replaced from placeholders
export function checkIsFirebaseConfigured(): boolean {
  return Boolean(
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.projectId &&
    !FIREBASE_CONFIG.apiKey.includes('YOUR_FIREBASE_API_KEY') &&
    !FIREBASE_CONFIG.projectId.includes('your-project-id')
  );
}
