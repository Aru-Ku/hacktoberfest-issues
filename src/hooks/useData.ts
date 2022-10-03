import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import type { HactoberfestIssuesQueryResponse, IOptions, Issue, PageInfo } from '../types';

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN}`
  }
})

type Response = {
  data: HactoberfestIssuesQueryResponse
}

const filter_issues = (issue: Issue) => {
  if (!issue) return false;
  if (issue.__typename === 'PullRequest') return false;
  for (let _key in issue) return true;
  return false;
};

const gather_languages = (langs: string[], issue: Issue) => {
  if (!Array.isArray(issue.repository.languages.nodes)) {
    return [...langs];
  }
  const currentLangs = issue.repository.languages.nodes.map(({ name }) => name);
  return [...langs, ...currentLangs];
};

const initialIssues: Issue[] = [];

export const useData = (options: IOptions) => {
  const [issueList, setIssueList] = useState(initialIssues);
  const pageInfo = useRef<PageInfo>({});
  const languages = useRef<string[]>([]);
  const isLoading = useRef(true);
  const issueCount = useRef(0);

  useEffect(() => {

    (async () => {
      const {
        per_page = 20, nextPageCursor, sort = 'created', order = 'desc'
      } = options;

      const { data: response }: { data: Response } = await axiosInstance.post('/graphql', {
        query: `
          query {
            rateLimit { limit, cost, remaining, resetAt }
            search(
              first: ${per_page} type: ISSUE ${nextPageCursor ? `after: "${nextPageCursor}"` : ''}
              query: "hacktoberfest state:open is:issue sort:${sort}-${order}") {
                issueCount,
                pageInfo { hasNextPage, hasPreviousPage, startCursor, endCursor },
                nodes {
                  __typename
                  ... on Issue {
                    url, title, body, state, createdAt, number, updatedAt,
                    author { url, avatarUrl, login },
                    labels(first: 10) { nodes { name, color, id } },
                    repository {
                      name, url, isInOrganization,
                      description: descriptionHTML,
                      owner { url, avatarUrl, login },
                      languages(first:10) { nodes { name, color, id } }
                    }
                  }
                }
              }
            }`
      });

      const filteredIssues = response.data.search.nodes.filter(filter_issues);
      const languagesFromRepository = filteredIssues.reduce(gather_languages, []);

      setIssueList((prev) => ([...prev, ...filteredIssues]));
      pageInfo.current = { ...response.data.search.pageInfo };
      isLoading.current = false;
      issueCount.current = response.data.search.issueCount;
      languages.current = Array.from(new Set([...languages.current, ...languagesFromRepository]))
        .sort((prev, next) => prev.localeCompare(next));

    })();

  }, [options])

  return {
    isLoading: isLoading.current,
    languages: languages.current,
    issueList: issueList,
    issueCoung: issueCount.current,
    pageInfo: pageInfo.current,
  }

}
