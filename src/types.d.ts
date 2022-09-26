interface PageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string
  endCursor?: string;
}

interface Author {
  url: string;
  avatarUrl: string;
  login: string;
}

interface Label {
  name: string;
  color: string;
  id: string;
}
interface Language {
  name: string;
  color: string;
  id: string;
}

type Node<T> = {
  nodes?: T[];
}

interface Repository {
  name: string;
  url: string;
  description: string;
  languages: Node<Language>
}

export const SORT = ["comments", "reactions", "reactions-+1", "reactions--1", "reactions-smile", "reactions-thinking_face", "reactions-heart", "reactions-tada", "interactions", "created", "updated"] as const;
export type SortValues = typeof SORT[number];

export interface IOptions {
  isIssueOpen?: boolean;
  sort?: SortValues;
  order?: "desc" | "asc";
  per_page?: number;
  goodFirstIssue?: boolean;
  pageInfo?: PageInfo;
  nextPageCursor?: string;
  language?: string
}

export interface Issue {
  __typename: 'Issue' | 'PullRequest'
  url: string;
  title: string;
  body: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  author: Author;
  labels: Node<Label>;
  repository: Repository
}

export type HactoberfestIssuesQueryResponse = {
  search: {
    issueCount: number;
    pageInfo: PageInfo;
    nodes: Issue[]
  }
}
