import { GithubUser } from "./github-user";

export interface GithubUserSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GithubUser[];
}