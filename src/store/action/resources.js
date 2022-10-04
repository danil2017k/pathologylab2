import axios from 'axios'
import { errorHandler } from '../../utils'

export const loadSpecializations = ({ commit, state }) => {
  if (state.specializations.length > 0) {
    return
  }

  return axios.get('/api/specializations')
  .then(({ data }) => {
    commit('LOAD_SPECIALIZATIONS', data.specializations)
  })
  .catch(errorHandler)
}

export const loadStains = ({ commit, state }, unauthorized = false) => {
  if (state.stains.length > 0) {
    return
  }

  let endpoint = '/api/stains'
  if (unauthorized) endpoint += '/all'
  return axios.get(endpoint)
  .then(({ data }) => {
    commit('LOAD_STAINS', data)
  })
  .catch(errorHandler)
}

export const loadReactions = ({ commit, state }) => {
  if (state.reactions.length > 0) {
    return
  }

  return axios.get('/api/cases/reactions')
  .then(({ data }) => {
    commit('LOAD_REACTIONS', data)
  })
  .catch(errorHandler)
}

export const loadAvailStains = ({ commit, state }) => {
  if (state.availStains.length > 0) {
    return
  }

  return axios.get('/api/cases/stains')
  .then(({ data }) => {
    commit('LOAD_AVAIL_STAINS', data.stains)
  })
  .catch(errorHandler)
}

export const loadCaseResources = ({ dispatch }, unauthorized = false) => {
  dispatch('loadStains', unauthorized)
  dispatch('loadReactions')
  dispatch('loadAvailStains')
}
