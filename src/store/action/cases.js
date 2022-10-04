import axios from 'axios'
import router from '@/router'
import _ from 'lodash'
import api from '../../api'
import mqtt from '@/utils/mqtt'
import {
  COMMON_CHANGE_CASE_STATS_BY_USER,
  COMMON_CHANGE_CASE_STATS_BY_USER_LOADING
} from '../mutations/available'

import { Archived } from '../../dictionaries/availableCaseStatuses'

let caseCancelToken = null

export const setCasesType = ({ commit }, type) => {
  commit('CHANGE_CASES_TYPE', type)
}

export const setPuzzleId = ({ commit }, id) => {
  commit('SET_PUZZLE_ID', id)
}

export const toggleCasesListStyle = ({ commit }) => {
  commit('TOGGLE_CASES_LIST_STYLE')
}

export const loadStatistic = ({ commit, dispatch }) => {
  axios.get('/api/cases/statistic')
    .then(({ data }) => {
      commit('CASES_STATISTIC', data)
    })
}

export const changeCasesPage = ({commit, state}, page) => {
  commit('CHANGE_CASES_PAGE', {
    type: state.cases.type,
    page: page
  })
}
// tut
export const loadFirstCase = ({commit, state}, payload) => {
  const list = []
  console.log(payload.data, '!', Object.assign(payload.data[0]))
  commit('CASE_LOADED', Object.assign(payload.data[0]))
  commit('OPEN_VIEWER', '78684e29-2176-49e5-bb69-abdc1e2cba1f')
  commit('SELECT_VIEWER_FILE', { 'id': '78684e29-2176-49e5-bb69-abdc1e2cba1f', 'primary': true })

  // var files = payload.map(function(data) {
  //   console.log(data, '!!')
//  
  //   return data.files;
  // });
  // const order = Object.assign(payload.data[0].files).forEach((item, i, arr) => {
    
  //   list.push(item[i].id)
  // });
  // commit('FILES_AND_ORDERS', { payload: Object.assign(payload.data[0].files)})
 
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

export const loadCasesByParams = ({commit, state}, params) => {
  const query = _.get(params, 'query', null)
  const currentPage = _.get(state.cases.pagination, [state.cases.type, 'currentPage'], state.cases.paginationDefaults.currentPage)
  const perPage = state.cases.paginationDefaults.perPage
  const offset = (currentPage - 1) * perPage

  commit('CASES_BY_TYPE_LOADING')
  commit('SAVE_QUERY_TO_STATE', query)
  if (!state.cases.list.length) {
    commit('LOADING')
  }

  let puzzleParams = JSON.parse(localStorage.getItem('puzzleParams'))

  if (state.cases.puzzle) {
    localStorage.setItem('puzzleParams', JSON.stringify(state.cases.puzzle))
  }

  // let url = state.cases.puzzle ? `/api/puzzles/${state.cases.puzzle}` : '/api/cases'
  let url = `/files.json`

  if (puzzleParams && window.location.href.indexOf('/webinars/') > 0) {
    url = '/api/puzzles/' + puzzleParams
  }

  const currentType = _.clone(state.cases.type)
  let queryParams = {
    type: state.cases.type,
    offset: offset,
    limit: perPage,
    query: query
  }

  localStorage.setItem('routeParams', JSON.stringify(queryParams))

  return new Promise((resolve, reject) => axios.get(url, { params: queryParams })
    .then(({data}) => {
      if (state.cases.type !== currentType) {
        resolve()
        commit('CASES_BY_TYPE_LOADED')
        return
      }

      if (params && params.query) {
        commit('CASES_SEARCH', data)
      } else {
        commit('CASES_LOADED_BY_PARAMS', data)
      }
      commit('CASES_BY_TYPE_LOADED')
      resolve()
    })
    .catch(err => {
      if (err.response.status === 412) {
        queryParams = {
          type: 'my',
          offset: 0,
          limit: perPage,
          query: query
        }
        localStorage.setItem('routeParams', JSON.stringify(queryParams))
        return window.location.reload()
      }
      if (err.response.status === 403) {
        router.push('/account')
      }
      reject(err)
    })
  )
}

export const unLoadCase = ({ commit, state }) => {
  if (state.case && state.case.id) {
    axios.get(`/api/cases/${state.case.id}/viewed`)
  }

  commit('CASE_UNLOAD')
}

export const loadCase = async ({ commit }, { type, id }) => {
  commit('LOADING')
  if (id === 'new') {
    commit('CASE_LOADED', { title: '', specialization: {}, last_change_date: new Date().getTime() / 1000 })
  } else {
    let url = `/files.json`

    if (caseCancelToken) {
      caseCancelToken()
    }
    await axios.get(url, { 
      mode: 'no-cors'
    })
    .then(({ data }) => {
      if (!data.files.screenshots) data.files.screenshots = []
      if (!data.files.screenshots_macro) data.files.screenshots_macro = []
      if (!data.files.request) data.request = null

      commit('CASE_LOADED', data)
    })
    .catch(err => {
      if (axios.isCancel(err)) {
        console.log('Get case request canceled')
        return
      }
      if (err.response.status === 404) {
        router.push('/')
      }
    })
  }
}

export const saveMetaData = ({commit, state}, {meta, file_id, stains}) => {
  axios.put(`/api/cases/files/${file_id}/meta`, {meta: meta.meta_data, stains: stains})
      .then(({data}) => {
        commit('UPDATE_FILE_META', {id: file_id, meta: meta.meta_data})
      })
      .catch(console.error)
}

export const saveMaterial = ({commit, state}, {case_id, type_id, material}) => {
  axios.put(`/api/cases/${case_id}/material`, {type: type_id, material: material})
      .then(({data}) => {
      })
      .catch(console.error)
}
export const loadJsonFileData = ({commit, dispatch}) => {
  return new Promise((resolve, reject) => {
    axios.get('/data')
    .then(({ data }) => {
      // if (!data.screenshots) data.screenshots = []
      // if (!data.screenshots_macro) data.screenshots_macro = []
      // if (!data.request) data.request = null
      // resolve(data)
      
      commit('CASE_LOADED', data)
    })
    .catch(response => {
      reject(response)
    })
  })
}
export const newCase = ({ commit, dispatch }) => {
  return new Promise((resolve, reject) => {
    axios.get('/api/cases/new')
    .then(({ data }) => {
      resolve(data.id)
    })
    .catch(response => {
      reject(response)
    })
  })
}

export const getNotificationByPage = ({ commit, dispatch }, page) => {
  axios.get('/api/cases/notification/' + page).then((data) => {
    commit('SET_HOTIFICATION_HISTORY', data.data)
  })
}

// TODO: make optimistical update
export const saveCase = ({ commit }, caseData) => {
  if (!caseData.id || caseData.id === 'new') {
    commit('LOADING')
    axios.post('/api/cases', caseData)
      .then(({data}) => {
        commit('SAVED')
        router.push(`/cases/${data.id}`)
      })
      .catch(console.error)
  } else {
    axios.put(`/api/cases/${caseData.id}`, caseData)
      .then(() => commit('CASE_UPDATED', caseData))
      .catch(console.error)
  }
}

export const changeShareState = async ({commit, dispatch}, {caseId, value}) => {
  let result = false

  try {
    await api.changeShareState(caseId, value)
    result = true
  } catch (e) {
    dispatch('sendGenericErrorNotification', {
      messageLocalizationKey: 'notifications.share.changeShareState.error'
    })
  }

  return result
}

export const getIcdMorphology = ({ commit, state }, text) => {
  return axios.get(`/api/cases/icd/morphology`, {params: {text: text}})
}

export const getIcdTopography = ({ commit, state }, text) => {
  return axios.get(`/api/cases/icd/topography`, {params: {text: text}})
}

export const saveScreenshotWsiInStorage = ({ commit, state }, data) => {
  data.userId = state.account.id
  return new Promise((resolve, reject) => axios.post(`/api/cases/screenshot-wsi`, data)
    .then(data => resolve(data.data))
    .catch(reject)
  )
}

export const saveScreenshotInStorage = ({ commit, state }, data) => {
  data.userId = state.account.id
  return new Promise((resolve, reject) => axios.post(`/api/cases/screenshot`, data)
    .then(data => resolve(data.data.file_name))
    .catch(reject)
  )
}

export const sendImageMembraneToDs = ({ commit, state }, data) => {
  return new Promise((resolve, reject) => axios.post(`/ds/single/membrane/add`, data)
    .then(resolve)
    .catch(reject)
  )
}

export const getImageMembraneFromDs = ({ commit, state }, file_id) => {
  return new Promise((resolve, reject) => axios.get(`/ds/single/membrane/result/` + file_id, )
      .then((data) => {
        if (!data.data || !data.data.base64) {
          window.dsLoop = setTimeout(() => {
            getImageMembraneFromDs({ commit, state }, file_id).then((rep) => {
              if (!rep.data || !rep.data.base64) {
                return
              }
              resolve(rep)
            })
          }, 2000)
          return
        }
        resolve(data)
      }).catch(reject)
    )
}

export const sendImageToDs = ({ commit, state }, data) => {
  return new Promise((resolve, reject) => axios.post(`/ds/single/add`, data)
    .then(resolve)
    .catch(reject)
  )
}

export const getImageFromDs = ({ commit, state }, file_id) => {
  return new Promise((resolve, reject) => axios.get(`/ds/single/result/` + file_id, )
      .then((data) => {
        if (!data.data || !data.data.base64) {
          window.dsLoop = setTimeout(() => {
            getImageFromDs({ commit, state }, file_id).then((rep) => {
              if (!rep.data || !rep.data.base64) {
                return
              }
              resolve(rep)
            })
          }, 2000)
          return
        }
        resolve(data)
      }).catch(reject)
    )
}

export const sendImageSimilarToDs = ({ commit, state }, data) => {
  commit('SIMILAR_IMAGE', data.content)
  return new Promise((resolve, reject) => axios.post(`/similar/post-predict-tile`, data)
    .then(resolve)
    .catch(reject)
  )
}

export const getImageSimilarFromDs = ({ commit, state }, id) => {
  return new Promise((resolve, reject) => axios.get(`/similar/get-predict-result?id=` + id, )
      .then((data) => {
        if (!data.data || !(data.data instanceof Array)) {
          window.dsLoop = setTimeout(() => {
            getImageSimilarFromDs({ commit, state }, id).then((rep) => {
              if (!rep.data || !(rep.data instanceof Array)) {
                return
              }
              commit('SIMILAR_SLIDES', rep.data)
              resolve(rep)
            })
          }, 2000)
          return
        }
        commit('SIMILAR_SLIDES', data.data)
        resolve(data)
      }).catch(reject)
    )
}

export const sendGlassToDp = ({ commit, state }, {fileId, type}) => {
  return new Promise((resolve, reject) => axios.get(`/ds/add/${fileId}/${type}`)
      .then((data) => {
        if (data.status === 202) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(reject)
    )
}

export const getDsLayer = ({ commit, state }, {fileId, type}) => {
  return new Promise((resolve, reject) => axios.get(`/ds/result/${fileId}/${type}`)
      .then((data) => {
        if (data.status === 202 || data.status === 200) {
          resolve(data.data)
        } else {
          resolve(null)
        }
      }).catch(reject)
  )
}

export const getMetsColor = ({ commit, state }) => {
  return new Promise((resolve, reject) => axios.get(`/api/cases/get-mets-color`)
      .then((data) => {
        resolve(data.data)
      }).catch(reject)
  )
}

export const deleteTrainingData = ({ commit, state }, data) => {
  return new Promise((resolve, reject) => axios.post(`/api/cases/file/training/delete`, data)
    .then(resolve)
    .catch(reject)
  )
}

export const sendMorfoTrainingData = ({ commit, state }, data) => {
  return new Promise((resolve, reject) => axios.post(`/api/cases/file/morfo-training`, data)
      .then((result) => {
        if (result.status === 200) {
          resolve({success: true, id: result.data})
        } else {
          console.log(result)
          resolve({success: false})
        }
      }).catch(reject)
    )
}

export const getMorfoTrainingData = ({ commit, state }, file_id) => {
  return new Promise((resolve, reject) => axios.get(`/api/cases/file/morfo-training/${file_id}`)
      .then((result) => {
        if (result.status === 200) {
          resolve({success: true, data: result.data.data})
        } else {
          resolve({success: false})
        }
      }).catch(reject)
    )
}

export const sendTrainingData = ({ commit, state }, data) => {
  return new Promise((resolve, reject) => axios.post(`/api/cases/file/training`, data)
      .then((result) => {
        if (result.status === 200) {
          resolve({success: true, id: result.data})
        } else {
          console.log(result)
          resolve({success: false})
        }
      }).catch(reject)
    )
}

export const getInfoByCells = ({ commit, state }, {fileId, startX, endX, startY, endY}) => {
  return new Promise((resolve, reject) => axios.get(`/ds/count-cells/${fileId}/${startX}/${endX}/${startY}/${endY}`)
    .then(resolve)
    .catch(reject)
  )
}

export const sendDicomVolume = ({ commit, state }, data) => {
  return new Promise((resolve, reject) => axios.post(`/ds/dicom-volume`, data)
    .then(resolve)
    .catch(reject)
  )
}

export const getDicomVolume = ({ commit, state }, id) => {
  return new Promise((resolve, reject) => axios.get(`/ds/dicom-volume/${id}`, )
      .then((data) => {
        if (!data.data || !data.data.volume) {
          window.dsLoop = setTimeout(() => {
            getDicomVolume({ commit, state }, id).then((rep) => {
              if (!rep.data || !rep.data.volume) {
                return
              }
              resolve(rep)
            })
          }, 2000)
          return
        }
        resolve(data)
      }).catch(reject)
    )
}

export const toggleArchive = ({ commit, state }, {caseId}) => {
  if (state.case.status === Archived) {
    axios.post(`/api/cases/${caseId}/unarchive`)
      .then((response) => {
        if (caseId !== state.case.id) {
          return
        }
        const status = _.get(response, ['data', 'status'], null)
        commit('CASE_UNARCHIVED', status)
      })
      .catch(console.error)
  } else {
    axios.post(`/api/cases/${caseId}/archive`)
      .then((response) => {
        if (caseId !== state.case.id) {
          return
        }
        const status = _.get(response, ['data', 'status'], null)
        commit('CASE_ARCHIVED', status)
      })
      .catch(console.error)
  }
}

export const toggleInProgress = ({ commit, state }, {caseId}) => {
  axios.put(`/api/cases/${caseId}/status/in_progress`)
    .then(() => {
      if (caseId !== state.case.id) {
        return
      }
      commit('CASE_INPROGRESS')
    })
    .catch(console.error)
}

export const togglePublished = ({ commit, state }, {caseId}) => {
  commit('TOGGLE_PUBLISHED')
  axios.put(`/api/cases/${caseId}`, state.case)
}

export const addComment = ({ commit, state }, { text, caseId }) => {
  axios.post(`/api/cases/${caseId}/comments`, {text: text})
    .then((response) => {
      if (caseId !== state.case.id) {
        return
      }
      commit('ADD_COMMENT', {
        ...response.data,
        author: {
          id: state.account.id,
          name: state.account.name,
          photo: state.account.photo,
          email: state.account.email
        }
      })
    })
    .catch(console.error)
}

export const deleteComment = ({ commit, state }, {id, caseId}) => {
  axios.delete(`/api/cases/${caseId}/comments/${id}`)
    .then((response) => {
      commit('DELETE_COMMENT', id)
    })
    .catch(console.error)
}

export const editComment = ({ commit, state }, comment) => {
  axios.put(`/api/cases/${comment.caseId}/comments/${comment.id}`, { text: comment.text })
    .catch(console.error)
}

export const likeComment = ({ commit, state }, comment) => {
  axios.put(`/api/cases/like/comment/${comment.id}`).then((data) => {
    commit('LIKE_COMMENT', {id: comment.id, likes: data.data})
  }).catch(console.error)
}

export const searchUser = ({ commit, state }, {query, caseId}) => {
  axios.get(`/api/autocompletes?query=${query}&case_id=${caseId}`)
    .then((response) => {
      commit('SET_SUGGESTIONS', response.data.autocompletes)
    })
    .catch(console.error)
}

export const approveReport = ({ commit, state }, {id, caseId}) => {
  axios.put(`/api/cases/doctor/${caseId}/approve`)
    .then((response) => {
      if (caseId !== state.case.id) {
        return
      }
      commit('DOCTOR_APPROVE_REPORT', id)
    })
    .catch(console.error)
}

export const setOwnerDoctor = ({ commit, state }, {id, caseId})  => {
  axios.put(`/api/cases/owner/doctor/${caseId}/${id}`)
    .then((response) => {
      if (caseId !== state.case.id) {
        return
      }
      commit('CASE_INPROGRESS')
      commit('CHANGE_DOCTOR_OWNER', id)
    })
    .catch(console.error)
}

export const setReportDoctor = ({ commit, state }, {id, caseId}) => {
  axios.put(`/api/cases/report/doctor/${caseId}/${id}`)
    .then((response) => {
      if (caseId !== state.case.id) {
        return
      }
      commit('CHANGE_DOCTOR_REPORT', id)
    })
    .catch((e) => {
      if (e.response.data.error === 'doctor_cannot_validate_omi') {
        commit('ADD_NOTIFICATION', {
          id: _.uniqueId('doctorCannotValidate'),
          type: 'generic-error',
          localizationKey: 'notifications.canNotValidate'
        })
      }
    })
}

export const addCollaborators = ({ commit, state }, { emails, message, caseId }) => {
  axios.post(`/api/cases/${caseId}/collaborators`, { emails: emails, message: message })
    .then((response) => {
      if (caseId !== state.case.id) {
        return
      }
      commit('COLLABORATORS_ADDED', response.data)
    })
    .catch(console.error)
}

export const sendRequest = ({ commit, state }, {message, caseId}) => {
  axios.post(`/api/request`, { case_id: caseId, text: message })
    .then((response) => {
      commit('REQUEST_SENT', response.data.request)
    })
    .catch(console.error)
}

export const deleteCollaborator = ({ commit, state }, {id, caseId}) => {
  axios.delete(`/api/cases/${caseId}/collaborators/${id}`)
    .then((response) => {
      if (caseId !== state.case.id) {
        return
      }
      commit('COLLABORATOR_DELETED', id)
    })
    .catch(console.error)
}

const signHashAsync = (dataToSign, thumbprint) => {
  return new Promise(function (resolve, reject) {
    cadesplugin.async_spawn(function* (arg) {
      let oStore
      try {
        oStore = yield cadesplugin.CreateObjectAsync('CAdESCOM.Store')

        yield oStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED)
        let allCertificates = yield oStore.Certificates

        let oCertificates = yield allCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint)
        let certificatesCount = yield oCertificates.Count
        if (certificatesCount === 0) {
          return reject('Сертификат не найден в хранилище.')
        }
        let oCertificate = yield oCertificates.Item(1)
        let oSigner = yield cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner')
        oSigner.propset_Certificate(oCertificate)

        let oCadesSignedData = yield cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData')
        yield oCadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY)
        yield oCadesSignedData.propset_Content(dataToSign)

        let sSignedMessage = oCadesSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true)
        return resolve(sSignedMessage)
      } catch (err) {
        return reject('Не удалось создать подпись. ' + err.message)
      } finally {
        if (oStore) {
          yield oStore.Close()
        }
      }
    })
  })
}

