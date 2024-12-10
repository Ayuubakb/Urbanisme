import React from "react";

export default function Header() {
  return (
    <header style={{backgroundColor: '#f9f9f9', padding: '1rem 2rem', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>سجل التجارة المغربي</div>
        <nav style={{display: 'flex', gap: '1rem'}}>
          <a href="#" style={{textDecoration: 'none', color: '#333', fontSize: '1rem'}}>الرئيسية</a>
          <a href="#" style={{textDecoration: 'none', color: '#333', fontSize: '1rem'}}>الخدمات</a>
          <a href="#" style={{textDecoration: 'none', color: '#333', fontSize: '1rem'}}>اتصل بنا</a>
        </nav>
      </div>
    </header>
  );
}
