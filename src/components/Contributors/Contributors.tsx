import type { IContributor } from "../../types"
import Image from 'next/future/image'

export interface IContributorsProps {
  contributors: IContributor[]
}

export const Contributors = (props: IContributorsProps) => {
  return (
    <div className="mt-8">
      <p>Made with 💖 and contributions from</p>
      <div className="flex flex-wrap gap-2 p-2">
        {props.contributors.map((contributor) => {
          return (
            <div key={contributor.id}>
              <a href={contributor.html_url} title={contributor.login} target="_blank noreferer noopener">
                <Image className="drop-shadow-xl rounded-full ring-1 focus:ring-2 focus:ring-blue-600 hover:ring-2 hover:ring-blue-600" placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAPAAAAKB0v///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                  height={40} width={40} src={contributor.avatar_url} alt={contributor.login} />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
