import api from '../../api'

export const loadLogs = async ({ commit }, { page, caseTitle, caseId, events, limit }) => {
  let logs = await api.getLogs(page, caseTitle, caseId, events, limit)
  commit('LOGS_RECEIVE', logs)
}

export const hideSearchControlInLogs = ({ commit }, flag) => {
  commit('LOGS_HIDE_SEARCH_CONTROL', flag)
}

export const searchCaseId = ({ commit }, id) => {
  commit('LOGS_SEARCH_CASE_ID', id)
}



// WEBPACK FOOTER //
// ./src/store/actions/logs.js