import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
// 
import { alert_SomethingWentWrong } from './FUNCTIONS/alerts'

// 

// FIRESTORE ------------------------------------------------------------------------------------ START
export async function firebase_CreateDocument(db, table, documentId, args, success) {
    await setDoc(doc(db, table, documentId), args).then(() => {
        console.log('CREATED');
        success(true);
    }).catch((err) => {
        console.log(err);
        alert_SomethingWentWrong();
    })
}
export async function firebase_UpdateDocument(db, table, documentId, args, success) {
    const thisRef = doc(db, table, documentId);
    await updateDoc(thisRef, args).then(() => {
        console.log('UPDATED');
        success(true);
        return;
    }).catch((err) => {
        console.log(err);
        alert_SomethingWentWrong();
        return;
    })
}
export async function firebase_DeleteDocument(db, table, documentId, success) {
    await deleteDoc(doc(db, table, documentId)).then(() => {
        console.log("DELETED");
        success(true);
    }).catch((err) => {
        console.log(err);
        alert_SomethingWentWrong();
    })
}
export async function firebase_GetDocument(db, table, documentId, setter) {
    const docRef = doc(db, table, documentId);
    const docSnap = await getDoc(docRef).then(() => {
        if (docSnap.exists()) {
            const obj = {
                id: docSnap.id,
                ...docSnap.data()
            }
            setter(obj);
            console.log('GOT DOCUMENT')
        } else {
            console.log("NO DOCUMENT");
        }
    }).catch((err) => {
        console.log(err);
        alert_SomethingWentWrong();
    })
}
export async function firebase_GetAllDocuments(db, table, setter) {
    const querySnapshot = await getDocs(collection(db, table)).then(() => {
        const array = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const obj = {
                id: doc.id,
                ...doc.data()
            }
            array.push(obj)
        });
        console.log("GOT ALL DOCUMENTS")
        setter(array)
    })
        .catch((err) => {
            console.log(err)
            alert_SomethingWentWrong();
        })

}
// FIRESTORE ------------------------------------------------------------------------------------ END

// AUTH ------------------------------------------------------------------------------------ START

export async function auth_CheckUser(auth, user) {
    onAuthStateChanged(auth, (thisUser) => {
        if (thisUser) {
            user(thisUser)
        } else {
            user(null)
        }
    });
}
export async function auth_CreateUser(auth, email, password, user) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const thisUser = userCredential.user;
            user(thisUser)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode)
            user(null)
            // ..
        });
}
export async function auth_SignIn(auth, email, password, user) {
    try {
        const thisUser = await signInWithEmailAndPassword(auth, email, password);
        user(thisUser);
    } catch (error) {
        console.error("Error signing in:", error.message); // Logs the error message for debugging
        user(null)

    }
}


// AUTH ------------------------------------------------------------------------------------ END
