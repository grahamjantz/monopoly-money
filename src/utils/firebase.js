// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { query, onSnapshot } from 'firebase/firestore'
import { roomId } from "../features/InitializeApp/InitializeApp";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqVODhFQ8rzXL1oRtkt6zkRIbkWgzAKuY",
  authDomain: "monopoly-money-60c8d.firebaseapp.com",
  projectId: "monopoly-money-60c8d",
  storageBucket: "monopoly-money-60c8d.appspot.com",
  messagingSenderId: "999837547420",
  appId: "1:999837547420:web:2755eb616b32daa60e6659",
  measurementId: "G-ZDB1NJ0GWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export async function getRoom() {
  const roomCol = collection(db, 'projects')
  const roomSnapshot = await getDocs(roomCol)
  const roomList = roomSnapshot.docs.map(doc => doc.data())
  const room = roomList.map((room) => {
    if (room.roomId === roomId) {
      return room
    }
  })
  return room
}

export const streamGroceryListItems = (roomId, snapshot, error) => {
    const colRef = collection(db, 'projects', roomId)
    const itemsQuery = query(colRef)
    return onSnapshot(itemsQuery, snapshot, error);
};