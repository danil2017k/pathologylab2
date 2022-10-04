import {
  COMMON_CHANGE_CASE_STATS_BY_USER_LOADING,
  COMMON_CHANGE_CASE_STATS_BY_USER,
  COMMON_RECEIVE_AVAILABLE_CLIENTS,
  COMMON_RECEIVE_AVAILABLE_SPECIALIZATIONS
} from './available'
import _ from 'lodash'

export default {
  LOADING (state) {
    state.loading = true
  },
  SAVED (state) {
    state.loading = false
  },
  LOAD_SPECIALIZATIONS (state, payload) {
    state.specializations = payload
  },
  LOAD_STAINS (state, payload) {
    state.stains = payload.stains
    state.frequent_stains = payload.frequent_stains
  },
  LOAD_AVAIL_STAINS (state, payload) {
    state.availStains = payload
  },
  LOAD_REACTIONS (state, payload) {
    state.reactions = payload.reactions
  },
  CHANGE_CONTENT_TYPE (state, payload) {
    state.contentType = payload
  },
  TOGGLE_NAVBAR (state) {
    state.navbarExpanded = !state.navbarExpanded
  },
  TOGGLE_CASES_LIST_STYLE (state) {
    state.casesListStyle = state.casesListStyle === 'list' ? 'tiles' : 'list'
  },
  HIDE_NAVBAR (state) {
    state.navbarExpanded = false
  },
  ADD_NOTIFICATION (state, payload) {
    state.notifications.push(payload)
  },
  SET_HOTIFICATION_HISTORY (state, result) {
    state.notification_history = result.notifications
    state.total_notification = result.total
  },
  DELETE_NOTIFICATION (state, payload) {
    const index = state.notifications.findIndex((m) => m.id === payload)
    state.notifications.splice(index, 1)
  },
  SHIFT_NOTIFICATION (state) {
    state.notifications.shift()
  },
  SET_SUGGESTIONS (state, payload) {
    state.usersSuggestions = payload
  },
  SET_ALL_COLLABORATORS (state, payload) {
    state.allCollaborators = payload
  },
  RESIZE (state, { isMobile, isMobileOrTablet, width }) {
    state.isMobile = isMobile
    state.isMobileOrTablet = isMobileOrTablet
    state.width = width
  },
  [COMMON_CHANGE_CASE_STATS_BY_USER_LOADING] (state, value) {
    state.caseStatsByUserLoading = value
  },
  [COMMON_CHANGE_CASE_STATS_BY_USER] (state, value) {
    state.caseStatsByUser = value
    state.caseStatsByUserMap = _.keyBy(state.caseStatsByUser, 'id')
  },
  [COMMON_RECEIVE_AVAILABLE_CLIENTS] (state, value) {
    state.availableClients = value
    state.availableClientsById = _.keyBy(state.availableClients, 'id')
  },
  [COMMON_RECEIVE_AVAILABLE_SPECIALIZATIONS] (state, value) {
    state.availableSpecializations = value
    state.availableSpecializationsById = _.keyBy(state.availableSpecializations, 'id')
  }
}



// WEBPACK FOOTER //
// ./src/store/mutations/common.js