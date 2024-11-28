import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { firebaseConfig } from "./config";
// 
import { alert_SomethingWentWrong } from './FUNCTIONS/alerts'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 
const db = getFirestore(app);
// 

// FIRESTORE ------------------------------------------------------------------------------------ START
export async function firebase_CreateDocument(table, documentId, args, success) {
    await setDoc(doc(db, table, documentId), args).then(() => {
        console.log('CREATED');
        success(true);
    }).catch((err) => {
        console.log(err);
        alert_SomethingWentWrong();
    })
}
export async function firebase_UpdateDocument(table, documentId, args, success) {
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
export async function firebase_DeleteDocument(table, documentId, success) {
    await deleteDoc(doc(db, table, documentId)).then(() => {
        console.log("DELETED");
        success(true);
    }).catch((err) => {
        console.log(err);
        alert_SomethingWentWrong();
    })
}
export async function firebase_GetDocument(table, documentId, setter) {
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
export async function firebase_GetAllDocuments(table, setter) {
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
