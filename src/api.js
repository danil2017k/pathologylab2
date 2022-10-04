import axios from 'axios'

function ApiException (body) {
  this.body = body
  this.name = 'ApiException'
}

ApiException.prototype.toString = function () {
  return this.name + ': "' + this.body + '" (' + this.code + ')'
}

function parseResponse (response) {
  if (response.status !== 200) {
    throw new ApiException(response.data || '')
  }

  if (response.data.error && response.data.error.length > 0) {
    throw new ApiException(response.data || '')
  }

  return response.data.data
}

export default {
  async getCaseStatsByUser () {
    return axios.get(`/api/team-manager/stats-by-user`).then((response) => {
      return parseResponse(response)
    })
  },
  async getAvailableClients () {
    return axios.get(`/api/clients/get`).then((response) => {
      return parseResponse(response)
    })
  },
  async getAvailableSpecializations () {
    return axios.get(`/api/cases/available-specializations`).then((response) => {
      return parseResponse(response)
    })
  },
  async getCliniciansCases (skip, limit, filters, sortBy, order) {
    return axios.get(`/api/clinicians/cases`, {
      params: {
        skip: skip,
        limit: limit,
        sortBy: sortBy,
        order: order,
        filters: filters
      }
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async getTeamManagerCases (skip, limit, filters, sortBy, orderBy) {
    return axios.get(`/api/team-manager/cases`, {
      params: {
        skip: skip,
        limit: limit,
        sortBy: sortBy,
        orderBy: orderBy,
        filters: filters
      }
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerChangeOwnerDoctor (caseId, previousOwnerDoctorId, newOwnerDoctorId) {
    return axios.post(`/api/team-manager/cases/change-owner-doctor`, {
      caseId: caseId,
      previousOwnerDoctorId: previousOwnerDoctorId,
      newOwnerDoctorId: newOwnerDoctorId
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerChangeReportDoctor (caseId, previousReportDoctorId, newReportDoctorId) {
    return axios.post(`/api/team-manager/cases/change-report-doctor`, {
      caseId: caseId,
      previousReportDoctorId: previousReportDoctorId,
      newReportDoctorId: newReportDoctorId
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerAddCollaborator (caseId, userId) {
    return axios.post(`/api/team-manager/cases/add-collaborator`, {
      caseId: caseId,
      userId: userId
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerRemoveCollaborator (caseId, userId) {
    return axios.post(`/api/team-manager/cases/remove-collaborator`, {
      caseId: caseId,
      userId: userId
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkAddCollaboratorToSelected (caseIds, userId) {
    return axios.post(`/api/team-manager/cases/bulk/add-collaborator-to-selected`, {
      userId: userId,
      caseIds: caseIds
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkRemoveCollaboratorFromSelected (caseIds, userId) {
    return axios.post(`/api/team-manager/cases/bulk/remove-collaborator-from-selected`, {
      userId: userId,
      caseIds: caseIds
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkChangeOwnerDoctorInSelected (caseIds, userId) {
    return axios.post(`/api/team-manager/cases/bulk/change-owner-doctor-in-selected`, {
      userId: userId,
      caseIds: caseIds
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkChangeReportDoctorInSelected (caseIds, userId) {
    return axios.post(`/api/team-manager/cases/bulk/change-report-doctor-in-selected`, {
      userId: userId,
      caseIds: caseIds
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkAddCollaboratorToFiltered (filters, userId) {
    return axios.post(`/api/team-manager/cases/bulk/add-collaborator-to-filtered`, {
      userId: userId,
      filters: filters
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkRemoveCollaboratorFromFiltered (filters, userId) {
    return axios.post(`/api/team-manager/cases/bulk/remove-collaborator-from-filtered`, {
      userId: userId,
      filters: filters
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkChangeOwnerDoctorInFiltered (filters, userId) {
    return axios.post(`/api/team-manager/cases/bulk/change-owner-doctor-in-filtered`, {
      userId: userId,
      filters: filters
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async teamManagerBulkChangeReportDoctorInFiltered (filters, userId) {
    return axios.post(`/api/team-manager/cases/bulk/change-report-doctor-in-filtered`, {
      userId: userId,
      filters: filters
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async searchSendQuery (keyword, filters, skip, limit) {
    return axios.get(`/api/search/query`, {
      params: {
        skip: skip,
        limit: limit,
        keyword: keyword,
        filters: filters
      }
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async casesCreateSlideRescanOrder (fileId, magnification, comment) {
    return axios.post(`/api/cases/create-slide-rescan-order`, {
      fileId: fileId,
      magnification: magnification,
      comment: comment
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async findCasesByTitle (titleQueryString) {
    return axios.get(`/api/cases/find-by-title`, {
      params: {
        query: titleQueryString
      }
    }).then((response) => {
      return parseResponse(response)
    })
  },
  async getLogs (page, caseTitle, caseId, events, limit) {
    return axios.get(`/api/logs/by-page`, {
      params: {
        page: page,
        case_title: caseTitle,
        events: events,
        limit: limit,
        case_id: caseId
      }
    }).then((response) => {
      return response.data
    })
  },
  async changeShareState (caseId, value) {
    return axios.post(`/api/cases/change-share-state`, {
      caseId: caseId,
      share: value
    })
  },
  async getClinicalDataHistory (caseID) {
    return axios.get(`/api/cases/${caseID}/clinical_data_requests`)
    .then(response => response.data.requests)
  },
  async requestClinicalData (caseID, text, hold = false) {
    return axios.post(`/api/cases/${caseID}/clinical_data_requests`, {
      on_hold: hold,
      data: { text }
    })
  },
  async processClinicalData (caseID) {
    return axios
      .put(`/api/cases/${caseID}/clinical_data_requests`)
      .then(response => response.data.requests)
  }
}


