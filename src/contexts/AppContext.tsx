import { createContext } from 'react';

interface InitContextProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}
const AppContext = createContext({} as InitContextProps);
export default AppContext;
