/* eslint-disable no-irregular-whitespace */
import moment from 'moment'

export default {
  file: {
    type_data: {
      marks: []
    }
  },
  circleRuler: [
    {
      type: "image",
      url:
        "https://images.unsplash.com/photo-1541712111534-d8f818d1efd5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49a1e700beb6fd78cd17e5eae3e154ad&auto=format&fit=crop&w=700&q=80",
      attrs: {
        width: 300,
        height: 500,
        left: 300,
        top: 200
      }
    }
  ],
  loading: false,
  saving: false,
  navbarExpanded: true,
  casesListStyle: 'list',
  account: {},
  specializations: [],
  stains: ["f832f7c8-9d63-4a45-8668-a07dbe9c666a"],
  frequent_stains: [],
  query: '',
  availableClients: [],
  availableClientsById: {},
  availableSpecializations: [],
  availableSpecializationsById: {},
  caseStatsByUser: [],
  caseStatsByUserMap: {},
  caseStatsByUserLoading: false,
  searchModalVisible: false,
  caseGroupOperations: {
    caseLoading: false,
    cases: []
  },
  search: {
    error: false,
    dataLoaded: false,
    loading: false,
    pagination: {
      rowsPerPage: 10,
      page: 1
    },
    items: [],
    totalItems: 0,
    keyword: null,
    filters: {
      fromDate: null,
      toDate: null,
      where: ['cases']
    }
  },
  cases: {
    allLoaded: false,
    count: 0,
    type: 'my',
    puzzle: null,
    list: [],
    paginationDefaults: {
      currentPage: 1,
      pagesCount: 0,
      perPage: 20
    },
    casesByTypeLoading: false,
    pagination: {}
  },
  case: {},
  teamManager: {
    cases: [],
    casesCount: 0,
    casesLoading: false,
    casesLoadingVersion: 0,
    actionInProgress: false,
    pagination: {
      rowsPerPage: 40,
      page: 1
    },
    filters: {
      createdFrom: moment().subtract(1, 'month').format('YYYY-MM-DD'),
      createdTo: moment().format('YYYY-MM-DD'),
      fulltextSearchString: null,
      ownerDoctorIds: [],
      reportDoctorIds: [],
      collaboratorIds: [],
      clientId: null,
      specializationIds: [],
      statuses: [],
      overdued: false,
      onHold: false,
      lessThan24Hours: false,
      hideExcludedClients: true
    },
    creationDateRangeFilterOptions: {
      startDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      format: 'YYYY-MM-DD'
    },
    orderBy: [{
        value: 'creation_date desc',
        title: 'По дате создания (сначала новые)'
      },
      {
        value: 'estimated_completion_datetime asc',
        title: 'По оставшемуся времени (сначала с большей задержкой)'
      }
    ],
    order: 'creation_date desc'
  },
  clinicianView: {
    cases: [],
    casesCount: 0,
    casesLoading: false,
    pagination: {
      rowsPerPage: 25,
      page: 1,
      pagesCount: 0
    },
    filters: {
      casesScope: 'all',
      fulltextSearchString: null
    }
  },
  fileOrder: [],
  usersSuggestions: [],
  allCollaborators: [],
  puzzleId: '',
  viewer: {
    opened: false,
    compareMode: false,
    fullscreen: false,
    panelOpened: false,
    firstFile: {},
    secondFile: {},
    syncronized: false,
    tool: ''
  },
  notifications: [],
  filesDeleteQueue: {},
  notification_history: [],
  statistic: {},
  total_notification: 0,
  deleteTimer: 15000,
  contentType: 'info',
  webinars: [],
  webinar: {},
  isMobile: false,
  isMobileOrTablet: false,
  width: 0,
  showRelatedModal: false,
  similarSlides: [],
  similarImage: '',
  logs: {},
  hideSearchControlInLogs: false,
  searchCaseId: null,
  differentialDiagnosis: [],
  diagnosis: [],
  cytologyStain: '406511af-dd30-4d09-bab8-9786f8088d12',
  reactions: [],
  availStains: [],
  dsResults: {
    image: '',
    results: []
  },
  neuralSearch: {
    suggestShown: true,
    popupShown: false,
    result: [],
    searchImage: null
  }
}



// WEBPACK FOOTER //
// ./src/store/state/index.js