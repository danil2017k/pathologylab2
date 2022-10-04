export const access = state => {
  if (state.account.access !== undefined) {
    return Object.keys(state.account.access).filter(product => state.account.access[product])
  }
}

export const isOwner = state => state.case.owner ? (state.case.owner.id === state.account.id) || (state.account.access && state.account.access.admin) : true
export const hasLabAccess = state => !!(state.account.access && state.account.access.consultation && state.account.access.lab)

// For Viewer Item
export const viewerOpened = state => state.viewer.opened
export const comparing = state => state.viewer.compareMode
export const fullscreen = state => state.viewer.fullscreen
export const fullscreenPanelOpened = state => state.viewer.panelOpened

// For files in Viewer Item
export const files = state => state.case.files
export const order = state => state.case.fileOrder

export const isMobile = state => state.isMobile
export const isMobileOrTablet = state => state.isMobileOrTablet
export const windowWidth = state => state.width



// WEBPACK FOOTER //
// ./src/store/getters/index.js