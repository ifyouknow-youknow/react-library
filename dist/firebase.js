"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firebase_CreateDocument = firebase_CreateDocument;
exports.firebase_DeleteDocument = firebase_DeleteDocument;
exports.firebase_GetAllDocuments = firebase_GetAllDocuments;
exports.firebase_GetDocument = firebase_GetDocument;
exports.firebase_UpdateDocument = firebase_UpdateDocument;
var _app = require("firebase/app");
var _firestore = require("firebase/firestore");
var _config = require("./config");
var _alerts = require("./FUNCTIONS/alerts");
// 

// Initialize Firebase
const app = (0, _app.initializeApp)(_config.firebaseConfig);
// 
const db = (0, _firestore.getFirestore)(app);
// 

// FIRESTORE ------------------------------------------------------------------------------------ START
async function firebase_CreateDocument(table, documentId, args, success) {
  await (0, _firestore.setDoc)((0, _firestore.doc)(db, table, documentId), args).then(() => {
    console.log('CREATED');
    success(true);
  }).catch(err => {
    console.log(err);
    (0, _alerts.alert_SomethingWentWrong)();
  });
}
async function firebase_UpdateDocument(table, documentId, args, success) {
  const thisRef = (0, _firestore.doc)(db, table, documentId);
  await (0, _firestore.updateDoc)(thisRef, args).then(() => {
    console.log('UPDATED');
    success(true);
    return;
  }).catch(err => {
    console.log(err);
    (0, _alerts.alert_SomethingWentWrong)();
    return;
  });
}
async function firebase_DeleteDocument(table, documentId, success) {
  await (0, _firestore.deleteDoc)((0, _firestore.doc)(db, table, documentId)).then(() => {
    console.log("DELETED");
    success(true);
  }).catch(err => {
    console.log(err);
    (0, _alerts.alert_SomethingWentWrong)();
  });
}
async function firebase_GetDocument(table, documentId, setter) {
  const docRef = (0, _firestore.doc)(db, table, documentId);
  const docSnap = await (0, _firestore.getDoc)(docRef).then(() => {
    if (docSnap.exists()) {
      const obj = {
        id: docSnap.id,
        ...docSnap.data()
      };
      setter(obj);
      console.log('GOT DOCUMENT');
    } else {
      console.log("NO DOCUMENT");
    }
  }).catch(err => {
    console.log(err);
    (0, _alerts.alert_SomethingWentWrong)();
  });
}
async function firebase_GetAllDocuments(table, setter) {
  const querySnapshot = await (0, _firestore.getDocs)((0, _firestore.collection)(db, table)).then(() => {
    const array = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const obj = {
        id: doc.id,
        ...doc.data()
      };
      array.push(obj);
    });
    console.log("GOT ALL DOCUMENTS");
    setter(array);
  }).catch(err => {
    console.log(err);
    (0, _alerts.alert_SomethingWentWrong)();
  });
}
// FIRESTORE ------------------------------------------------------------------------------------ END