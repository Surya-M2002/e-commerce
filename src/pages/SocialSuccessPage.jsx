import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API_URL from '../config';

const SocialSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('pb_token', token);
      
      // Fetch user details using the token
      fetch(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem('pb_user', JSON.stringify(user));
        // Dispatch event to update state in App.jsx if needed, or just reload/navigate
        // Since App.jsx reads from localStorage on mount/update, we might need a way to trigger it.
        // App.jsx has: const [user, setUser] = useState(() => ... localStorage ...)
        // But it doesn't seem to listen to storage events for user, only for cart.
        // However, navigate('/') will mount Home, but App component might not re-render user state.
        // We can force a reload or use a custom event.
        window.location.href = '/'; 
      })
      .catch(err => {
        console.error('Failed to fetch user', err);
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SocialSuccessPage;
