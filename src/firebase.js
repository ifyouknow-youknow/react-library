import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
// 
import { alert_SomethingWentWrong } from './FUNCTIONS/alerts'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from "firebase/storage";


// 

// FIRESTORE ------------------------------------------------------------------------------------ START
export async function firebase_CreateDocument(db, table, documentId, args, success) {
    try {
        await setDoc(doc(db, table, documentId), args);
        console.log('CREATED');
        success(true);
    } catch (err) {
        console.error(err);
        alert_SomethingWentWrong();
    }
}
export async function firebase_UpdateDocument(db, table, documentId, args, success) {
    try {
        const thisRef = doc(db, table, documentId);
        await updateDoc(thisRef, args);
        console.log('UPDATED');
        success(true);
    } catch (err) {
        console.error(err);
        alert_SomethingWentWrong();
    }
}
export async function firebase_DeleteDocument(db, table, documentId, success) {
    try {
        await deleteDoc(doc(db, table, documentId));
        console.log('DELETED');
        success(true);
    } catch (err) {
        console.error(err);
        alert_SomethingWentWrong();
    }
}
export async function firebase_GetDocument(db, table, documentId, setter) {
    try {
        const docRef = doc(db, table, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const obj = {
                id: docSnap.id,
                ...docSnap.data(),
            };
            setter(obj);
            console.log('GOT DOCUMENT');
        } else {
            setter(null)
            console.log("NO DOCUMENT");
        }
    } catch (err) {
        console.error(err);
        alert_SomethingWentWrong();
    }
}
export async function firebase_GetAllDocuments(db, table, setter) {
    try {
        const querySnapshot = await getDocs(collection(db, table));
        const array = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const obj = {
                id: doc.id,
                ...doc.data(),
            };
            array.push(obj);
        });
        console.log("GOT ALL DOCUMENTS");
        setter(array);
    } catch (err) {
        console.log(err);
        alert_SomethingWentWrong();
    }
}
export async function firebase_GetAllDocumentsQueried(db, table, queries, setter) {
    try {
        // Start with the collection reference
        let q = collection(db, table);

        // Dynamically apply 'where' clauses from queries
        queries.forEach((queryObj) => {
            const { field, operator, value } = queryObj;
            if (field && operator && value !== undefined) {
                q = query(q, where(field, operator, value));
            }
        });

        // Fetch the documents
        const querySnapshot = await getDocs(q);

        // Store or process the data
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });

        // Call the setter with the fetched documents
        setter(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}
export function firebase_GetAllDocumentsQueriedListener(db, table, queries, setter) {
    try {
        // Start with the collection reference
        let q = collection(db, table);

        // Dynamically apply 'where' clauses from queries
        queries.forEach((queryObj) => {
            const { field, operator, value } = queryObj;
            if (field && operator && value !== undefined) {
                q = query(q, where(field, operator, value));
            }
        });

        // Listen to real-time changes
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });

            // Call the setter with the fetched documents
            setter(documents);
        });

        // Return the unsubscribe function to stop listening when necessary
        return unsubscribe;
    } catch (error) {
        console.error("Error listening to documents:", error);
    }
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
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const thisUser = userCredential.user;
        user(thisUser); // Call the callback with the created user
        console.log("User created successfully:", thisUser);
    } catch (error) {
        console.error("Error creating user:", error.code, error.message);
        alert(error.code); // Show the error code to the user
        user(null); // Call the callback with null to indicate failure
    }
}
export async function auth_SignIn(auth, email, password, user) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const thisUser = userCredential.user;
        user(thisUser); // Call the callback with the signed-in user
        console.log("User signed in successfully:", thisUser);
    } catch (error) {
        console.error("Error signing in:", error.code, error.message);
        alert(error.code); // Show the error code to the user
        user(null); // Call the callback with null to indicate failure
    }
}
export async function auth_SignOut(auth, success) {
    signOut(auth).then(() => {
        // Sign-out successful.
        success(true)
    }).catch((error) => {
        // An error happened.
        success(false)
    });
}


// AUTH ------------------------------------------------------------------------------------ END

// STORAGE ------------------------------------------------------------------------------------ START

export async function storage_UploadMedia(storage, media, mediaPath, success) {
    try {
        console.log("Starting upload...");

        // Check if media is a valid File object
        if (!(media instanceof File)) {
            throw new Error("The provided media is not a valid file.");
        }

        // Log the media type (to help debug and understand what file type is being uploaded)
        console.log("Selected media type:", media.type);

        const mediaBlob = media;  // Directly use the File object as the Blob
        console.log("Media Blob created:", mediaBlob);

        // Create a storage reference based on the provided media path
        const storageRef = ref(storage, mediaPath);
        console.log("Storage reference created:", storageRef);

        // Upload the media to Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, mediaBlob);

        // Monitor the upload progress
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error("Error uploading media:", error);
                success(false);
            },
            async () => {
                console.log("Upload completed successfully");
                success(true);
            }
        );
    } catch (error) {
        console.error("Error uploading media: ", error);
        success(false);
    }
}
export async function storage_DownloadMedia(storage, mediaPath, setter) {
    try {
        const url = await getDownloadURL(ref(storage, mediaPath));
        setter(url);
    } catch (error) {
        console.error("Error downloading media:", error);
    }
}
export async function storage_DeleteMedia(storage, mediaPath, success) {
    const desertRef = ref(storage, mediaPath);
    // Delete the file
    deleteObject(desertRef)
        .then(() => {
            // File deleted successfully
            success(true);
        })
        .catch((error) => {
            // Uh-oh, an error occurred!
            alert(`ERROR: ${error.message}`);
        });
}


// AUTH ------------------------------------------------------------------------------------ END
