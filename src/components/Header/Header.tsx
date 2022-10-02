import GitHubIcon from '../../icons/GitHubIcon';
import { IconLink } from '../Link/IconLink';

export const Header = () => {
  return (
    <div className="bg-white z-50 py-2">
      <div className="flex flex-col items-start">
        <h1 className="text-xl md:text-2xl py-2 antialiased font-bold">Hacktoberfest Issues</h1>
        <div className="description">Find the latest open issues for hacktoberfest</div>
        <IconLink href="https://github.com/Aru-Ku/hacktoberfest-issues" text="GitHub" Icon={() => <GitHubIcon />} />
      </div>
    </div>
  );
};
