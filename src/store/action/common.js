import * as casesActions from './cases'
import shortid from 'shortid'
import {COMMON_CHANGE_CASE_STATS_BY_USER,
  COMMON_CHANGE_CASE_STATS_BY_USER_LOADING,
  COMMON_RECEIVE_AVAILABLE_CLIENTS,
  COMMON_RECEIVE_AVAILABLE_SPECIALIZATIONS} from '../mutations/available'
import api from '../../api'

export const toggleNavbar = ({ commit }) => {
  commit('TOGGLE_NAVBAR')
}

export const hideNavbar = ({ commit }) => {
  commit('HIDE_NAVBAR')
}

export const deleteNotification = ({ commit }, payload) => {
  commit('DELETE_NOTIFICATION', payload)
}

export const loadCaseStatsByUser = async ({commit, state}) => {
  commit(COMMON_CHANGE_CASE_STATS_BY_USER_LOADING, true)

  try {
    const caseStatsByUser = await api.getCaseStatsByUser()
    commit(COMMON_CHANGE_CASE_STATS_BY_USER, caseStatsByUser)
  } catch (e) {
    console.log(e)
  }

  commit(COMMON_CHANGE_CASE_STATS_BY_USER_LOADING, false)
}

export const loadAvailableClients = async ({commit, state}) => {
  try {
    const availableClients = await api.getAvailableClients()
    commit(COMMON_RECEIVE_AVAILABLE_CLIENTS, availableClients)
  } catch (e) {
    console.log(e)
  }
}

export const loadAvailableSpecializations = async ({commit, state}) => {
  try {
    const specializations = await api.getAvailableSpecializations()
    commit(COMMON_RECEIVE_AVAILABLE_SPECIALIZATIONS, specializations)
  } catch (e) {
    console.log(e)
  }
}

export const sendGenericErrorNotification = ({dispatch}, {messageLocalizationKey, timeout = 10000}) => {
  dispatch('sendGenericNotification', {
    message: {
      type: 'generic-error',
      id: _.uniqueId('genericErrorMessage'),
      localizationKey: messageLocalizationKey
    },
    timeout
  })
}

export const sendGenericInfoNotification = ({dispatch}, {messageLocalizationKey, timeout = 10000}) => {
  dispatch('sendGenericNotification', {
    message: {
      type: 'generic-info',
      id: _.uniqueId('genericInfoMessage'),
      localizationKey: messageLocalizationKey
    },
    timeout
  })
}

export const sendGenericNotification = ({state, commit}, {message, timeout}) => {
  commit('ADD_NOTIFICATION', message)
  setTimeout(() => { if (state.notifications.find(elem => elem.id === message.id)) commit('SHIFT_NOTIFICATION') }, timeout)
}

