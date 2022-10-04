import api from '../../api'
import {
  TEAM_MANAGER_CHANGE_CASE_CREATION_DATETIME_FILTER,
  TEAM_MANAGER_CHANGE_CASE_FULLTEXT_SEARCH_FILTER,
  TEAM_MANAGER_CHANGE_CASE_CLIENT_FILTER,
  TEAM_MANAGER_CHANGE_CASE_SPECIALIZATIONS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_STATUSES_FILTER,
  TEAM_MANAGER_CHANGE_ADDITIONAL_FILTER,
  TEAM_MANAGER_CHANGE_CASES_LOADER,
  TEAM_MANAGER_CHANGE_ACTION_PROGRESS,
  TEAM_MANAGER_CASES_RECEIVE,
  TEAM_MANAGER_CHANGE_CASE_SELECTION,
  TEAM_MANAGER_SELECT_ALL_CASES,
  TEAM_MANAGER_DESELECT_ALL_CASES,
  TEAM_MANAGER_CHANGE_CASE_OWNER_DOCTORS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_REPORT_DOCTORS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_FILTER,
  TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_ORDER,
  TEAM_MANAGER_CASE_RECEIVE,
  TEAM_MANAGER_RESET_PAGE,
  TEAM_MANAGER_CHANGE_PAGINATION
} from '../mutations/available'
import _ from 'lodash'