export const reportSign = ({ commit, state }, {name_digital_signature, caseObj}) => {
  reportStorageCreate(caseObj.id, caseObj.report.id)
    .then((data) => {
      if (data.success) {
        reportStorageInit(caseObj.report.id)
          .then((data) => {
            if (data.success) {
              signHashAsync(data.data, name_digital_signature).then((data) => {
                reportStorageSign(data.replace(/\n/g, '').replace(/\r/g, ''), caseObj.report.id).then((data) => {
                  if (data.success) {
                    alert('Заключение успешно подписано')
                    caseObj.report.status = 'validated'
                  } else {
                    alert('Невозможно подписать заключение')
                  }
                }).catch(err => {
                  console.log(err)
                  alert('Невозможно отправить подпись в хранилище')
                })
              }).catch(err => {
                reportStorageDelete(caseObj.report.id).then(() => {
                })
                alert(err.message ? err.message : err)
              })
            } else {
              alert('Невозможно получить заключение из хранилища')
            }
          })
          .catch(err => {
            console.log(err)
            alert('Невозможно получить файл на подпись из хранилища')
          })
      } else {
        alert('Невозможно отправить заключение в хранилище')
      }
    }).catch(err => {
      console.log(err)
      alert('Невозможно установить связь с хранилищем')
    })
}

