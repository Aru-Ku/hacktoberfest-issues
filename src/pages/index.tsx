import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import type { IContributor, IOptions } from '../types';

import { useState } from 'react';
import { useData } from '../hooks/useData';
import { Card } from '../components/Card/Card';
import { CardGrid } from '../components/Card/CardGrid';
import { Header } from '../components/Header/Header';
import { FilterForm } from '../components/Forms/FilterForm';
import { Contributors, IContributorsProps } from '../components/Contributors/Contributors';

const INITIAL_DATA_OPTIONS: IOptions = {
  isIssueOpen: true,
  goodFirstIssue: false,
  sort: 'created',
  order: 'desc',
  per_page: 20,
}



const Home: NextPage<{} & IContributorsProps> = (props) => {
  const { contributors } = props;

  const [options, setOptions] = useState(INITIAL_DATA_OPTIONS)
  const { issueList, pageInfo, error, isLoading, languages } = useData({ ...options });

  const loadMore = useCallback(() => {
    if (!pageInfo.hasNextPage) return;

    setOptions((prev) => {
      return {
        ...prev,
        nextPageCursor: pageInfo.endCursor
      }
    })
  }, [pageInfo])

  useEffect(() => {
    // Get next items if there are very few initial issues.
    if (issueList.length <= 10) {
      loadMore();
    }
  }, [issueList, loadMore])

  return (
    <main className="container mx-auto grid grid-cols-[0.8fr_1.2fr] gap-4">
      <aside>
        <div className='sticky top-0'>
          <Header />
          <FilterForm languages={languages} />
          <Contributors contributors={contributors} />
        </div>
      </aside>
      <section>
        {<CardGrid loadMore={loadMore} dataLength={issueList.length} isLoading={isLoading}>
          {issueList.map((issue, index) => {
            // Temporarily mitigate duplicate issues key error
            return <Card key={issue.url + index} data={issue} />;
          })}
        </CardGrid>}
      </section>
    </main>
  )
}

const CONTRIBUTORS_URL = 'https://api.github.com/repos/Aru-Ku/hacktoberfest-issues/contributors';
export const getStaticProps: GetStaticProps = async (_context) => {
  const contributors = await fetch(CONTRIBUTORS_URL).then(r => r.json())
  return {
    props: {
      contributors
    },
  }
}

export default Home
