import { Draft } from "@reduxjs/toolkit";
import produce from "immer";
import { Reducer } from "redux";
import axios from "axios";
import { ApplicationState } from "../..";

export interface EventState {
  surveyId: string | undefined;
  eventName: string;
  eventDuration: number;
  old1Time: number;
  old2Time: number;
  old3Time: number;
  mole1Time: number;
  mole2Time: number;
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
  menuOpen: boolean;
  surveyStarted: boolean;
}

const initialState: EventState = {
  eventName: "",
  eventDuration: -1,
  noOldTime: 0, //noneTimer
  old1Time: 0, //filter1_Timer
  old2Time: 0, //filter2_Timer
  old3Time: 0, //filter3_Timer
  noMoleTime: 0, //noneTimer or noneMoleTimer
  mole1Time: 0, //filter1Mole_Timer
  mole2Time: 0, //filter2Mole_Timer
  mole3Time: 0, //filter3Mole_Timer
  startTime: 0,
  messagePage1Timer: 0, //messagePage1_Timer
  messagePage2Timer: 0, //messagePage2_Timer
  messagePage3Timer: 0, //messagePage3_Timer
  contactUsTimer: 0, //menu3_Timer
  whatIsARTimer: 0, //menu1_Timer
  consentFormTimer: 0, //menu2_Timer
  endTime: 0,
  surveyId: "",
  touchCountMenu1: 0, //touchCountMenu1
  touchCountMenu2: 0, //touchCountMenu2
  touchCountMenu3: 0, //touchCountMenu3
  touchCount: 0, //touchCount total?????
  touchCountFilter1: 0, //touchCountFilter1
  touchCountFilter2: 0, //touchCountFilter2
  touchCountFilter3: 0, //touchCountFilter3
  touchCountNoFilter: 0, //touchCountNoFilter
  touchCountMole1: 0, //touchCountMole1
  touchCountMole2: 0, //touchCountMole2
  touchCountMole3: 0, //touchCountMole3
  touchCountNoMole: 0, //touchCountMoleNoFilter,
  menuOpen: false,
  surveyStarted: false,
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

  OPEN_MENU = "openMenu",
  CLOSE_MENU = "closeMenu",
  TOGGLE_MENU = "toggleMenu",
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
      case Transitions.TOGGLE_MENU:
        draft.menuOpen = !draft.menuOpen;
        break;
      case Transitions.OPEN_MENU:
        draft.menuOpen = true;
        break;
      case Transitions.CLOSE_MENU:
        draft.menuOpen = false;
        break;
      case Transitions.START_SURVEY:
        draft.surveyId = action.surveyId;
        break;
      case Transitions.VISIT_PAGE:
        draft.startTime = action?.time?.getTime() || -1;

        break;
      case Transitions.LEAVE_PAGE:
        //@ts-ignore
        draft[action.pageTimerIndex] +=
          //@ts-ignore
          (action.time.getTime() - draft.startTime) / 1000;
        draft.startTime = 0;
        if (action.pageTimerIndex === PageNames.CONSENT_FORM) {
          draft.surveyStarted = true;
        }
        break;
      case Transitions.VIEW_MESSAGE_1_PAGE:
      case Transitions.VIEW_MESSAGE_2_PAGE:
      case Transitions.VIEW_MESSAGE_3_PAGE:
        draft.startTime = action?.time?.getTime() || -1;
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
  toggleMenu: (): Action => ({
    type: Transitions.TOGGLE_MENU,
  }),
  hideMenu: (): Action => ({
    type: Transitions.CLOSE_MENU,
  }),
};

export const selectors = {
  survey: (state: ApplicationState) => {
    const { events } = state;
    return {
      noneTimer: events.noOldTime,
      filter1_Timer: events.old1Time,
      filter2_Timer: events.old2Time,
      filter3_Timer: events.old3Time,
      filter1Hat_Timer: events.mole1Time,
      filter2Hat_Timer: events.mole2Time,
      filter3Mole_Timer: events.mole3Time,
      messagePage1Timer: events.messagePage1Timer,
      messagePage2Timer: events.messagePage2Timer,
      messagePage3Timer: events.messagePage3Timer,
      menu1_Timer: events.whatIsARTimer,
      menu2_Timer: events.consentFormTimer,
      menu3_Timer: events.contactUsTimer,
      touchCountMenu1: events.touchCountMenu1,
      touchCountMenu2: events.touchCountMenu2,
      touchCountMenu3: events.touchCountMenu3,
      touchCount: events.touchCount,
      touchCountFilter1: events.touchCountFilter1,
      touchCountFilter2: events.touchCountFilter2,
      touchCountFilter3: events.touchCountFilter3,
      touchCountNoFilter: events.touchCountNoFilter,
      touchCountMole1: events.touchCountMole1,
      touchCountMole2: events.touchCountMole2,
      touchCountMole3: events.touchCountMole3,
      touchCountNoMole: events.touchCountNoMole,
    };
  },
  isMenuOpen: (state: ApplicationState) => {
    const { events } = state;
    return events.menuOpen;
  },
  surveyStarted: (state: ApplicationState) => {
    return state.events.surveyStarted;
  },
};

interface SurveySubmission {
  noneTimer: number;
  filter1_Timer: number;
  filter2_Timer: number;
  filter3_Timer: number;
  filter1Hat_Timer: number;
  filter2Hat_Timer: number;
  filter3Mole_Timer: number;
  messagePage1Timer: number;
  messagePage2Timer: number;
  messagePage3Timer: number;
  menu1_Timer: number;
  menu2_Timer: number;
  menu3_Timer: number;
  touchCountMenu1: number;
  touchCountMenu2: number;
  touchCountMenu3: number;
  touchCount: number;
  touchCountFilter1: number;
  touchCountFilter2: number;
  touchCountFilter3: number;
  touchCountNoFilter: number;
  touchCountMole1: number;
  touchCountMole2: number;
  touchCountMole3: number;
  touchCountNoMole: number;
}

export const SubmitSurvey = (survey: SurveySubmission): Promise<any> => {
  if (survey.filter1Hat_Timer <= 0 || survey.filter1_Timer <= 0) {
    return Promise.reject({
      code: 400,
      message: "No survey analytics detected.",
    });
  }
  return axios({
    method: "post",
    url: "http://167.71.95.235/experiments",
    data: { ...survey },
  });
};

export default EventReducer;