const reportStorageCreate = (caseId, reportId) => {
  return new Promise((resolve, reject) => axios.post(`/api/cases/report/storage/create`, {
    'case_id': caseId,
    'report_id': reportId
  })
      .then(({data}) => {
        resolve(data)
      })
      .catch(reject)
    )
}

const reportStorageInit = (reportId) => {
  return new Promise((resolve, reject) => axios.get(`/api/cases/report/storage/init/${reportId}`)
      .then(({data}) => {
        resolve(data)
      })
      .catch(reject)
    )
}

export const reportStorageEntity = ({ commit, state }, reportId) => {
  return new Promise((resolve, reject) => axios.get(`/api/cases/report/storage/entity/${reportId}`)
     .then(({data}) => {
       resolve(data)
     })
     .catch(reject)
   )
}

const reportStorageSign = (content, reportId) => {
  return new Promise((resolve, reject) => axios.post('/api/cases/report/storage/sign', {
    'content': content,
    'report_id': reportId
  })
      .then(({data}) => {
        resolve(data)
      })
      .catch(reject)
    )
}

const reportStorageDelete = (reportId) => {
  return new Promise((resolve, reject) => axios.post(`/api/cases/report/storage/delete`, {
    'report_id': reportId
  })
      .then(({data}) => {
        resolve(data)
      })
      .catch(reject)
    )
}

