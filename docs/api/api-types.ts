export interface APIHeader {
  anchor: string;
  text: string;
}

export interface APIItem {
  text: string;
  link: string;
  headers: APIHeader[];
}

export interface APIGroup {
  text: string;
  items: APIItem[];
}
