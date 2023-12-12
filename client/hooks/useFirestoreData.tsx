import { createContext, useContext, useEffect, useState } from 'react'
import * as db from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { FireStoreData } from '../../interfaces'

export function useFirestoreData(
  document: string = 'users/' + getAuth().currentUser?.uid
) {
  const [state, setState] = useState<db.DocumentData | undefined>()
  const context = useContext(FireStoreDataContext)

  if (context == undefined) {
    throw 'FireStoreData Context is null or undefined'
  }

  useEffect(() => {
    console.log('Snapshot received')

    const doc = db.doc(db.getFirestore(), document)

    db.onSnapshot(
      doc,
      (snapshot) => {
        // On snapshot
        setState(snapshot.data())
        return
      },
      (error) => {
        // On error
        alert('Failed to get settings')
        console.error(error.message)
      }
    )
  }, [])

  return state
}

export const FireStoreDataContext = createContext<FireStoreData | null>(null)
