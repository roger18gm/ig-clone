import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import PageLayout from './Layouts/PageLayout/PageLayout.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // comment toggle
import { AuthProvider } from './contexts/AuthContext.jsx'; // comment toggle
import { UserProfileProvider } from './contexts/userProfileContext.jsx';


function App() {
  return (
        <AuthProvider>
          <UserProfileProvider>
            <PageLayout>
              <Routes>
                <Route 
                  path="/auth" 
                  element={
                    <AuthPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:username"
                  element={
                    // <ProtectedRoute>
                    <ProfilePage />
                    // </ProtectedRoute>
                  }
                  >
                </Route>
              </Routes>
            </PageLayout>
          </UserProfileProvider>
        </AuthProvider>
  );
}

export default App;



// kinda broken gpt app

// function App() { // comment toggle
//   const { session } = useAuth();
//   console.log("App.jsx Session:", session);

//   return (
//     <AuthProvider>   
//       <PageLayout>
//         <Routes>
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
//           <Route path="/:username" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
//         </Routes>
//       </PageLayout>
//     </AuthProvider>
//   );
// };

// export default App;





// basic app rogergpt

// function App() { // comment toggle
//   return (

//     <PageLayout>
//       <Routes>
//         <Route path='/' element={<HomePage />} />
//         <Route path='/auth' element={<AuthPage />} />
//         <Route path='/:username' element={<ProfilePage />} />
//       </Routes>
//     </PageLayout>
//   );
// };