export const teamManagerChangePagination = ({commit, dispatch}, pagination) => {
  commit(TEAM_MANAGER_CHANGE_PAGINATION, pagination)
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCaseOrder = ({commit, dispatch}, order) => {
  commit(TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_ORDER, order)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCaseCreationDatetimeFilter = ({commit, dispatch}, dates) => {
  commit(TEAM_MANAGER_CHANGE_CASE_CREATION_DATETIME_FILTER, dates)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCasesFulltextSearchFilter = ({commit, dispatch}, fulltextSearchString) => {
  commit(TEAM_MANAGER_CHANGE_CASE_FULLTEXT_SEARCH_FILTER, fulltextSearchString)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCaseCollaboratorsFilter = ({commit, dispatch}, collaboratorIds) => {
  commit(TEAM_MANAGER_CHANGE_CASE_COLLABORATORS_FILTER, collaboratorIds)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCasesOwnerDoctorsFilter = ({commit, dispatch}, ownerDoctorIds) => {
  commit(TEAM_MANAGER_CHANGE_CASE_OWNER_DOCTORS_FILTER, ownerDoctorIds)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCasesReportDoctorsFilter = ({commit, dispatch}, reportDoctorIds) => {
  commit(TEAM_MANAGER_CHANGE_CASE_REPORT_DOCTORS_FILTER, reportDoctorIds)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeClientFilter = ({commit, dispatch}, clientId) => {
  commit(TEAM_MANAGER_CHANGE_CASE_CLIENT_FILTER, clientId)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCaseSpecializationsFilter = ({commit, dispatch}, specializationIds) => {
  commit(TEAM_MANAGER_CHANGE_CASE_SPECIALIZATIONS_FILTER, specializationIds)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCaseStatusesFilter = ({commit, dispatch}, statuses) => {
  commit(TEAM_MANAGER_CHANGE_CASE_STATUSES_FILTER, statuses)
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeAdditionalFilter = ({commit, dispatch}, {filterName, value}) => {
  commit(TEAM_MANAGER_CHANGE_ADDITIONAL_FILTER, {filterName: filterName, value: value})
  dispatch('teamManagerResetPage')
  dispatch('teamManagerLoadCases')
}

export const teamManagerChangeCaseOwnerDoctor = async ({commit, dispatch}, {caseId, previousOwnerDoctorId, newOwnerDoctorId}) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerChangeOwnerDoctor(caseId, previousOwnerDoctorId, newOwnerDoctorId)
    commit(TEAM_MANAGER_CASE_RECEIVE, result)
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerChangeCaseReportDoctor = async ({commit, dispatch}, {caseId, previousReportDoctorId, newReportDoctorId}) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerChangeReportDoctor(caseId, previousReportDoctorId, newReportDoctorId)
    commit(TEAM_MANAGER_CASE_RECEIVE, result)
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerAddCollaborator = async ({commit, dispatch}, {caseId, userId}) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerAddCollaborator(caseId, userId)
    commit(TEAM_MANAGER_CASE_RECEIVE, result)
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerRemoveCollaborator = async ({commit, dispatch}, {caseId, userId}) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerRemoveCollaborator(caseId, userId)
    commit(TEAM_MANAGER_CASE_RECEIVE, result)
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkAddCollaboratorToSelected = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  const selectedCaseIds = getSelectedCaseIds(state.teamManager.cases)

  try {
    let result = await api.teamManagerBulkAddCollaboratorToSelected(selectedCaseIds, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkRemoveCollaboratorFromSelected = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  const selectedCaseIds = getSelectedCaseIds(state.teamManager.cases)

  try {
    let result = await api.teamManagerBulkRemoveCollaboratorFromSelected(selectedCaseIds, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkChangeOwnerDoctorInSelected = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  const selectedCaseIds = getSelectedCaseIds(state.teamManager.cases)

  try {
    let result = await api.teamManagerBulkChangeOwnerDoctorInSelected(selectedCaseIds, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkChangeReportDoctorInSelected = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  const selectedCaseIds = getSelectedCaseIds(state.teamManager.cases)

  try {
    let result = await api.teamManagerBulkChangeReportDoctorInSelected(selectedCaseIds, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkAddCollaboratorToFiltered = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerBulkAddCollaboratorToFiltered(state.teamManager.filters, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkRemoveCollaboratorFromFiltered = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerBulkRemoveCollaboratorFromFiltered(state.teamManager.filters, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkChangeOwnerDoctorInFiltered = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerBulkChangeOwnerDoctorInFiltered(state.teamManager.filters, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerBulkChangeReportDoctorInFiltered = async ({commit, state, dispatch}, userId) => {
  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, true)

  try {
    let result = await api.teamManagerBulkChangeReportDoctorInFiltered(state.teamManager.filters, userId)
    dispatch('teamManagerLoadCases')
  } catch (e) {
    dispatch('sendGenericErrorNotification')
  }

  commit(TEAM_MANAGER_CHANGE_ACTION_PROGRESS, false)
}

export const teamManagerChangeCaseSelection = ({commit}, id) => {
  commit(TEAM_MANAGER_CHANGE_CASE_SELECTION, id)
}

export const teamManagerLoadCases = _.debounce(async ({commit, state, dispatch}) => {
  const {page, rowsPerPage} = state.teamManager.pagination
  commit(TEAM_MANAGER_CHANGE_CASES_LOADER, true)
  const currentLoadVersion = state.teamManager.casesLoadingVersion
  try {
    let result = await api.getTeamManagerCases((page - 1) * rowsPerPage, rowsPerPage, state.teamManager.filters, '', state.teamManager.order)
    if (currentLoadVersion !== state.teamManager.casesLoadingVersion) {
      return
    }
    commit(TEAM_MANAGER_CASES_RECEIVE, {
      cases: result.cases,
      casesCount: result.count
    })
  } catch (e) {
    dispatch('sendGenericErrorNotification', {
      messageLocalizationKey: 'notifications.teamManager.actionError'
    })
  }
  commit(TEAM_MANAGER_CHANGE_CASES_LOADER, false)
}, 500)

export const teamManagerResetPage = async ({commit}) => {
  commit(TEAM_MANAGER_RESET_PAGE)
}

export const teamManagerSelectAllCases = ({commit}) => {
  commit(TEAM_MANAGER_SELECT_ALL_CASES)
}

export const teamManagerDeselectAllCases = ({commit}) => {
  commit(TEAM_MANAGER_DESELECT_ALL_CASES)
}

function getSelectedCaseIds (cases) {
  let selectedCaseIds = []

  for (let c of cases) {
    if (!c.selected) {
      continue
    }

    selectedCaseIds.push(c.id)
  }

  return selectedCaseIds
}




// WEBPACK FOOTER //
// ./src/store/actions/team-manager.js