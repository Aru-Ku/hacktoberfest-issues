import GitHubIcon from "../../icons/GitHubIcon";
import { IconLink } from "../Link/IconLink";
import ThemeSwitcher from "./ThemeSwitcher";

export const Header = () => {
  return (
    <div className="sticky top-0 bg-white z-50 py-2 dark:bg-gray-800 dark:text-gray-100">
      <div className="container mx-auto flex flex-col space-y-3 md:space-y-0 items-center md:flex-row justify-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl text-center md:text-left antialiased font-bold">
            Hacktoberfest Issues
          </h1>
          <div className="description text-center md:text-left">
            Find the latest open issues for hacktoberfest
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <IconLink
            href="https://github.com/Aru-Ku/hacktoberfest-issues.git"
            text="GitHub"
            Icon={() => <GitHubIcon />}
          />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
