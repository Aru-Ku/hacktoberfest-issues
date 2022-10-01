import type { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import type { IOptions } from '../types';

import { useState } from 'react';
import { useData } from '../hooks/useData';
import { Card } from '../components/Card/Card';
import { CardGrid } from '../components/Card/CardGrid';
import { Header } from '../components/Header/Header';
import { FilterForm } from '../components/Forms/FilterForm';

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

export default Home
