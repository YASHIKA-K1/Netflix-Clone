import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtf6VXFs53YhV0sCcWs67tVx_vCObQgCM",
  authDomain: "netflix-clone-70136.firebaseapp.com",
  projectId: "netflix-clone-70136",
  storageBucket: "netflix-clone-70136.appspot.com",
  messagingSenderId: "418354323055",
  appId: "1:418354323055:web:269f074bc7035d1fdfb79a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
  try {
    console.log('Attempting to sign up user...');
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log('User created:', user.uid);
    
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    
    console.log('User added to Firestore:', user.uid);
    toast.success("Signup successful!");
    return user; // Return user object
  } catch (error) {
    console.error("Signup error:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    return null; // Return null in case of error
  }
};

// Login function
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', res.user.uid);
    toast.success("Login successful!");
    return res.user; // Return user object
  } catch (error) {
    console.error("Login error:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    return null; // Return null in case of error
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout successful!");
  } catch (error) {
    console.error("Logout error:", error.message);
    toast.error("Logout failed: " + error.message);
  }
};

export { auth, db, login, signup, logout };
