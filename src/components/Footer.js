import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;