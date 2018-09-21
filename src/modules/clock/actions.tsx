import { Action, ActionCreator } from 'redux';
import types from './types';

export interface ClockAction<T> extends Action {
  type: string;
  payload?: T;
}

const startClock: ActionCreator<Action<any>> = payload => ({
  type: types.START_CLOCK,
  payload
});

const tickClock: ActionCreator<ClockAction<any>> = payload => ({
  type: types.TICK_CLOCK,
  payload
});

export { startClock, tickClock };
