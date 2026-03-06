import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Repository from './pages/Repository';
import Repositories from './pages/Repositories';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const queryClient = new QueryClient();

function RouteComponent() {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="repositories" element={<Repositories />} />
              <Route path="explore" element={<Explore />} />
              <Route path=":username" element={<Profile />} />
              <Route path=":username/:repo" element={<Repository />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        </Router>
      </>
    );
  }

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouteComponent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
