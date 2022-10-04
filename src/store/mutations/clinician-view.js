import {
  CLINICIAN_VIEW_CHANGE_FULLTEXT_SEARCH_FILTER,
  CLINICIAN_VIEW_CHANGE_CASES_SCOPE_FILTER,
  CLINICIAN_VIEW_RESET_PAGE,
  CLINICIAN_VIEW_CHANGE_CASES_LOADER,
  CLINICIAN_VIEW_CASES_RECEIVE,
  CLINICIAN_VIEW_CHANGE_PAGE
} from './available'

export default {
  [CLINICIAN_VIEW_CHANGE_FULLTEXT_SEARCH_FILTER] (state, fulltextSearchString) {
    state.clinicianView.filters.fulltextSearchString = fulltextSearchString
  },
  [CLINICIAN_VIEW_CHANGE_CASES_SCOPE_FILTER] (state, newScope) {
    state.clinicianView.filters.casesScope = newScope
  },
  [CLINICIAN_VIEW_RESET_PAGE] (state) {
    state.clinicianView.pagination.page = 1
  },
  [CLINICIAN_VIEW_CHANGE_CASES_LOADER] (state, value) {
    state.clinicianView.casesLoading = value
  },
  [CLINICIAN_VIEW_CASES_RECEIVE] (state, {cases, casesCount}) {
    state.clinicianView.cases = cases
    state.clinicianView.casesCount = casesCount
    state.clinicianView.pagination.pagesCount = 0
    console.log(state.clinicianView.pagination.rowsPerPage)
    if (state.clinicianView.pagination.rowsPerPage > 0) {
      state.clinicianView.pagination.pagesCount = Math.round(Math.ceil(casesCount / state.clinicianView.pagination.rowsPerPage))
    }
  },
  [CLINICIAN_VIEW_CHANGE_PAGE] (state, page) {
    state.clinicianView.pagination.page = page
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations/clinician-view.js