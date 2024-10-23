import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts-y-pages/root-layout'; // Contiene login/register del chat
import Blog from './layouts-y-pages/blog-layout';
import BlogDetail from './layouts-y-pages/blog-detail';
 
import AboutPage from './layouts-y-pages/about-page';


import Icons from '@/helpers/icons'; 
import NavigationComponent from './components/navigation/navigation-container';
import { useState } from 'react';
import BlogLoginWithNavigation from './components/blog/blog-login';

const App = () => {
  const app = useFirebaseApp();
  const db = getFirestore(app);
  const auth = getAuth(app); // Nos permite ver si el usuario tiene una sesión activa o no
  const storage = getStorage(app);

  
  Icons();

  
    // Estado para controlar si el usuario está logueado o no
    const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  
    // Función para manejar el login exitoso
    const handleSuccessfulLogin = () => {
      setLoggedInStatus("LOGGED_IN");
    };
  
    // Función para manejar el logout
    const handleLogout = () => {
      setLoggedInStatus("NOT_LOGGED_IN");
    };
  
  return (
    <FirestoreProvider sdk={db}>
      <AuthProvider sdk={auth}>
        <StorageProvider sdk={storage}>
          <Router>
            {/* Barra de navegación global */}
            <NavigationComponent
              loggedInStatus={loggedInStatus} 
              handleSuccessfulLogout={handleLogout} 
              />

            {/* Rutas */}
            <Routes>
              {/* blog es la página principal */}
              <Route
                path="/"
                 element={<Blog loggedInStatus={loggedInStatus} />}
                />
              <Route
                path="/blog"
                 element={<Blog loggedInStatus={loggedInStatus} />}
                />
              <Route path="/b/:id" element={<BlogDetail />} />
              
              {/* Aquí apunta a blog-login.tsx */}
              <Route path="/auth"
               element={
                <BlogLoginWithNavigation handleSuccessfulLogin={handleSuccessfulLogin} />
               } /> {/* Página protegida del admin */}
              
              {/* Página para el chat (login/register) */}
              <Route path="/chat" element={<RootLayout />} />

              {/* Otras páginas */}
              <Route path="/about-me" element={<AboutPage />} />
              
              {/* Ruta para cuando no se encuentra la página */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Router>
        </StorageProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
};

export default App;