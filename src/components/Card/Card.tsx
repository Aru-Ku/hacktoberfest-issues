import { Issue } from '../../types';
import { TimeStamp } from './_timestamp';
import { Labels } from './_label';
import { RenderMarkdown } from './_markdown';

interface ICardProps {
  data: Issue;
}

export const Card = (props: ICardProps) => {
  const { data } = props;

  return (
    <div className="issue-card snap-start bg-white dark:bg-gray-900 rounded-b border border-gray-400 dark:border-gray-50 hover:border-blue-600 dark:hover:border-sky-600 hover:outline-8 hover:drop-shadow-lg outline-blue-600 dark:outline-sky-600 drop-shadow-md p-2 flex flex-col rounded overflow-x-hidden">
      <div className="issue-title text-lg flex items-center">
        <svg
          className="mr-2 text-green-600 w-5 h-5"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
          <path
            fillRule="evenodd"
            d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
            fill="currentColor"
          />
        </svg>
        <span>
          <a
            href={data.url}
            className="font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-100 hover:text-blue-600 dark:hover:text-sky-500 hover:underline"
            target="_blank noopener noreferrer"
          >
            {data.title}
          </a>{' '}
          #{data.number}
        </span>
      </div>
      <div className="issue-meta-data flex items-center flex-wrap">
        <div className="issue-created-at text-sm">
          Opened <TimeStamp time={data.createdAt} /> by&nbsp;
        </div>
        <div className="issue-author flex items-center">
          <img
            className="inline-block rounded-full ring-2 ring-white"
            height={20}
            width={20}
            src={data.author.avatarUrl}
            alt={data.author.login}
          />
          <a
            className="pl-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-500 font-semibold text-blue-600 dark:text-sky-500 hover:underline"
            href={data.author.url}
          >
            {data.author.login}
          </a>
        </div>
      </div>
      <Labels list={data.labels.nodes} />
      <div className="issue-body my-2 text-sm line-clamp-3">
        <RenderMarkdown markdownText={data.body} />
      </div>
      <hr className="my-2" />
      <div className="repository">
        <div className="repository-author flex items-center gap-2">
          <a href={data.repository.owner.url} className="flex">
            <img
              className={`inline-block ring-2 ring-white ${
                data.repository.isInOrganization ? 'rounded' : 'rounded-full'
              }`}
              height={20}
              width={20}
              src={data.repository.owner.avatarUrl}
              alt={data.repository.owner.login}
            />
          </a>
          <a
            className="focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-500 text-blue-600 dark:text-sky-500 hover:underline"
            href={data.repository.url}
          >
            {data.repository.owner.login}/{data.repository.name}
          </a>
        </div>
        {data.repository.description && data.repository.description === '<div></div>' ? (
          <div className="description line-clamp-1 text-sm ">No description</div>
        ) : (
          <div
            style={{ minHeight: 20 }}
            className="description line-clamp-1 text-sm"
            dangerouslySetInnerHTML={{ __html: data.repository.description }}
          />
        )}
        <div className="languages">
          <Labels count={8} list={data.repository.languages.nodes} />
        </div>
      </div>
    </div>
  );
};
