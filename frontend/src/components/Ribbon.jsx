// components/PrototypeRibbon.jsx
import { useState, useEffect } from 'react';

const Ribbon = () => {
  const [clickCount, setClickCount] = useState(0);
  const [domain, setDomain] = useState('');
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const currentDomain = window.location.hostname;
    setDomain(currentDomain);

    const isPreview = currentDomain.includes('bbwssumatera8.id') || currentDomain.includes('localhost');
    setShow(isPreview);
  }, []);

  if (!show) return null;

  return (
    <>
      <div
        className='mx-auto'
        style={{
          position: 'fixed',
          top: 50,
          right: -70,
          backgroundColor: '#2196F3',
          color: 'white',
          padding: '8px 40px',
          fontWeight: 'bold',
          fontSize: '14px',
          zIndex: 9999,
          transform: 'rotate(45deg)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
          textAlign: 'center',
          width: '300px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: 0.8,
        }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.8}
      >
        <span className="me-3">🚧</span><span className="tracking-widest">PREVIEW</span> <span className="ms-3">🚧</span>
      </div>
      
    </>
  );
};

export default Ribbon;