export const saveReport = ({ commit, state }, { text, stains, screenshots, textDiscuss, textMicro, macro_description_protocol, screenshots_macro, mkb, icd, ihc_recommended, genetic_recommended, jsonSelect, report_case_id, executionInfo }) => {
  const report = {
    text,
    stains,
    screenshots,
    macro_description_protocol,
    text_micro: textMicro,
    text_discuss: textDiscuss,
    screenshots_macro,
    mkb,
    icd,
    ihc_recommended,
    genetic_recommended,
    json_select: jsonSelect,
    execution_info: executionInfo
  }
  return axios.post(`/api/cases/${report_case_id}/reports/published`, report)
    .then((response) => {
      if (report_case_id !== state.case.id) {
        return
      }
      commit('REPORT_SAVED_DATA', response.data)
    })
}

export const draftReport = ({ commit, state }, {
  text,
  stains,
  screenshots,
  textDiscuss,
  textMicro,
  macro_description_protocol,
  screenshots_macro,
  mkb,
  icd,
  her2,
  ihc_recommended,
  genetic_recommended,
  jsonSelect,
  report_case_id
}) => {
  const report = { text: text,
    stains,
    screenshots,
    macro_description_protocol,
    text_micro: textMicro,
    text_discuss: textDiscuss,
    screenshots_macro,
    mkb,
    icd,
    her2,
    ihc_recommended,
    genetic_recommended,
    json_select: jsonSelect }
  return axios.post(`/api/cases/${report_case_id}/reports/draft`, report)
    .then((response) => {
      if (report_case_id !== state.case.id) {
        return
      }
      commit('REPORT_SAVED_DATA', response.data)
    })
}

