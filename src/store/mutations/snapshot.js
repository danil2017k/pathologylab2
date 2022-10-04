export default {
  /** VIEWER TOOLS */
  ENABLE_TOOL (state, tool) {
    if (!['NeuralSearch', 'Ki67'].includes(tool)) {
      throw new Error('Unknown tool')
    }
    state.viewer.tool = tool
  },
  DISABLE_TOOLS (state) {
    state.viewer.tool = ''
  },

  /** NEURAL SEARCH */
  NEURAL_SEARCH_START_SESSION (state, sessionID) {
    state.neuralSearch.sessionID = sessionID
    state.neuralSearch.suggestShown = false
  },
  NEURAL_SEARCH_CANCEL_SESSION (state) {
    state.neuralSearch.sessionID = ''
    state.neuralSearch.suggestShown = true
  },
  NEURAL_SEARCH_DONE (state, { sessionID, image, results }) {
    if (state.neuralSearch.sessionID !== sessionID) return

    state.neuralSearch = {
      ...state.neuralSearch,
      popupShown: true,
      searchImage: image,
      results
    }
  },
  NEURAL_SEARCH_CLOSE_POPUP (state) {
    state.neuralSearch = {
      suggestShown: true,
      popupShown: false
    }
  }
}
