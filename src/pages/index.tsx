import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import type { IOptions } from '../types';

import { useState } from 'react';
import { useData } from '../hooks/useData';
import { Card } from '../components/Card/Card';
import { CardGrid } from '../components/Card/CardGrid';
import { Header } from '../components/Header/Header';

const INITIAL_DATA_OPTIONS: IOptions = {
  isIssueOpen: true,
  goodFirstIssue: false,
  sort: 'created',
  order: 'desc',
  per_page: 20,
}

const Home: NextPage = () => {
  const [options, setOptions] = useState(INITIAL_DATA_OPTIONS)
  const { issueList, pageInfo, error, isLoading, languages } = useData({ ...options });


  const loadMore = () => {
    if (!pageInfo.hasNextPage) return;

    setOptions((prev) => {
      return {
        ...prev,
        nextPageCursor: pageInfo.endCursor
      }
    })
  }

  return (
    <main className="">
      <Header />
      {isLoading ? <div>{/* Loader animation */}</div> : <CardGrid loadMore={loadMore} dataLength={issueList.length}>
        {issueList.map(issue => {
          return <Card key={issue.url} data={issue} />;
        })}
      </CardGrid>}
    </main>
  )
}

export default Home
