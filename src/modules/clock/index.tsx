import reducers, {ClockState} from './reducers';
import clockSagas from './sagas';
import * as clockActions from './actions';
import * as clockTypes from './types';

export { clockActions, clockTypes, clockSagas, ClockState };

export default reducers;
