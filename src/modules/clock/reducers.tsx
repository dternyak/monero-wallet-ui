import types from './types';
import { ClockAction } from './actions';

export interface ClockState {
  lastUpdate: number;
  light: boolean;
}

export const initialState: ClockState = {
  lastUpdate: 0,
  light: false
};

export default (state = initialState, action: ClockAction<any>) => {
  switch (action.type) {
    case types.TICK_CLOCK:
      const { payload } = action;
      return {
        ...state,
        ...{ lastUpdate: payload.lastUpdate, light: !!payload.light }
      };

    default:
      return state;
  }
};
