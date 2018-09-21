import { combineReducers } from 'redux';

import clock, { ClockState } from 'modules/clock';
export { ClockState };
// import auth, { AuthState } from 'modules/auth';
// import profile, { ProfileState } from 'modules/profile';

export interface AppState {
  clock: ClockState;
  // auth: AuthState;
  // profile: ProfileState;
}

export default combineReducers<AppState>({
  clock
  // auth,
  // profile
});