export const getLatestReportVersion = ({ commit, state }, {caseId}) => {
  return axios.get(`/api/cases/get-single-report`, {
    params: {
      case_id: caseId
    }
  })
    .then((response) => {
      if (caseId !== state.case.id) {
        return
      }
      commit('REPORT_SAVED_DATA', response.data)
    })
}

export const reportToDraft = ({ commit, state }, {caseId}) => {
  return axios.post(`/api/cases/send-report-to-draft`, {
    case_id: caseId
  })
    .then(({response}) => {
      if (caseId !== state.case.id) {
        return
      }

      commit('REPORT_SET_STATE', 'draft')
    })
}

export const reportToPublished = ({ commit }) => {
  commit('REPORT_SET_STATE', 'published')
}

export const savePuzzleReport = ({ commit, state }, { text, stains, screenshots, text_macro, text_micro, text_discuss, screenshots_macro, mkb, icd }) => {
  const report = {
    text,
    stains,
    screenshots,
    text_macro,
    text_micro,
    text_discuss,
    screenshots_macro,
    mkb,
    icd
  }
  axios.post(`/api/puzzles/${state.case.puzzle}/${state.case.id}/reports`, report)
    .then((response) => {
      commit('REPORT_SAVED', response.data)
    })
    .catch(console.error)
}

