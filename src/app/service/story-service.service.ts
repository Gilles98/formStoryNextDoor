import { Injectable } from '@angular/core';
import Story from '../Datatypes/Classes/story';
import FirestoreUser from '../Datatypes/Classes/firestoreUser';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  Firestore,
  doc,
  addDoc, getDocs, query, where, getDoc, setDoc, updateDoc
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class StoryServiceService {

  constructor(private firestore: Firestore) {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }



  async createUserInFirestore(collectionName: string, name: string, email: string, permission: boolean): Promise<string> {
    const newUser: FirestoreUser = {
      hasGivenPermission: permission,
      name,
      email
    };
   return await addDoc<FirestoreUser>(
      this.getCollectionRef<FirestoreUser>(collectionName),
      newUser
    ).then(async (data) => data.id);
  }
  async createStoryInFirestore(collectionName: string, story: string, firestoreUid): Promise<void> {
    const newStory: Story = {
   story,
      uid:firestoreUid
    };
    await addDoc<Story>(
      this.getCollectionRef<Story>(collectionName),
      newStory
    );
  }

  private getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
}
