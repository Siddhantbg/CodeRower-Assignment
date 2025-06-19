import { NavLink } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const Navigation = () => {
  // Active link style
  const activeStyle = 'bg-white bg-opacity-20 font-bold';
  
  return (
    <nav className="mt-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink 
            to={ROUTES.HOME} 
            className={({ isActive }) => 
              `px-4 py-2 text-white rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10 ${isActive ? activeStyle : ''}`
            }
            end
          >
            Fetch Config
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={ROUTES.UPDATE} 
            className={({ isActive }) => 
              `px-4 py-2 text-white rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-10 ${isActive ? activeStyle : ''}`
            }
          >
            Update Remark
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;