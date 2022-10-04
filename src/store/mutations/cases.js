import {
  CASE_GROUP_OPERATIONS_CHANGE_LOADER,
  CASE_GROUP_OPERATIONS_LOAD_CASES} from './available'

export default {
  [CASE_GROUP_OPERATIONS_CHANGE_LOADER] (state, value) {
    state.caseGroupOperations.caseLoading = value
  },
  [CASE_GROUP_OPERATIONS_LOAD_CASES] (state, cases) {
    state.caseGroupOperations.cases = cases
  },
  CHANGE_CASES_TYPE (state, payload) {
    state.cases = {
      ...state.cases,
      type: payload,
      list: [],
      allLoaded: true
    }
  },
  CASE_LOADED (state, payload) {
    console.log(payload, 'payload')
    state.case = payload
    state.case.fileOrder = payload.files ? payload.files.map(file => file.id) : []
    state.case.files = state.case.files ? state.case.files.reduce((result, file) => {
      result[file.id] = file
      return result
    }, {}) : {}
    state.file = state.case.files[0]
    state.case.specialization = payload.specialization || {}
    state.loading = false
  },
  CASE_UNLOAD (state, payload) {
    state.case = {}
  },
  CASES_LOADED_BY_PARAMS (state, payload) {
    state.cases.list = payload.cases
    state.cases.allLoaded = payload.all_loaded
    state.cases.casesByTypeLoading = false
    state.cases.count = payload.count
    state.cases.puzzle = payload.puzzle
    state.cases.pagination[state.cases.type] = state.cases.pagination[state.cases.type] || {}
    state.cases.pagination[state.cases.type].pagesCount = 0
    if (state.cases.paginationDefaults.perPage > 0) {
      state.cases.pagination[state.cases.type].pagesCount = Math.round(Math.ceil(payload.count / state.cases.paginationDefaults.perPage))
    }

    state.loading = false
  },
  CASES_BY_TYPE_LOADING (state) {
    state.cases.casesByTypeLoading = true
  },
  CASES_BY_TYPE_LOADED (state) {
    state.cases.casesByTypeLoading = false
  },
  CASES_LOADED (state, payload) {
    if (payload.clean) {
      state.cases.list = payload.cases
    } else {
      state.cases.list = state.cases.list.concat(...payload.cases)
    }
    state.cases.allLoaded = payload.all_loaded
    state.cases.puzzle = payload.puzzle
    state.loading = false
  },
  CHANGE_CASES_PAGE (state, payload) {
    state.cases.pagination = {
      ...state.cases.pagination,
      [payload.type]: {
        ...state.cases.pagination[payload.type] || {},
        currentPage: payload.page
      }
    }
  },
  CASES_STATISTIC (state, payload) {
    state.statistic = payload
  },
  CASES_SEARCH (state, payload) {
    state.cases.list = payload.cases
    state.cases.puzzle = payload.puzzle
    state.query = payload.query
    state.loading = false
    if (state.cases.paginationDefaults.perPage > 0) {
      state.cases.pagination = {
        ...state.cases.pagination,
        [state.cases.type]: {
          ...state.cases.pagination[state.cases.type] || {},
          pagesCount: Math.round(Math.ceil(payload.count / state.cases.paginationDefaults.perPage))
        }
      }
    }
  },
  CASE_ARCHIVED (state, status) {
    state.case.status = status
  },
  CASE_UNARCHIVED (state, status) {
    state.case.status = status
  },
  CASE_INPROGRESS (state) {
    if (state.case.report) {
      state.case.report.status = 'in_progress'
    }
  },
  UPDATE_LAST_CHANGED (state, caseData) {
    (state.cases.list.find(c => c.id === caseData.id) || {}).last_change_date = caseData.last_change_date
  },
  CASE_UPDATED (state, payload) {
    state.case = payload
  },
  SAVE_QUERY_TO_STATE (state, query) {
    state.query = query
  },
  SORT_FILES (state, order) {
    state.case.fileOrder = order
  },
  FILES_AND_ORDERS (state, {files, orders}) {
    state.case.fileOrder = orders
    state.case.files = files
  },
  ADD_COMMENT (state, payload) {
    state.case.comments.push(payload)
  },
  EDIT_COMMENT (state, payload) {
    let index

    for (let i = 0; i < state.case.comments.length; i++) {
      if (state.case.comments[i].id === payload.id) {
        index = i
        break
      }
    }

    if (index >= 0) {
      state.case.comments[index].text = payload.text
    }
  },
  DELETE_COMMENT (state, payload) {
    state.case.comments = state.case.comments.filter((c) => c.id !== payload)
  },
  LIKE_COMMENT (state, payload) {
    let index

    for (let i = 0; i < state.case.comments.length; i++) {
      if (state.case.comments[i].id === payload.id) {
        index = i
        break
      }
    }

    if (index >= 0) {
      state.case.comments[index].likes = payload.likes
    }
  },
  CHANGE_DOCTOR_OWNER (state, id) {
    state.case.owner_doctor_id = id
  },
  CHANGE_DOCTOR_REPORT (state, id) {
    state.case.report_doctor_id = id
  },
  DOCTOR_APPROVE_REPORT (state, id) {
    if (state.case.report.leads) {
      state.case.report.leads.push(id)
      return
    }
    state.case.report.leads = [id]
  },
  COLLABORATORS_ADDED (state, payload) {
    state.case.collaborators = state.case.collaborators.concat(payload.collaborators)
  },
  COLLABORATOR_DELETED (state, payload) {
    state.case.collaborators = state.case.collaborators.filter((c) => c.id !== payload)
  },
  REQUEST_SENT (state, payload) {
    state.case.request = payload
  },
  REPORT_SAVED_DATA (state, data) {
    state.case.report = data
  },
  REPORT_SET_STATE (state, _state) {
    state.case.report.state = _state
  },
  REPORT_SAVED (state, data) {
    state.case.report.publish_date = data.publish_date
    state.case.report.id = data.id
  },
  REPORT_ADD (state, report) {
    state.case.reports.push(report)
  },
  REPORT_EDIT (state, report) {
    let index

    for (let i = 0; i < state.case.reports.length; i++) {
      if (state.case.reports[i].id === report.id) {
        index = i
        break
      }
    }

    if (index >= 0) {
      state.case.reports[index].text = report.text
      state.case.reports[index].stains = report.stains
      state.case.reports[index].screenshots = report.screenshots
    }
  },
  SAVE_SCREENSHOT (state, screenshot) {
    if (screenshot.isImage) {
      state.case.screenshots_macro.push(screenshot)
    } else {
      state.case.screenshots.push(screenshot)
    }
  },
  SET_PUZZLE_ID (state, payload) {
    state.cases.puzzle = payload
  },
  TOGGLE_PUBLISHED (state) {
    state.case.is_published = !state.case.is_published
  },
  SIMILAR_SLIDES (state, payload) {
    state.similarSlides = payload
  },
  SIMILAR_IMAGE (state, payload) {
    state.similarImage = payload
  }
}

