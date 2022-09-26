import GitHubIcon from "../../icons/GitHubIcon";
import { IconLink } from "../Link/IconLink";


export const Header = () => {
  return (
    <div className="sticky top-0 bg-white z-50 py-2">
      <div className="container mx-auto flex flex-col items-center md:flex-row justify-center md:justify-between">
        <h1 className="text-xl md:text-2xl py-2 text-center antialiased font-bold">
          Hacktoberfest Issues
        </h1>
        <IconLink href="https://github.com/Aru-Ku/hacktoberfest-issues.git" text="GitHub" Icon={() => <GitHubIcon />} />
      </div>
      <div className="description container mx-auto ">
        Find the latest open issues for hacktoberfest
      </div>
    </div>
  );
};
