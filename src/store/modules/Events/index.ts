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
  contactUsTimer: number;
  whatIsARTimer: number;
  consentFormTimer: number;
  noOldTime: number;
  noMoleTime: number;
  touchCountMenu1: number;
  touchCountMenu2: number;
  touchCountMenu3: number;
  touchCount: number;
  touchCountNoFilter: number;
  touchCountFilter1: number;
  touchCountFilter2: number;
  touchCountFilter3: number;
  touchCountMole1: number;
  touchCountMole2: number;
  touchCountMole3: number;
  touchCountNoMole: number;
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
  noOldTime: 0,
  old1Time: 0,
  old2Time: 0,
  old3Time: 0,
  noMoleTime: 0,
  mole1Time: 0,
  mole2Time: 0,
  mole3Time: 0,
  startTime: 0,
  messagePage1Timer: 0,
  messagePage2Timer: 0,
  messagePage3Timer: 0,
  contactUsTimer: 0,
  whatIsARTimer: 0,
  consentFormTimer: 0,
  endTime: 0,
  surveyId: "",
  touchCountMenu1: 0,
  touchCountMenu2: 0,
  touchCountMenu3: 0,
  touchCount: 0,
  touchCountFilter1: 0,
  touchCountFilter2: 0,
  touchCountFilter3: 0,
  touchCountNoFilter: 0,
  touchCountMole1: 0,
  touchCountMole2: 0,
  touchCountMole3: 0,
  touchCountNoMole: 0,
};

export enum Transitions {
  START_SURVEY = "start_survey",
  VISIT_PAGE = "visit_page",
  LEAVE_PAGE = "leave_page",

  VIEW_MESSAGE_1_PAGE = "view_message_1_page",
  VIEW_MESSAGE_2_PAGE = "view_message_2_page",
  VIEW_MESSAGE_3_PAGE = "view_message_3_page",
  VIEW_CONSENT_FORM = "view_consent_form",
  NO_OLD_FILTER = "noOldTime",
  CLICK_CONSENT_FORM = "clickConsentForm",
  CLICK_WHAT_IS_AR = "clickWhatIsAR",
  CLICK_CONTACT_US = "clickContactUs",
  CLICK_NO_MOLE_FILTER = "touchCountNoMole",
  CLICK_MOLE_1 = "touchCountMole1",
  CLICK_MOLE_2 = "touchCountMole2",
  CLICK_MOLE_3 = "touchCountMole3",
  CLICK_NO_OLD_FILTER = "touchCountNoFilter",
  CLICK_FILTER_1 = "touchCountFilter1",
  CLICK_FILTER_2 = "touchCountFilter2",
  CLICK_FILTER_3 = "touchCountFilter3",
  INCREMENT_TOUCH_COUNT = "touchCount",
}

export enum PageNames {
  MESSAGE_1_PAGE = "messagePage1Timer",
  MESSAGE_2_PAGE = "messagePage2Timer",
  MESSAGE_3_PAGE = "messagePage3Timer",
  OLD_1_FILTER = "old1Time",
  OLD_2_FILTER = "old2Time",
  OLD_3_FILTER = "old3Time",
  NO_OLD_FILTER = "noOldTime",
  NO_MOLE_FILTER = "noMoleTime",
  MOLE_1_FILTER = "mole1Time",
  MOLE_2_FILTER = "mole2Time",
  MOLE_3_FILTER = "mole3Time",
  CONSENT_FORM = "consentFormTimer",
  AR_PAGE = "whatIsARTimer",
  CONTACT_US_PAGE = "contactUsTimer",
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
        draft[action.pageTimerIndex] += action.time.getTime() - draft.startTime;
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
      case Transitions.CLICK_CONSENT_FORM:
        draft.touchCountMenu2 += 1;
        break;
      case Transitions.CLICK_WHAT_IS_AR:
        draft.touchCountMenu1 += 1;
        break;
      case Transitions.CLICK_CONTACT_US:
        draft.touchCountMenu3 += 1;
        break;
      case Transitions.CLICK_NO_MOLE_FILTER:
        draft.touchCountNoMole += 1;
        break;
      case Transitions.CLICK_MOLE_1:
        draft.touchCountMole1 += 1;
        break;
      case Transitions.CLICK_MOLE_2:
        draft.touchCountMole2 += 1;
        break;
      case Transitions.CLICK_MOLE_3:
        draft.touchCountMole3 += 1;
        break;
      case Transitions.CLICK_NO_OLD_FILTER:
        draft.touchCountNoFilter += 1;
        break;
      case Transitions.CLICK_FILTER_1:
        draft.touchCountFilter1 += 1;
        break;
      case Transitions.CLICK_FILTER_2:
        draft.touchCountFilter2 += 1;
        break;
      case Transitions.CLICK_FILTER_3:
        draft.touchCountFilter3 += 1;
        break;
      case Transitions.INCREMENT_TOUCH_COUNT:
        draft.touchCount += 1;
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
  clickLink: (linkName: Transitions): Action => ({
    type: linkName,
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
