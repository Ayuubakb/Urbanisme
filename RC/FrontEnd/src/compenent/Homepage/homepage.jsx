// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import Header from "./header";
import "./homepage.css";

function Homepage() {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    // Theme setup
    document.body.className = theme;

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      {threshold: 0.1}
    );

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [theme]);

  const handleStartNow = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/user/register';
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Header/>
      <button
        onClick={toggleTheme}
        className="rc-theme-toggle"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <main className="rc-hero" id="hero">
        <div className="rc-hero-content">
          <div className="rc-hero-text">
            <h1>احصل على سجل تجاري عبر الإنترنت</h1>
            <p>بسّط إجراءاتك الإدارية من خلال منصتنا الآمنة والسريعة</p>
            <div className="rc-hero-actions">
              <button
                className={`rc-btn rc-btn-primary ${isLoading ? 'loading' : ''}`}
                onClick={handleStartNow}
                disabled={isLoading}
              >
                {isLoading ? 'جاري التحميل...' : 'ابدأ الآن'}
              </button>
              <a
                href="#features"
                className="rc-btn rc-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features').scrollIntoView({behavior: 'smooth'});
                }}
              >
                معرفة المزيد
              </a>
            </div>
          </div>
          <div className="rc-hero-image fade-in">
            <div className="rc-placeholder-image"></div>
          </div>
        </div>
      </main>

      <section
        className={`rc-features ${visibleSections['features'] ? 'slide-in' : ''}`}
        id="features"
      >
        <h2>لماذا تختار منصة سجل التجارة المغربي؟</h2>
        <div className="rc-features-grid">
          {[
            {icon: '🌐', title: '100% عبر الإنترنت', desc: 'إجراءات مبسطة من جهاز الكمبيوتر الخاص بك'},
            {icon: '🔒', title: 'آمن', desc: 'بياناتك محمية وسرية'},
            {icon: '⏱️', title: 'سريع', desc: 'معالجة سريعة لطلبك'},
            {icon: '📄', title: 'شامل', desc: 'جميع المستندات اللازمة'}
          ].map((feature, index) => (
            <div
              key={index}
              className="rc-feature-item"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="rc-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`rc-process ${visibleSections['process'] ? 'slide-in' : ''}`}
        id="process"
      >
        <h2>خطوات الحصول على السجل التجاري</h2>
        <div className="rc-process-grid">
          {[
            {step: 1, title: "إنشاء حساب", desc: "أنشئ حسابك الشخصي بسهولة"},
            {step: 2, title: "إدخال المعلومات", desc: "أدخل تفاصيل نشاطك التجاري"},
            {step: 3, title: "رفع المستندات", desc: "قم بتحميل المستندات المطلوبة"},
            {step: 4, title: "المراجعة والتأكيد", desc: "استلم سجلك التجاري"}
          ].map((item) => (
            <div
              key={item.step}
              className="rc-process-item"
              style={{animationDelay: `${item.step * 0.2}s`}}
            >
              <div className="rc-process-step">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`rc-support ${visibleSections['support'] ? 'fade-in' : ''}`}
        id="support"
      >
        <div className="rc-support-content">
          <div className="rc-support-text">
            <h2>هل تحتاج إلى مساعدة؟</h2>
            <p>فريقنا متاح لمساعدتك في كل خطوة. يمكنك التواصل معنا عبر الهاتف أو البريد الإلكتروني.</p>
            <div className="rc-support-actions">
              <a href="tel:+212500000" className="rc-btn rc-btn-primary">اتصل بنا</a>
              <a href="mailto:support@rcmaroc.ma" className="rc-btn rc-btn-secondary">راسلنا</a>
            </div>
          </div>
          <div className="rc-support-image">
            <div className="rc-placeholder-image"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;
