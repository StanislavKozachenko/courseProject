import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { createContext, useState } from 'react';
import AuthPage from './pages/AuthPage';
export const SearchContext = createContext();
export const SessionContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [sessionValue, setSessionValue] = useState('No user');

  return (
    <div className="wrapper">
      <SessionContext.Provider value={{ sessionValue, setSessionValue }}>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
