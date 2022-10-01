import useSWR from "swr";
import type { HactoberfestIssuesQueryResponse, IOptions, Issue, PageInfo } from "../types";

import { request } from 'graphql-request'
import { useEffect, useRef, useState } from "react";

const fetcher = (query: string) => request('https://api.github.com/graphql', query, {}, {
  authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_AUTH_PAT_TOKEN}`
})

const filter_issues = (issue: Issue) => {
  if (!issue) return false;
  if (issue.__typename === 'PullRequest') return false;
  for (let _key in issue) return true;
  return false;
}

const gather_languages = (langs: string[], issue: Issue) => {
  if (!Array.isArray(issue.repository.languages.nodes)) {
    return [...langs];
  }
  const currentLangs = issue.repository.languages.nodes.map(({ name }) => name)
  return [...langs, ...currentLangs]
}

const initialIssues: Issue[] = []

export const useData = (options: IOptions, nextPageCursor?: string) => {
  const [issueList, setIssueList] = useState(initialIssues);
  const pageInfo = useRef<PageInfo>({})
  const languages = useRef(new Set<string>());
  const [query, setQuery] = useState('');
  const isLoading = useRef(true);


  const { data, error } = useSWR<HactoberfestIssuesQueryResponse>(query && `query {
    search(${query}) {
      issueCount,
      pageInfo{
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor
      },
        nodes {
          __typename
          ... on Issue {
            url,
            title,
            body,
            state,
            createdAt,
            number,
            updatedAt,
            author{
              url, avatarUrl, login
            },
            labels(first: 10) {
              nodes{
                name, color, id
              }
            },
            repository {
              name,
              url,
              description: descriptionHTML,
              languages(first:10){
                nodes{
                  name, color, id
                }
              }
            }
          }
      }
    }
  }`, fetcher);

  // Construct search query
  useEffect(() => {
    const {
      isIssueOpen, goodFirstIssue, sort, order, per_page, language, nextPageCursor
    } = options;

    const initial_query = `first: ${per_page}, type: ISSUE, ${nextPageCursor ? `after: "${nextPageCursor}", ` : ''}`
    const search_query = ` hacktoberfest `
      + `${goodFirstIssue ? 'label:good first issue ' : ''}`
      + `${language ? `language:${language} ` : ''}`
      + `${isIssueOpen ? 'state:open' : 'state:closed'} `
      + `sort:${sort}-${order}`;

    setQuery(() => `${initial_query}, query:"${search_query}"`)
  }, [options])

  useEffect(() => {
    if (data) {
      const filteredIssues = data.search.nodes.filter(filter_issues);
      const languagesFromRepository = filteredIssues.reduce(gather_languages, []);

      setIssueList((prev) => ([...prev, ...filteredIssues]));
      pageInfo.current = { ...data.search.pageInfo }
      isLoading.current = false;
      languages.current = new Set([...Array.from(languages.current), ...languagesFromRepository])
    }
  }, [data]);


  return {
    isLoading: isLoading.current,
    languages: Array.from(languages.current),
    issueList: issueList,
    issueCount: data?.search.issueCount || 0,
    pageInfo: pageInfo.current,
    error
  }
}
