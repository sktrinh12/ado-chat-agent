export interface UrlItem {
  id: number;
  title: string;
  url: string;
}

export interface ApiResponse {
  answer: string;
  context: string;
  urls: UrlItem[];
}
