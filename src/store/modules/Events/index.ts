import { Draft } from "@reduxjs/toolkit";
import produce from "immer";
import { Reducer } from "redux";
import axios from "axios";
import { ApplicationState } from "../..";

export interface EventState {
  numberOfClicks: number;
  surveyId: string | undefined;
  
  menu1_Timer: number;
  menu2_Timer: number;
  menu3_Timer: number;
  
  messagePage1_Timer: number;
  messagePage2_Timer: number;
  messagePage3_Timer: number;
  
  noneTimer: number;
  filter1_Timer: number;
  filter2_Timer: number;
  filter3_Timer: number;
  
  filterNoHat_Timer: number;
  filterHat1_Timer: 0;
  filterHat2_Timer:0;
  
  touchCountMenu1: number;
  touchCountMenu2: number;
  touchCountMenu3: number;
  
  timeSpent: number;
  eventName: string;

  touchCount: number;
  touchCountNoFilter: number;
  touchCountFilter1: number;
  touchCountFilter2: number;
  touchCountFilter3: number;

  touchCountNoHat: number;
  touchCountHat1: number;
  touchCountHat2: number;
  


  eventDuration: number;
  startTime: number;
  endTime: number;
  menuOpen: boolean;
  surveyStarted: boolean;
}

const initialState: EventState = {
  numberOfClicks: 0,
  timeSpent: 0,
  
  menu1_Timer: 0,
  menu2_Timer: 0,
  menu3_Timer: 0,
 
  messagePage1_Timer: 0,
  messagePage2_Timer: 0,
  messagePage3_Timer: 0,
  
  noneTimer: 0, //noneTimer
  filter1_Timer: 0, //filter1_Timer
  filter2_Timer: 0, //filter2_Timer
  filter3_Timer: 0, //filter3_Timer
  
  filterNoHat_Timer: 0, 
  filterHat1_Timer: 0,
  filterHat2_Timer: 0, 
  
  touchCountMenu1: 0, //touchCountMenu1
  touchCountMenu2: 0, //touchCountMenu2
  touchCountMenu3: 0, //touchCountMenu3
  
  touchCount: 0, //touchCount total?????
  touchCountNoFilter: 0, //touchCountFilter1
  touchCountFilter1: 0, //touchCountFilter2
  touchCountFilter2: 0, //touchCountFilter3
  touchCountFilter3: 0, //touchCountNoFilter
  
  touchCountNoHat: 0, //touchCountMole1
  touchCountHat1: 0, //touchCountMole2
  touchCountHat2: 0, //touchCountMole3
  
  eventName: "",
  eventDuration: -1,
  startTime: 0,
  endTime: 0,
  surveyId: "",
  menuOpen: false,
  surveyStarted: false,
};

export enum Transitions {
  START_SURVEY = "start_survey",
  VISIT_PAGE = "visit_page",
  LEAVE_PAGE = "leave_page",

  VIEW_MESSAGE_1_PAGE = "view_message_1_page",
  VIEW_MESSAGE_12_PAGE = "view_message_1-2_page",
  VIEW_MESSAGE_13_PAGE = "view_message_1-3_page",
  VIEW_MESSAGE_14_PAGE = "view_message_1-4_page",

  VIEW_MESSAGE_2_PAGE = "view_message_2_page", // first set of filters 
  
  VIEW_MESSAGE_3_PAGE = "view_message_3_page",
  VIEW_MESSAGE_32_PAGE = "view_message_3-2_page",
  VIEW_MESSAGE_33_PAGE = "view_message_3-3_page",
  VIEW_MESSAGE_34_PAGE = "view_message_3-4_page",

  VIEW_MESSAGE_4_PAGE = "view_message_4_page", // second set of filters

  VIEW_MESSAGE_5_PAGE = "view_message_5_page", // last page before code page

  VIEW_CONSENT_FORM = "view_consent_form",
  
  CLICK_CONSENT_FORM = "clickConsentForm",
  CLICK_WHAT_IS_AR = "clickWhatIsAR",
  CLICK_CONTACT_US = "clickContactUs",
  
  CLICK_NO_HAT = "touchCountNoHat",
  CLICK_HAT_1 = "touchCountHat1",
  CLICK_HAT_2 = "touchCountHat",

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
        draft.surveyStarted = true;
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
      case Transitions.CLICK_NO_HAT:
        draft.touchCountNoHat += 1;
        break;
      case Transitions.CLICK_HAT_1:
        draft.touchCountHat1 += 1;
        break;
      case Transitions.CLICK_HAT_2:
        draft.touchCountHat2 += 1;
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
  startSurvey: (): Action => ({
    type: Transitions.START_SURVEY,
  }),
};

export const selectors = {
  survey: (state: ApplicationState) => {
    const { events } = state;
    return {
      
      numberOfClicks: events.numberOfClicks,
      surveyId: events.surveyId,

      menu1_Timer: events.menu1_Timer, //whatis AR
      menu2_Timer: events.menu2_Timer, // cosnent form
      menu3_Timer: events.menu3_Timer, // contact us timer
      
      messagePage1Timer: events.messagePage1_Timer,
      messagePage2Timer: events.messagePage2_Timer,
      messagePage3Timer: events.messagePage3_Timer,
      
      noneTimer: events.noneTimer,
      filter1_Timer: events.filter1_Timer,
      filter2_Timer: events.filter2_Timer,
      filter3_Timer: events.filter3_Timer,

      filterNoHat_Timer: events.filterNoHat_Timer,
      filter1Hat_Timer: events.filterHat1_Timer,
      filter2Hat_Timer: events.filterHat2_Timer,
      
      touchCountMenu1: events.touchCountMenu1,
      touchCountMenu2: events.touchCountMenu2,
      touchCountMenu3: events.touchCountMenu3,
      
      timeSpent: events.timeSpent,
      eventName: events.eventName,

      touchCount: events.touchCount,
      touchCountNoFilter: events.touchCountNoFilter,
      touchCountFilter1: events.touchCountFilter1,
      touchCountFilter2: events.touchCountFilter2,
      touchCountFilter3: events.touchCountFilter3,
      
      touchCountNoHat: events.touchCountNoHat,
      touchCountHat1: events.touchCountHat1,
      touchCountHat2: events.touchCountHat2
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
  numberOfClicks: number;
  timeSpent: number;
  
  menu1_Timer: number;
  menu2_Timer: number;
  menu3_Timer: number;

  messagePage1_Timer: number;
  messagePage2_Timer: number;
  messagePage3_Timer: number;
  
  noneTimer: number;
  filter1_Timer: number;
  filter2_Timer: number;
  filter3_Timer: number;
 
  filterNoHat_Timer: number;
  filter1Hat_Timer: number;
  filter2Hat_Timer: number;

  touchCountMenu1: number;
  touchCountMenu2: number;
  touchCountMenu3: number;
  
  touchCount: number;
  touchCountNoFilter: number;
  touchCountFilter1: number;
  touchCountFilter2: number;
  touchCountFilter3: number;

  touchCountNoHat: number;
  touchCountHat1: number;
  touchCountHat2: number;
}

export const SubmitSurvey = (
  survey: SurveySubmission,
  surveyStarted: boolean
): Promise<any> => {
  if (!surveyStarted) {
    return Promise.reject({
      code: 400,
      message: "No survey analytics detected.",
    });
  }
  return axios({
    method: "post",
    url: "https://sun-spot.org/experiments",
    data: { ...survey },
  });
};

export default EventReducer;
