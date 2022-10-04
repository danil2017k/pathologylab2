import * as accountActions from './account'
import * as casesActions from './cases'
import * as clinicianView from './clinician-view'
import * as commonActions from './common'
import * as relatedFindActions from './relatedFind'
import * as resourcesActions from './resources'
import * as searchActions from './search'
import * as snapshotActions from './snapshot'
import * as teamManagerActions from './team-manager'
import * as diagnosis from './diagnosis'
import * as logs from './logs'

export default {
  ...accountActions,
  ...casesActions,
  ...clinicianView,
  ...commonActions,
  ...relatedFindActions,
  ...resourcesActions,
  ...searchActions,
  ...snapshotActions,
  ...teamManagerActions,
  ...diagnosis,
  ...logs
}

