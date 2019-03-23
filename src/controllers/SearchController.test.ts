import SearchController, { SearchObject } from './SearchController';
import { Document } from '../search/BM25';

describe('SearchController', () => {
  it('should search and return the result objects with the desired attributes', () => {
    const storeMock: SearchObject = {
      search: () => [
        {
          id: 9,
          body: 'Example of search result number one',
          link: 'http://example.link.one',
          tokens: ['example', 'search', 'result', 'number', 'one'],
          termCount: 5,
          terms: {},
          score: 1.15,
        }, {
          id: 9,
          body: 'Example of search result number two',
          link: 'http://example.link.two',
          tokens: ['example', 'search', 'result', 'number', 'two'],
          termCount: 5,
          terms: {},
          score: 1.05,
        }, {
          id: 9,
          body: 'Example of search result number three',
          link: 'http://example.link.three',
          tokens: ['example', 'search', 'result', 'number', 'three'],
          termCount: 5,
          terms: {},
          score: 0.95,
        },
      ],
    };

    const searchController = new SearchController(storeMock);
    const results: Document[] = searchController.search('search term');
    expect(Array.isArray(results)).toEqual(true);
    const result = results[0];
    expect(Object.keys(result).sort()).toEqual(['body', 'id', 'link']);
  });
});
