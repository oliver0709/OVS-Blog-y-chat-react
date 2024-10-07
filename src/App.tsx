import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import RootLayout from './layouts-y-pages/root-layout';

const App = () => {

  const app = useFirebaseApp();
  const db = getFirestore(app);
  const auth = getAuth(app); // Nos permite ver si el usuario tiene una sesion activa o no
  const storage = getStorage(app);

  return (
    <FirestoreProvider sdk={db}>
      <AuthProvider sdk={auth}>
        <StorageProvider sdk={storage}>
 
            <RootLayout/>
        </StorageProvider>
      </AuthProvider>

    </FirestoreProvider>
  )
}

export default App
