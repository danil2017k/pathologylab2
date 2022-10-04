import api from '../../api'

import _ from 'lodash'
import {
  CLINICIAN_VIEW_CHANGE_FULLTEXT_SEARCH_FILTER,
  CLINICIAN_VIEW_CHANGE_CASES_SCOPE_FILTER,
  CLINICIAN_VIEW_RESET_PAGE,
  CLINICIAN_VIEW_CASES_RECEIVE,
  CLINICIAN_VIEW_CHANGE_CASES_LOADER,
  CLINICIAN_VIEW_CHANGE_PAGE
} from '../mutations/available'

export const clinicianViewChangeFulltextSearchFilter = ({commit, dispatch}, value) => {
  commit(CLINICIAN_VIEW_CHANGE_FULLTEXT_SEARCH_FILTER, value)
  dispatch('clinicianViewResetPage')
  dispatch('clinicianViewLoadCases')
}

export const clinicianViewChangeCasesScopeFilter = ({commit, dispatch}, value) => {
  commit(CLINICIAN_VIEW_CHANGE_CASES_SCOPE_FILTER, value)
  dispatch('clinicianViewResetPage')
  dispatch('clinicianViewLoadCases')
}

export const clinicianViewLoadCases = _.debounce(async ({commit, state, dispatch}) => {
  const {page, rowsPerPage} = state.clinicianView.pagination
  commit(CLINICIAN_VIEW_CHANGE_CASES_LOADER, true)

  try {
    let result = await api.getCliniciansCases((page - 1) * rowsPerPage, rowsPerPage, state.clinicianView.filters)
    commit(CLINICIAN_VIEW_CASES_RECEIVE, {
      cases: result.cases,
      casesCount: result.count
    })
  } catch (e) {
    dispatch('sendGenericErrorNotification', {
      messageLocalizationKey: 'notifications.clinicianView.actionError'
    })
  }
  commit(CLINICIAN_VIEW_CHANGE_CASES_LOADER, false)
}, 500)

export const clinicianViewChangePage = async ({commit, dispatch}, page) => {
  commit(CLINICIAN_VIEW_CHANGE_PAGE, page)
  dispatch('clinicianViewLoadCases')
}

export const clinicianViewResetPage = async ({commit}) => {
  commit(CLINICIAN_VIEW_RESET_PAGE)
}



// WEBPACK FOOTER //
// ./src/store/actions/clinician-view.js