export const updateFile = ({ commit, state }, { id, title, stains, reactions }) => {
  axios.put(`/api/cases/${state.case.id}/files/${id}`, {
    title, stains, reactions
  })
  .then(() => {
    commit('UPDATE_FILE', { id, title, stains })
  })
  .catch(console.error)
}

export const startDeleting = ({ commit, dispatch, state }, { caseId, fileId, title }) => {
  const timer = setTimeout(() => {
    dispatch('deleteFile', { caseId, fileId })
  }, state.deleteTimer)
  commit('PUT_TO_DELETE_QUEUE', { caseId, fileId, title, timer })
}

export const startDeletingOrder = ({ commit, dispatch, state }, { caseId, fileId, title }) => {
  const timer = setTimeout(() => {
    dispatch('deleteFileOrder', { caseId, fileId })
  }, state.deleteTimer)
  commit('PUT_TO_DELETE_QUEUE', { caseId, fileId, title, timer })
}

export const cancelDeleting = ({ commit }, fileId) => {
  commit('REMOVE_FROM_DELETE_QUEUE', fileId)
}

export const deleteFile = ({ commit, state }, { caseId, fileId }) => {
  axios.delete(`/api/cases/${caseId}/files/${fileId}`)
    .then(() => {
      commit('DELETE_FILE', fileId)
      commit('REMOVE_FROM_DELETE_QUEUE', fileId)
    })
    .catch(console.error)
}

export const deleteFileOrder = ({ commit, state }, { caseId, fileId }) => {
  axios.delete(`/api/cases/${caseId}/files/${fileId}/order`)
    .then(() => {
      commit('DELETE_FILE', fileId)
      commit('REMOVE_FROM_DELETE_QUEUE', fileId)
    })
    .catch(console.error)
}

