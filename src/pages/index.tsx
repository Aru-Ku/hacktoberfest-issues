import type { GetStaticProps, NextPage } from 'next';
import { useCallback, useMemo } from 'react';
import type { IOptions } from '../types';

import { useState } from 'react';
import { Card } from '../components/Card/Card';
import { CardGrid } from '../components/Card/CardGrid';
import { Header } from '../components/Header/Header';
import { FilterForm, FilterItems } from '../components/Forms/FilterForm';
import { Contributors, IContributorsProps } from '../components/Contributors/Contributors';
import { useData } from '../hooks/useData';
import { FILTER_ISSUES } from '../lib/filter-issues';

const INITIAL_DATA_OPTIONS: IOptions = {
  sort: 'created',
  order: 'desc',
  per_page: 20,
};

const Home: NextPage<{} & IContributorsProps> = (props) => {
  const { contributors } = props;
  const [filters, setFilters] = useState<FilterItems>({
    goodFirstIssue: false,
    language: undefined,
  });

  const [options, setOptions] = useState(INITIAL_DATA_OPTIONS);
  const { issueList, pageInfo, isLoading, languages } = useData(options);

  const loadMore = useCallback(() => {
    if (!pageInfo.hasNextPage) return;

    setOptions((prev) => {
      return {
        ...prev,
        nextPageCursor: pageInfo.endCursor,
      };
    });
  }, [pageInfo]);

  const filteredIssues = useMemo(() => {
    const list = issueList.filter(FILTER_ISSUES(filters));
    if (list.length <= 10) {
      loadMore();
    }
    return list;
  }, [filters, issueList, loadMore]);

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <main className="container mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-4">
        <aside className="px-4">
          <div className="sticky top-0">
            <Header />
            <FilterForm languages={languages} values={filters} setValues={setFilters} />
            <Contributors contributors={contributors} />
          </div>
        </aside>
        <section className="overflow-x-hidden">
          {
            <CardGrid loadMore={loadMore} dataLength={issueList.length} isLoading={isLoading}>
              {filteredIssues.map((issue, index) => {
                // Temporarily mitigate duplicate issues key error
                return <Card key={issue.url + index} data={issue} />;
              })}
            </CardGrid>
          }
        </section>
      </main>
    </div>
  );
};

const CONTRIBUTORS_URL = 'https://api.github.com/repos/Aru-Ku/hacktoberfest-issues/contributors';
export const getStaticProps: GetStaticProps = async (_context) => {
  const contributors = await fetch(CONTRIBUTORS_URL).then((r) => r.json());
  return {
    props: {
      contributors,
    },
  };
};

export default Home;
