export default {
  LOGS_RECEIVE (state, payload) {
    state.logs = payload || {}
  },
  LOGS_HIDE_SEARCH_CONTROL (state, flag) {
    state.hideSearchControlInLogs = flag
  },
  LOGS_SEARCH_CASE_ID (state, id) {
    state.searchCaseId = id
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations/logs.js