import { Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from '../SupabaseContext';

import Home from './Home';
import Statistics from './Statistics';
import HallOfFame from './HallOfFame';
import Blog from './Blog';
import NavigationBar from '../components/mobile/NavigationBar';

function Root() {

  const navigationLinks = [
    {
      text: "Home",
      link: "/",
      iconOutline: "home-outline",
      iconSolid: "home",
      ariaLabel: "Home"
    },
    {
      text: "Statistics",
      link: "/statistics",
      iconOutline: "stats-chart-outline",
      iconSolid: "stats-chart",
      ariaLabel: "Statistics"
    },
    {
      text: "Hall of Fame",
      link: "/halloffame",
      iconOutline: "trophy-outline",
      iconSolid: "trophy",
      ariaLabel: "Hall of Fame"
    },
    {
      text: "Blog",
      link: "/blog",
      iconOutline: "newspaper-outline",
      iconSolid: "newspaper",
      ariaLabel: "Blog"
    }
  ];

  return (
    <SupabaseProvider>
        <div className="mt-10 mb-28 font-display">
          <Routes>
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/halloffame" element={<HallOfFame />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/" element={<Home />} />
          </Routes>

          <NavigationBar data={navigationLinks} />
        </div>
        
        <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent backdrop-blur-sm h-[4%]"></div>
    </SupabaseProvider>
  );
}

export default Root;
