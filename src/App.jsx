import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BucketListProvider } from './context/BucketListContext'
import PrivateRoute from './components/Layout/PrivateRoute'
import Navbar from './components/Layout/Navbar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ExplorePage from './pages/ExplorePage'
import CountryDetailPage from './pages/CountryDetailPage'
import BucketListPage from './pages/BucketListPage'

function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BucketListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/country/:code" element={<CountryDetailPage />} />
              <Route path="/bucket-list" element={<BucketListPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </BucketListProvider>
    </AuthProvider>
  )
}
