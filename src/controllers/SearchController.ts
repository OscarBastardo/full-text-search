import { Document } from 'src/search/BM25';

export interface SearchObject {
  search: (query: string) => Document[]
}

class SearchController {
  private store: SearchObject

  constructor(store: SearchObject) {
    this.store = store
  }

  public search(query: string): Document[] {
    const searchResults: any[] = this.store.search(query);
    const results = searchResults.map(({ id, body, link }) => ({ id, body, link }));
    return results;
  }
}

export default SearchController;
