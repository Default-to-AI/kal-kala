import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { LandingPage } from './components/LandingPage';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { EquityChapter } from './components/pages/EquityChapter';
import { ChangesInEquityChapter } from './components/pages/ChangesInEquityChapter';
import { LoansChapter } from './components/pages/LoansChapter';
import { BondsChapter } from './components/pages/BondsChapter';
import { SecuritiesChapter } from './components/pages/SecuritiesChapter';
import { EquityMethodChapter } from './components/pages/EquityMethodChapter';
import { CashFlowChapter } from './components/pages/CashFlowChapter';



function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-white">
        <SiteHeader />
        
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/equity" element={<EquityChapter />} />
            <Route path="/changes-in-equity" element={<ChangesInEquityChapter />} />
            <Route path="/loans" element={<LoansChapter />} />
            <Route path="/bonds" element={<BondsChapter />} />
            <Route path="/securities" element={<SecuritiesChapter />} />
            <Route path="/equity-method" element={<EquityMethodChapter />} />
            <Route path="/cash-flow" element={<CashFlowChapter />} />
          </Routes>
        </main>
        
        <SiteFooter />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