export const proceedSocketMessage = ({ commit, state }, msg) => {
  msg = JSON.parse(msg)
  msg.id = msg.id || shortid.generate()
  let showNotif = true
  switch (msg.type) {
    case 'clean-reason-pros':
      if (state.account.id == msg.userId) {
        return
      }
      commit('CLEAN_DIAGNOSIS_REASON_PROS', {diagId: msg.diagId, isSocket: true})
      showNotif = false
      break
    case 'clean-reason-cons':
      if (state.account.id == msg.userId) {
        return
      }
      commit('CLEAN_DIAGNOSIS_REASON_CONS', {diagId: msg.diagId, isSocket: true})
      showNotif = false
      break
    case 'remove-reason-pros':
      if (state.account.id == msg.userId) {
        return
      }
      commit('REMOVE_DIAGNOSIS_REASON_PROS', {diagId: msg.diagId, isSocket: true})
      showNotif = false
      break
    case 'remove-reason-cons':
      if (state.account.id == msg.userId) {
        return
      }
      commit('REMOVE_DIAGNOSIS_REASON_CONS', {diagId: msg.diagId, isSocket: true})
      showNotif = false
      break
    case 'add-diagnosis':
      if (state.account.id == msg.userId || state.case.id !== msg.caseId) {
        return
      }
      commit('ADD_DIAGNOSIS', {diagId: msg.diagId, reasonProsId: msg.reasonProsId, reasonConsId: msg.reasonConsId, isSocket: true})
      showNotif = false
      break
    case 'remove-diagnosis':
      if (state.account.id == msg.userId) {
        return
      }
      commit('REMOVE_DIAGNOSIS', {diagId: msg.diagId, isSocket: true})
      showNotif = false
      break
    case 'set-accessory':
      if (state.account.id == msg.userId) {
        return
      }
      commit('SET_DIAGNOSIS_ACCESSORY', {diagId: msg.diagId, text: msg.text, isSocket: true})
      showNotif = false
      break
    case 'set-diagnos':
      if (state.account.id == msg.userId) {
        return
      }
      commit('SET_DIAGNOSIS_OPTION', {diagId: msg.diagId, item: msg.item, isSocket: true})
      showNotif = false
      break
    case 'add-reason':
      if (state.account.id == msg.userId) {
        return
      }
      if (msg.target == 'pros') {
        commit('ADD_DIAGNOSIS_REASON_PROS', {newReasonId: msg.reasonId, diagId: msg.diagId, text: msg.text, type: msg.reasonType, isSocket: true})
      }
      if (msg.target == 'cons') {
        commit('ADD_DIAGNOSIS_REASON_CONS', {newReasonId: msg.reasonId, diagId: msg.diagId, text: msg.text, type: msg.reasonType, isSocket: true})
      }
      showNotif = false
      break
    case 'change-reason-text':
      if (state.account.id == msg.userId) {
        return
      }
      commit('DIAGNOSIS_REASON_TEXT', {reasonId: msg.reasonId, text: msg.text, isSocket: true})
      showNotif = false
      break
    case 'change-reason-type':
      if (state.account.id == msg.userId) {
        return
      }
      commit('DIAGNOSIS_REASON_TYPE', {reasonId: msg.reasonId, type: msg.typeValue, isSocket: true})
      showNotif = false
      break
    case 'focus-element':
      if (state.account.id == msg.userId) {
        return
      }
      commit('DIAGNOSIS_REASON_STATE', {reasonId: msg.reasonId, disabled: true, isSocket: true})
      showNotif = false
      break
    case 'blur-element':
      if (state.account.id == msg.userId) {
        return
      }
      commit('DIAGNOSIS_REASON_STATE', {reasonId: msg.reasonId, disabled: false, isSocket: true})
      showNotif = false
      break
    case 'chat':
      if (state.case.id === msg.case.id) commit('ADD_COMMENT', msg)
      break
    case 'chat-edit':
      if (state.case.id === msg.case.id) commit('EDIT_COMMENT', msg)
      showNotif = false
      break
    case 'chat-delete':
      if (state.case.id === msg.case.id) commit('DELETE_COMMENT', msg.id)
      showNotif = false
      break
    case 'report':
      if (state.case.owner.id === state.account.id) commit('REPORT_ADD', msg)
      break
    case 'report-edit':
      if (state.case.owner.id === state.account.id) commit('REPORT_EDIT', msg)
      showNotif = false
      break
    case 'file':
      if (state.case.id === msg.case.id) commit('FINALIZE_UPLOAD', msg)
      if (state.case.owner.id === state.account.id) showNotif = false
      break
    case 'file-delete':
      showNotif = false
      commit('DELETE_FILE', msg.id)
      break
  }
  if (showNotif) commit('ADD_NOTIFICATION', msg)
  if (msg.case) commit('UPDATE_LAST_CHANGED', msg.case)
  setTimeout(() => { if (state.notifications.find(elem => elem.id === msg.id)) commit('SHIFT_NOTIFICATION') }, 10000)
}



// WEBPACK FOOTER //
// ./src/store/actions/common.js