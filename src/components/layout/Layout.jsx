import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] relative overflow-x-hidden">
      <div className="parallax-atmosphere" aria-hidden="true">
        <div className="parallax-orb parallax-orb-1" />
        <div className="parallax-orb parallax-orb-2" />
        <div className="parallax-grid" />
      </div>
      <Header />
      <main className="flex-grow relative z-10 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;