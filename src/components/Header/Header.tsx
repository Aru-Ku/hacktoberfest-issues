import { useEffect, useState, useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import GitHubIcon from '../../icons/GitHubIcon';
import { IconLink } from '../Link/IconLink';

export const Header = () => {
  const context = useContext(AppContext);
  const [dark, setDark] = useState(context.darkMode);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dark = localStorage.getItem('dark') === 'true';
      setDark(dark);
      document.documentElement.classList.toggle('dark', dark);
      if (dark) {
        context?.setDarkMode(true);
      }
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 z-50 py-2">
      <div className="flex justify-end -mb-3">
        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            value={dark ? 'dark' : 'light'}
            id="default-toggle"
            className="sr-only peer"
            onChange={() => {
              setDark(!dark);
              if (typeof window !== 'undefined') {
                localStorage.setItem('dark', !dark ? 'true' : 'false');

                if (dark) {
                  document.documentElement.classList.remove('dark');
                  context?.setDarkMode(false);
                } else {
                  document.documentElement.classList.add('dark');
                  context?.setDarkMode(true);
                }
              }
            }}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="absolute -left-10 text-sm font-medium text-gray-900 dark:text-gray-300">Dark</span>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Light</span>
        </label>
      </div>

      <div className="flex flex-col items-start">
        <h1 className="text-xl md:text-2xl py-2 antialiased font-bold">Hacktoberfest Issues</h1>
        <div className="description">Find the latest open issues for hacktoberfest</div>
        <IconLink href="https://github.com/Aru-Ku/hacktoberfest-issues" text="GitHub" Icon={() => <GitHubIcon />} />
      </div>
    </div>
  );
};
