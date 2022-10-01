import { Issue } from "../../types"
import Image from 'next/image'
import { TimeStamp } from "./_timestamp";
import { Labels } from "./_label";
import { RenderMarkdown } from "./_markdown";

interface ICardProps {
  data: Issue;
}

export const Card = (props: ICardProps) => {
  const { data } = props;

  return (
    <div className="issue-card snap-start bg-white rounded-b border border-gray-400 hover:border-blue-600 hover:outline-8 hover:drop-shadow-lg outline-blue-600 drop-shadow-md p-2 flex flex-col">
      <div className="issue-title text-lg  ">
        <a href={data.url} className="font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600 hover:text-blue-600 hover:underline" target="_blank noopener noreferrer">
          {data.title}
        </a> #{data.number}
      </div>
      <div className="issue-meta-data flex items-center flex-wrap">
        <div className="issue-created-at text-sm">
          Opened <TimeStamp time={data.createdAt} /> by&nbsp;
        </div>
        <div className="issue-author flex items-center">
          <Image className="inline-block rounded-full ring-2 ring-white"
            height={20} width={20} src={data.author.avatarUrl} alt={data.author.login} />
          <a className="pl-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 font-semibold text-blue-600 hover:underline" href={data.author.url}>{data.author.login}</a>
        </div>
      </div>
      <Labels list={data.labels.nodes} />
      <div className="issue-body my-2 text-sm line-clamp-3">
        <RenderMarkdown markdownText={data.body} />
      </div>
      <div className="flex-grow" />
      <div className="repository">
        <a className="focus:outline-none focus:ring-1 focus:ring-blue-600 text-blue-600 hover:underline" href={data.repository.url}>
          {data.author.login}/{data.repository.name}
        </a>
        {data.repository.description && data.repository.description === '<div></div>'
          ? <div className="description line-clamp-1 text-sm ">No description</div>
          : <div style={{ minHeight: 20 }} className="description line-clamp-1 text-sm" dangerouslySetInnerHTML={{ __html: data.repository.description }} />
        }
        <div className="languages">
          <Labels count={8} list={data.repository.languages.nodes} />
        </div>
      </div>
    </div>
  )

}
