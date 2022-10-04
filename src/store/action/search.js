import {SEARCH_CHANGE_KEYWORD,
  SEARCH_RESET_PAGE,
  SEARCH_CHANGE_LOADER,
  SEARCH_RECEIVE_RESULTS,
  SEARCH_CLEAR,
  SEARCH_CHANGE_MODAL_VISIBLE,
  SEARCH_CHANGE_PAGE,
  SEARCH_CHANGE_FROM_DATE,
  SEARCH_CHANGE_TO_DATE,
  SEARCH_RESET_ITEMS,
  SEARCH_CHANGE_WHERE,
  SEARCH_SET_ERROR
  } from '../mutations/available'

import api from '../../api'
import moment from 'moment'
import _ from 'lodash'

export const searchChangeKeyword = ({commit, dispatch}, keyword) => {
  commit(SEARCH_CHANGE_KEYWORD, keyword)
  dispatch('searchResetPage')
  dispatch('searchSendQuery')
}

export const searchChangeFromDate = ({commit, dispatch}, fromDate) => {
  commit(SEARCH_CHANGE_FROM_DATE, fromDate)
  dispatch('searchResetPage')
  dispatch('searchSendQuery')
}

export const searchChangeToDate = ({commit, dispatch}, toDate) => {
  commit(SEARCH_CHANGE_TO_DATE, toDate)
  dispatch('searchResetPage')
  dispatch('searchSendQuery')
}

export const searchChangeWhere = ({state, commit, dispatch}, {type, value}) => {
  if (!value) {
    commit(SEARCH_CHANGE_WHERE, _.without(state.search.filters.where, type))
  } else {
    let newWhere = _.cloneDeep(state.search.filters.where)
    newWhere.push(type)
    commit(SEARCH_CHANGE_WHERE, newWhere)
  }

  dispatch('searchResetPage')
  dispatch('searchSendQuery')
}

export const searchResetPage = ({commit}) => {
  commit(SEARCH_RESET_PAGE)
}

export const searchClear = ({commit}) => {
  commit(SEARCH_CLEAR)
}

export const searchChangeModalVisible = ({commit}, value) => {
  commit(SEARCH_CHANGE_MODAL_VISIBLE, value)
}

export const searchChangePage = ({dispatch, commit}, page) => {
  commit(SEARCH_CHANGE_PAGE, page)
  dispatch('searchSendQuery')
}

export const searchSendQuery = async ({commit, state, dispatch}) => {
  const { page, rowsPerPage } = state.search.pagination

  commit(SEARCH_SET_ERROR, false)

  if (!state.search.keyword) {
    commit(SEARCH_RESET_ITEMS)
    dispatch('searchResetPage')
    return
  }

  commit(SEARCH_CHANGE_LOADER, true)

  try {
    let resultFilters = {
      where: state.search.filters.where
    }

    if (state.search.filters.fromDate !== null) {
      const fromDatetime = moment(state.search.filters.fromDate).startOf('day').toISOString()

      if (fromDatetime) {
        resultFilters.fromDatetime = fromDatetime
      }
    }

    if (state.search.filters.toDate !== null) {
      const toDatetime = moment(state.search.filters.toDate).endOf('day').toISOString()

      if (toDatetime) {
        resultFilters.toDatetime = toDatetime
      }
    }

    const skip = (page - 1) * rowsPerPage

    let result = await api.searchSendQuery(state.search.keyword, resultFilters, skip, rowsPerPage)

    commit(SEARCH_RECEIVE_RESULTS, {
      items: result.items,
      total: result.total
    })
  } catch (e) {
    commit(SEARCH_SET_ERROR, true)
    dispatch('searchResetPage')
    commit(SEARCH_RESET_ITEMS)
  }
  commit(SEARCH_CHANGE_LOADER, false)
}



// WEBPACK FOOTER //
// ./src/store/actions/search.js