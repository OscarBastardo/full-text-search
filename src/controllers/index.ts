import SearchController, { SearchObject } from './SearchController';

export const getSearchController = (store: SearchObject) => {
  return new SearchController(store);
};
