import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Locations } from './pages/Locations';
import { Ministries } from './pages/Ministries';
import { Events } from './pages/Events';
import { Give } from './pages/Give';
import { Contact } from './pages/Contact';
import { Leadership } from './pages/Leadership';
import { Groups } from './pages/Groups';
import { School } from './pages/School';
import { PrayerTower } from './pages/PrayerTower';
import { Missions } from './pages/Missions';

import { GiveCNH } from './pages/GiveCNH';
import { GiveAdoptStudent } from './pages/GiveAdoptStudent';
import { Impulse } from './pages/Impulse';
import { Unicas } from './pages/Unicas';
import { DomingoService } from './pages/DomingoService';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/school" element={<School />} />
              <Route path="/torre" element={<PrayerTower />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/events" element={<Events />} />
              <Route path="/give" element={<Give />} />
              <Route path="/give/cnh" element={<GiveCNH />} />
              <Route path="/give/adopt-student" element={<GiveAdoptStudent />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/impulse" element={<Impulse />} />
              <Route path="/unicas" element={<Unicas />} />
              <Route path="/sunday-service" element={<DomingoService />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;