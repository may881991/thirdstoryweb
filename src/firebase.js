import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail,updateProfile, signOut} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc, doc, updateDoc} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDilgOKBP1iFC1y3rmz1K7kOQbzv_YrgE0",
    authDomain: "thirdstoryproject.firebaseapp.com",
    projectId: "thirdstoryproject",
    storageBucket: "thirdstoryproject.appspot.com",
    messagingSenderId: "791090450419",
    appId: "1:791090450419:web:8f8cc5a1279b69f9954c86",
    measurementId: "G-P14C60LKZL"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const addBookToUser = async (user, bookLists) => {
  const userData = JSON.parse(user)
  try{
    const userdb = query(collection(db, "users"), where("uid", "==", userData.uid));
    const getData =  await getDocs(userdb);
    console.log(getData)
    getData.forEach((ele) => {
      const data = ele.data();
      const userdoc = doc(db, "users", ele.id);
      if(data.shopLists.length === 0){
        updateDoc(userdoc, {
          shopLists : bookLists
        }).then(() => {
          console.log("add shopLists")
        }).catch((error) => {
          console.log(error)
        });
      }else if(data.shopLists.length > 0){
        const allBooks = data.shopLists;
        bookLists.forEach((bookArr) => {
          allBooks.push(bookArr);
        })
        updateDoc(userdoc, {
          shopLists : allBooks
        }).then(() => {
          console.log("updated shopLists")
        }).catch((error) => {
          console.log(error)
        });
      }
    });
    
  }catch(err){
    console.error(err.message)
  }
}

const getUserData = async (user) => {
  if(user !== null){ 
    try{
      const userdb = query(collection(db, "users"), where("uid", "==", user.uid));
      const getData =  await getDocs(userdb); 
      return getData;
    }catch(err){
      console.error(err.message)
      return err;
    }
  }else{
    return null;
  }
}

const getBookData = async ()=>{
  try{
    const bookDb = collection(db, "books");
    const getData =  await getDocs(bookDb);
    return getData;
  }catch(err){
    console.error(err.message)
  }
}

const getActivityData = async ()=>{
  try{
    const bookDb = collection(db, "activities");
    const getData =  await getDocs(bookDb);
    return getData;
  }catch(err){
    console.error(err.message)
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res)
  } catch (err) {
    console.error(err.message);
  }
};
const registerWithEmailAndPassword = async (displayName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password, displayName);
    console.log(res)
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: displayName,
      authProvider: "local",
      shopLists: [],
      email,
    });
    await updateProfile(auth.currentUser, {
      displayName: displayName
    }).then(() => {
      console.log("updated")
    }).catch((error) => {
      console.log(error)
    });
    return "Successfully created User!"
  } catch (err) {
    console.error(err.message);
    return "Your email already exist!";
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err.message);
  }
};
const logout = () => {
  signOut(auth);
  localStorage.removeItem("user");
  localStorage.removeItem("addToCart");
  window.location.reload("/");
};
export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getUserData,
  getBookData,
  addBookToUser,
  getActivityData
};