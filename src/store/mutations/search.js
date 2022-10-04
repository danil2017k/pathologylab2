import {
  SEARCH_CHANGE_KEYWORD,
  SEARCH_RESET_PAGE,
  SEARCH_CHANGE_LOADER,
  SEARCH_RECEIVE_RESULTS,
  SEARCH_CLEAR,
  SEARCH_CHANGE_MODAL_VISIBLE,
  SEARCH_CHANGE_PAGE,
  SEARCH_CHANGE_FROM_DATE,
  SEARCH_CHANGE_TO_DATE,
  SEARCH_CHANGE_WHERE,
  SEARCH_RESET_ITEMS,
  SEARCH_SET_ERROR
} from './available'

export default {
  [SEARCH_RESET_PAGE] (state) {
    state.search.pagination.page = 1
  },
  [SEARCH_CHANGE_KEYWORD] (state, keyword) {
    state.search.keyword = keyword
  },
  [SEARCH_CHANGE_FROM_DATE] (state, fromDate) {
    state.search.filters.fromDate = fromDate
  },
  [SEARCH_CHANGE_TO_DATE] (state, toDate) {
    state.search.filters.toDate = toDate
  },
  [SEARCH_CHANGE_WHERE] (state, where) {
    state.search.filters = {
      ...state.search.filters,
      where: where
    }
  },
  [SEARCH_CHANGE_LOADER] (state, value) {
    state.search.loading = value
  },
  [SEARCH_RECEIVE_RESULTS] (state, {items, total}) {
    state.search.dataLoaded = true
    state.search.items = items
    state.search.totalItems = total
  },
  [SEARCH_RESET_ITEMS] (state) {
    state.search.items = []
    state.search.totalItems = 0
  },
  [SEARCH_CLEAR] (state) {
    state.search = {
      error: false,
      dataLoaded: false,
      loading: false,
      pagination: {
        rowsPerPage: 20,
        page: 1
      },
      items: [],
      totalItems: 0,
      keyword: null,
      filters: {
        fromDate: null,
        toDate: null,
        where: ['cases']
      }
    }
  },
  [SEARCH_CHANGE_MODAL_VISIBLE] (state, value) {
    state.searchModalVisible = value
  },
  [SEARCH_CHANGE_PAGE] (state, value) {
    state.search.pagination.page = value
  },
  [SEARCH_SET_ERROR] (state, value) {
    state.search.error = value
  }

}



// WEBPACK FOOTER //
// ./src/store/mutations/search.js