export const createSlideRescanOrder = async ({ dispatch }, {fileId, magnification, comment}) => {
  try {
    await api.casesCreateSlideRescanOrder(fileId, magnification, comment)

    dispatch('sendGenericInfoNotification', {
      messageLocalizationKey: 'notifications.cases.createSlideRescanOrder.success'
    })
    return true
  } catch (e) {
    const error = _.get(e, ['response', 'data', 'error'], null)

    if (error === 'not_lis_file') {
      dispatch('sendGenericInfoNotification', {
        messageLocalizationKey: 'notifications.cases.createSlideRescanOrder.notLisFile'
      })
      return true
    }

    dispatch('sendGenericErrorNotification', {
      messageLocalizationKey: 'notifications.cases.createSlideRescanOrder.error'
    })
    console.error(`Unable to create slide rescan order: ${e.message}`)
  }

  return false
}

export const findCasesByTitle = _.debounce(async ({ state, commit }, titleQueryString) => {
  commit('CASE_GROUP_OPERATIONS_CHANGE_LOADER', true)

  try {
    const result = await api.findCasesByTitle(titleQueryString)
    const cases = _.get(result, 'cases', [])
    commit('CASE_GROUP_OPERATIONS_LOAD_CASES', cases)
  } catch (e) {
    console.error(`Unable to find cases by title: ${e.message}`)
  }

  commit('CASE_GROUP_OPERATIONS_CHANGE_LOADER', false)
}, 500)

export const startUploadingFile = ({ commit }, file) => {
  commit('START_UPLOADING_FILE', file)
}

export const progressUploadingFile = ({ commit }, {file, percentComplete}) => {
  const uniqueIdentifier = file.options.fingerprint(file.file, file.options)
  commit('PROGRESS_UPLOADING_FILE', { percentComplete, uniqueIdentifier })
}

export const cancelUploadingFile = ({ commit }, file) => {
  commit('CANCEL_UPLOADING_FILE', file)
}

export const successUploadingFile = ({ commit }, payload) => {
  commit('SUCCESS_UPLOADING_FILE', payload)
}

export const sortFiles = ({ commit }, { id, files }) => {
  axios.put(`/api/cases/${id}/files/order`, { files })
  .catch(console.error)
  commit('SORT_FILES', files)
}

export const resortFiles = ({ commit }, { files, orders }) => {
  commit('FILES_AND_ORDERS', {files, orders})
}

export const setContentType = ({ commit }, type) => {
  commit('CHANGE_CONTENT_TYPE', type)
}

export const openViewer = ({ commit }, id) => {
  window.history.replaceState(null, null, `${window.location.pathname}?file=${id}`)
  commit('OPEN_VIEWER', id)
}

export const closeViewer = ({ commit }, isLeftViewer) => {
  window.history.replaceState(null, null, window.location.pathname)
  commit('DISABLE_TOOLS')
  commit('CLOSE_VIEWER', isLeftViewer)
}

export const toggleSynchronize = ({ commit }) => {
  commit('TOGGLE_SYNCRONIZE')
}

export const setViewerCompareMode = ({ commit }) => {
  commit('VIEWER_COMPARE')
}

export const selectViewerFile = ({ commit }, info) => {
  commit('SELECT_VIEWER_FILE', info)
}

export const createMark = ({ commit }, { caseId, fileId, mark, webinarId }) => {
  if (webinarId) {
    return new Promise((resolve, reject) => axios.post(`/api/webinars/${webinarId}/files/${fileId}/marks`, mark)
      .then(({data}) => {
        mark.id = data.id
        commit('CREATE_MARK', { fileId, mark })
        resolve(mark)
      })
      .catch(reject)
    )
  } else {
    // localStorage.setItem('mark', mark);
    // commit('CREATE_MARK', { fileId, mark })

    // return mark
    return new Promise((resolve, reject) => axios.post(`http://localhost:3000/marks`, mark)
      .then(({data}) => {
        mark.id = data.id
        commit('CREATE_MARK', { fileId, mark })
        resolve(mark)
      })
      .catch(reject)
    )
  }
}

