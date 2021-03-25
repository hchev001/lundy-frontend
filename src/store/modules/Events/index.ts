import { Draft } from "@reduxjs/toolkit";
import produce from "immer";
import { Reducer } from "redux";

export interface EventState {
  surveyId: string | undefined;
  eventName: string;
  eventDuration: number;
  old1FilterViewed: boolean;
  old1Time: number;
  old2FilterViewed: boolean;
  old2Time: number;
  old3FilterViewed: boolean;
  old3Time: number;
  mole1FilterViewed: boolean;
  mole1Time: number;
  mole2FilterViewed: boolean;
  mole2Time: number;
  mole3FilterViewed: boolean;
  mole3Time: number;
  messagePage1Timer: number;
  messagePage2Timer: number;
  messagePage3Timer: number;
  startTime: number;
  endTime: number;
}

const initialState: EventState = {
  eventName: "",
  eventDuration: -1,
  old1FilterViewed: false,
  old2FilterViewed: false,
  old3FilterViewed: false,
  mole1FilterViewed: false,
  mole2FilterViewed: false,
  mole3FilterViewed: false,
  old1Time: 0,
  old2Time: 0,
  old3Time: 0,
  mole1Time: 0,
  mole2Time: 0,
  mole3Time: 0,
  startTime: 0,
  messagePage1Timer: 0,
  messagePage2Timer: 0,
  messagePage3Timer: 0,
  endTime: 0,
  surveyId: "",
};

export enum Transitions {
  START_SURVEY = "start_survey",
  VISIT_PAGE = "visit_page",
  LEAVE_PAGE = "leave_page",
  VIEW_MESSAGE_1_PAGE = "view_message_1_page",
  VIEW_MESSAGE_2_PAGE = "view_message_2_page",
  VIEW_MESSAGE_3_PAGE = "view_message_3_page",
}

type Action = {
  type: string;
  time?: Date;
  pageTimerIndex?: string;
  surveyId?: string;
};

const EventReducer: Reducer<EventState, Action> = produce(
  (draft: Draft<EventState>, action: Action) => {
    switch (action.type) {
      case Transitions.START_SURVEY:
        draft.surveyId = action.surveyId;
        break;
      case Transitions.VISIT_PAGE:
        console.log(action);
        draft.startTime = action?.time?.getTime() || -1;
        break;
      case Transitions.LEAVE_PAGE:
        //@ts-ignore
        draft[action.pageTimerIndex] = action.time.getTime() - draft.startTime;
        draft.startTime = 0;
        break;
      case Transitions.VIEW_MESSAGE_1_PAGE:
      case Transitions.VIEW_MESSAGE_2_PAGE:
      case Transitions.VIEW_MESSAGE_3_PAGE:
        draft.startTime = action?.time?.getTime() || -1;
        break;
      case "VIEW_OLD_1_FILTER":
        draft.old1FilterViewed = true;
        break;
      case "VIEW_OLD_2_FILTER":
        draft.old2FilterViewed = true;
        break;
      case "VIEW_OLD_3_FILTER":
        draft.old3FilterViewed = true;
        break;
      case "VIEW_MOLE_1_FILTER":
        draft.mole1FilterViewed = true;
        break;
      case "VIEW_MOLE_2_FILTER":
        draft.mole2FilterViewed = true;
        break;
      case "VIEW_MOLE_3_FILTER":
        draft.mole3FilterViewed = true;
        break;
    }
  },
  initialState
);

export const actions = {
  visitPage: (currentDate: Date): Action => ({
    type: Transitions.VISIT_PAGE,
    time: currentDate,
  }),
  leavePage: (pageName: string, currentDate: Date): Action => ({
    type: Transitions.LEAVE_PAGE,
    pageTimerIndex: pageName,
    time: currentDate,
  }),
  setID: (id: string): Action => ({
    type: "START_SURVEY",
    surveyId: id,
  }),
};

export const selectors = {
  survey: (state: EventState) => ({
    old1Time: state.old1Time,
    old2Time: state.old2Time,
    old3Time: state.old3Time,
    mole1Time: state.mole1Time,
    mole2Time: state.mole2Time,
    mole3Time: state.mole3Time,
    messagePage1Timer: state.messagePage1Timer,
    messagePage2Timer: state.messagePage2Timer,
    messagePage3Timer: state.messagePage3Timer,
  }),
};

export default EventReducer;
