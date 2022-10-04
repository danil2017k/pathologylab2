import {
  TEAM_MANAGER_CHANGE_CASE_CREATION_DATETIME_FILTER,
  TEAM_MANAGER_CHANGE_CASE_FULLTEXT_SEARCH_FILTER,
  TEAM_MANAGER_CHANGE_CASE_OWNER_DOCTORS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_ORDER,
  TEAM_MANAGER_CHANGE_CASE_REPORT_DOCTORS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_CLIENT_FILTER,
  TEAM_MANAGER_CHANGE_CASE_SPECIALIZATIONS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_STATUSES_FILTER,
  TEAM_MANAGER_CHANGE_ACTION_PROGRESS,
  TEAM_MANAGER_CHANGE_CASES_LOADER,
  TEAM_MANAGER_CASES_RECEIVE,
  TEAM_MANAGER_CASE_RECEIVE,
  TEAM_MANAGER_CHANGE_CASE_SELECTION,
  TEAM_MANAGER_SELECT_ALL_CASES,
  TEAM_MANAGER_DESELECT_ALL_CASES,
  TEAM_MANAGER_CHANGE_ADDITIONAL_FILTER,
  TEAM_MANAGER_RESET_PAGE,
  TEAM_MANAGER_CHANGE_PAGINATION
} from './available'

import _ from 'lodash'
import Vue from 'vue'

export default {
  [TEAM_MANAGER_CHANGE_PAGINATION] (state, pagination) {
    state.teamManager.pagination.rowsPerPage = pagination.rowsPerPage
    state.teamManager.pagination.page = pagination.page
  },
  [TEAM_MANAGER_CHANGE_CASE_CREATION_DATETIME_FILTER] (state, {createdFrom, createdTo}) {
    state.teamManager.filters.createdFrom = createdFrom
    state.teamManager.filters.createdTo = createdTo
  },
  [TEAM_MANAGER_CHANGE_CASE_FULLTEXT_SEARCH_FILTER] (state, fulltextSearchString) {
    state.teamManager.filters.fulltextSearchString = fulltextSearchString
  },
  [TEAM_MANAGER_CHANGE_CASE_OWNER_DOCTORS_FILTER] (state, ownerDoctorIds) {
    state.teamManager.filters.ownerDoctorIds = ownerDoctorIds
  },
  [TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_FILTER] (state, collaboratorIds) {
    state.teamManager.filters.collaboratorIds = collaboratorIds
  },
  [TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_ORDER] (state, order) {
    if (order) {
      state.teamManager.order = order
    }
  },
  [TEAM_MANAGER_CHANGE_CASE_REPORT_DOCTORS_FILTER] (state, reportDoctorIds) {
    state.teamManager.filters.reportDoctorIds = reportDoctorIds
  },
  [TEAM_MANAGER_CHANGE_CASE_CLIENT_FILTER] (state, clientId) {
    state.teamManager.filters.clientId = clientId
  },
  [TEAM_MANAGER_CHANGE_CASE_SPECIALIZATIONS_FILTER] (state, specializationIds) {
    state.teamManager.filters.specializationIds = specializationIds
  },
  [TEAM_MANAGER_CHANGE_CASE_STATUSES_FILTER] (state, statuses) {
    state.teamManager.filters.statuses = statuses
  },
  [TEAM_MANAGER_CHANGE_ADDITIONAL_FILTER] (state, {filterName, value}) {
    state.teamManager.filters.lessThan24Hours = false
    state.teamManager.filters.overdued = false
    state.teamManager.filters.onHold = false

    if (filterName) {
      state.teamManager.filters[filterName] = value
    }
  },
  [TEAM_MANAGER_CHANGE_CASES_LOADER] (state, value) {
    state.teamManager.casesLoading = value
    if (value) {
      state.teamManager.casesLoadingVersion++
    }
  },
  [TEAM_MANAGER_CHANGE_ACTION_PROGRESS] (state, value) {
    state.teamManager.actionInProgress = value
  },
  [TEAM_MANAGER_CASES_RECEIVE] (state, {cases, casesCount}) {
    let selectedByCases = {}
    for (let c of state.teamManager.cases) {
      selectedByCases[c.id] = c.selected
    }

    for (let c of cases) {
      c.selected = selectedByCases[c.id] || false
    }

    state.teamManager.cases = cases
    state.teamManager.casesCount = casesCount
  },
  [TEAM_MANAGER_CASE_RECEIVE] (state, c) {
    const index = _.findIndex(state.teamManager.cases, (cs) => { return cs.id === c.id })

    if (index < 0) {
      return
    }

    Vue.set(state.teamManager.cases, index, {...c, selected: state.teamManager.cases[index].selected})
  },
  [TEAM_MANAGER_CHANGE_CASE_SELECTION] (state, id) {
    state.teamManager.cases.forEach((c, index) => {
      if (c.id === id) {
        Vue.set(state.teamManager.cases, index, {...c, selected: !c.selected})
      }
    })
  },
  [TEAM_MANAGER_SELECT_ALL_CASES] (state) {
    state.teamManager.cases.forEach((c, index) => {
      Vue.set(state.teamManager.cases, index, {...c, selected: true})
    })
  },
  [TEAM_MANAGER_DESELECT_ALL_CASES] (state) {
    state.teamManager.cases.forEach((c, index) => {
      Vue.set(state.teamManager.cases, index, {...c, selected: false})
    })
  },
  [TEAM_MANAGER_RESET_PAGE] (state) {
    state.teamManager.pagination.page = 1
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations/team-manager.js