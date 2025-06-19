import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light">
      <header className="bg-gradient-main shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">CodeRower Assignment</h1>
          <Navigation />
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-gradient-dark text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} CodeRower Assignment - Sprint 2</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;