export const editMark = ({ commit }, { caseId, fileId, itemId, item, webinarId }) => {
  console.log(itemId, 'itemId edit mark')
  if (webinarId) {
    return new Promise((resolve, reject) => axios.put(`/api/webinars/${webinarId}/files/${fileId}/marks/${itemId}`, item)
      .then(() => {
        commit('EDIT_MARK', { fileId, item })
        resolve()
      })
      .catch(reject)
    )
  } else {
    // localStorage.setItem('mark', item);
    // commit('EDIT_MARK', { fileId, item })

    // return item
    return new Promise((resolve, reject) => axios.put(`http://localhost:3000/marks/${itemId}`, item)
      .then(() => {
        commit('EDIT_MARK', { fileId, item })
        resolve()
      })
      .catch(reject)
    )
  }
}

export const deleteMark = ({ commit }, { caseId, fileId, itemId, webinarId }) => {
  if (webinarId) {
    return new Promise((resolve, reject) => axios.delete(`/api/webinars/${webinarId}/files/${fileId}/marks/${itemId}`)
      .then(() => {
        commit('DELETE_MARK', { fileId, itemId })
        resolve()
      })
      .catch(reject)
    )
  } else {
    return new Promise((resolve, reject) => axios.delete(`/api/cases/${caseId}/files/${fileId}/marks/${itemId}`)
      .then(() => {
        commit('DELETE_MARK', { fileId, itemId })
        resolve()
      })
      .catch(reject)
    )
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const createRuler = ({ commit }, { caseId, fileId, ruler, webinarId }) => {
  console.log(ruler, 'createRuler')
  if (webinarId) {
    return new Promise((resolve, reject) => axios.post(`/api/webinars/${webinarId}/files/${fileId}/rulers`, ruler)
      .then(({data}) => {
        ruler.id = data.id
        commit('CREATE_RULER', { fileId, ruler })
        resolve(ruler)
      })
      .catch(reject)
    )
  } else {
    // localStorage.setItem('caseId', caseId);
    // localStorage.setItem('fileId', fileId);
    // localStorage.setItem('ruler', ruler);
    // ruler.id = new Date().getTime()
    //   return ruler
    console.log(ruler, "post promise ruler")

    return new Promise((resolve, reject) => axios.post(`http://localhost:3000/rulers`, ruler)
    .then(({data}) => {
      console.log(data, "post promise")
      ruler.id = data.id
      commit('CREATE_RULER', { fileId, ruler })
      resolve(ruler)
    })
    .catch(reject)
  )
}

    // return new Promise((resolve, reject) => axios.post(`/api/cases/${caseId}/files/${fileId}/rulers`, ruler)

}

export const editRuler = ({ commit }, { caseId, fileId, itemId, item, webinarId }) => {
  if (webinarId) {
    return new Promise((resolve, reject) => axios.put(`/api/webinars/${webinarId}/files/${fileId}/rulers/${itemId}`, item)
      .then(() => {
        commit('EDIT_RULER', { fileId, item })
        resolve()
      })
      .catch(reject)
    )
  } else {
    return new Promise((resolve, reject) => axios.put(`http://localhost:3000/rulers/${itemId}`, item)
      .then(() => {
        commit('EDIT_RULER', { fileId, item })
        resolve()
      })
      .catch(reject)
    )
  }
}

export const deleteRuler = ({ commit }, { caseId, fileId, itemId, webinarId }) => {
  if (webinarId) {
    return new Promise((resolve, reject) => axios.delete(`/api/webinars/${webinarId}/files/${fileId}/rulers/${itemId}`)
      .then(() => {
        commit('DELETE_RULER', { fileId, itemId })
        resolve()
      })
      .catch(reject)
    )
  } else {
    return new Promise((resolve, reject) => axios.delete(`/api/cases/${caseId}/files/${fileId}/rulers/${itemId}`)
      .then(() => {
        commit('DELETE_RULER', { fileId, itemId })
        resolve()
      })
      .catch(reject)
    )
  }
}

export const toggleFullscreenPanel = ({ commit }) => {
  commit('TOGGLE_FULLSCREEN_PANEL')
}

export const saveScreenshot = ({ commit }, screenshot) => {
  commit('SAVE_SCREENSHOT', screenshot)
}


export const placeLisOrder = ({ commit }, data) => {
  return new Promise((resolve, reject) => axios.post('/api/lisorders', data)
    .then(() => {
      let files = {}
      data.stains.forEach(stain => {
        let id = Date.now()
        files[id] = {
          id: id,
          creation_date: Date.now() / 1000,
          histoblock: data.histoblock.title,
          type: 'order',
          stains: [stain]
        }
      })
      commit('ADD_FILES', files)
      resolve()
    })
    .catch(console.error)
  )
}



// WEBPACK FOOTER //
// ./src/store/actions/cases.js