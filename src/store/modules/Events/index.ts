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
  filterHat2_Timer: 0;

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

  messagePage1_2_Timer: number;
  messagePage1_3_Timer: number;
  messagePage1_4_Timer: number;
  messagePage3_2_Timer: number;
  messagePage3_3_Timer: number;
  messagePage3_4_Timer: number;
  messagePage4_Timer: number;
  messagePage5_Timer: number;
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

  messagePage1_2_Timer: 0,
  messagePage1_3_Timer: 0,
  messagePage1_4_Timer: 0,
  messagePage3_2_Timer: 0,
  messagePage3_3_Timer: 0,
  messagePage3_4_Timer: 0,
  messagePage4_Timer: 0,
  messagePage5_Timer: 0,

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

  INCREMENT_TOTAL_CLICKS = "incrementTotalClicks",

  OPEN_MENU = "openMenu",
  CLOSE_MENU = "closeMenu",
  TOGGLE_MENU = "toggleMenu",
}

export enum PageNames {
  MESSAGE_1_PAGE = "messagePage1_Timer",
  MESSAGE_1_2_PAGE = "messagePage1_2_Timer",
  MESSAGE_1_3_PAGE = "messagePage1_3_Timer",
  MESSAGE_1_4_PAGE = "messagePage1_4_Timer",
  MESSAGE_2_PAGE = "messagePage2_Timer",
  MESSAGE_3_PAGE = "messagePage3_Timer",
  MESSAGE_3_2_PAGE = "messagePage3_2_Timer",
  MESSAGE_3_3_PAGE = "messagePage3_3_Timer",
  MESSAGE_3_4_PAGE = "messagePage3_4_Timer",
  MESSAGE_4_PAGE = "messagePage4_Timer",
  MESSAGE_5_PAGE = "messagePage5_Timer",
  OLD_1_FILTER = "filter1_Timer",
  OLD_2_FILTER = "filter2_Timer",
  OLD_3_FILTER = "filter3_Timer",
  NO_OLD_FILTER = "noneTimer",
  NO_HAT_FILTER = "filterNoHat_Timer",
  HAT_1_FILTER = "filterHat1_Timer",
  HAT_2_FILTER = "filterHat2_Timer",
  CONSENT_FORM = "menu2_Timer",
  AR_PAGE = "menu1_Timer",
  CONTACT_US_PAGE = "menu3_Timer",
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
      case Transitions.INCREMENT_TOTAL_CLICKS:
        draft.numberOfClicks += 1;
        break;
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
        console.log('VISIT PAGE ', action.time.getTime())
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
      case Transitions.VIEW_MESSAGE_12_PAGE:
      case Transitions.VIEW_MESSAGE_13_PAGE:
      case Transitions.VIEW_MESSAGE_14_PAGE:
      case Transitions.VIEW_MESSAGE_32_PAGE:
      case Transitions.VIEW_MESSAGE_33_PAGE:
      case Transitions.VIEW_MESSAGE_34_PAGE:
      case Transitions.VIEW_MESSAGE_4_PAGE:
      case Transitions.VIEW_MESSAGE_5_PAGE:
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
      case "SET_AGE_FILTER_TIMES":
        //@ts-ignore
        draft.noneTimer = action?.times?.filter_0 / 1000;
        //@ts-ignore
        draft.filter1_Timer = action?.times?.filter_1 / 1000;
        //@ts-ignore
        draft.filter2_Timer = action?.times?.filter_2 / 1000;
        //@ts-ignore
        draft.filter3_Timer = action?.times?.filter_3 / 1000;
        break;
      case "SET_HAT_FILTER_TIMES":
        //@ts-ignore
        draft.filterNoHat_Timer = action?.times?.filter_0 / 1000;
        //@ts-ignore
        draft.filterHat1_Timer = action?.times?.filter_1 / 1000;
        //@ts-ignore
        draft.filterHat2_Timer = action?.times?.filter_2 / 1000;
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
  setAgeFilterTimes: (times:any): any => ({
    type: "SET_AGE_FILTER_TIMES",
    times: times
  }),
  setHatFilterTimes: (times:any):any => ({
    type: "SET_HAT_FILTER_TIMES",
    times: times
  }),
  clickLink: (linkName: Transitions): Action => ({
    type: linkName,
  }),
  click: (): Action => ({
    type: Transitions.INCREMENT_TOTAL_CLICKS,
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
      total_clicks: events.numberOfClicks,
      surveyId: events.surveyId,

      menu1_Timer: events.menu1_Timer, //whatis AR
      menu2_Timer: events.menu2_Timer, // cosnent form
      menu3_Timer: events.menu3_Timer, // contact us timer

      messagePage1_Timer: events.messagePage1_Timer,
      messagePage2_Timer: events.messagePage2_Timer,
      messagePage3_Timer: events.messagePage3_Timer,

      noneTimer: events.noneTimer,
      filter1_Timer: events.filter1_Timer,
      filter2_Timer: events.filter2_Timer,
      filter3_Timer: events.filter3_Timer,

      filterNoHat_Timer: events.filterNoHat_Timer,
      filterHat1_Timer: events.filterHat1_Timer,
      filterHat2_Timer: events.filterHat2_Timer,

      touchCountMenu1: events.touchCountMenu1,
      touchCountMenu2: events.touchCountMenu2,
      touchCountMenu3: events.touchCountMenu3,

      touchCountNoFilter: events.touchCountNoFilter,
      touchCountFilter1: events.touchCountFilter1,
      touchCountFilter2: events.touchCountFilter2,
      touchCountFilter3: events.touchCountFilter3,

      touchCountNoHat: events.touchCountNoHat,
      touchCountHat1: events.touchCountHat1,
      touchCountHat2: events.touchCountHat2,

      // extra fields
      messagePage1_2_Timer: events.messagePage1_2_Timer,
      messagePage1_3_Timer: events.messagePage1_3_Timer,
      messagePage1_4_Timer: events.messagePage1_4_Timer,
      messagePage3_2_Timer: events.messagePage3_2_Timer,
      messagePage3_3_Timer: events.messagePage3_3_Timer,
      messagePage3_4_Timer: events.messagePage3_4_Timer,
      messagePage4_Timer: events.messagePage4_Timer,
      messagePage5_Timer: events.messagePage5_Timer,

      total_time: events.menu1_Timer + events.menu2_Timer + events.menu3_Timer + events.messagePage1_Timer + events.messagePage2_Timer + events.messagePage3_Timer + events.messagePage1_2_Timer + events.messagePage1_4_Timer + events.messagePage1_3_Timer + events.messagePage3_2_Timer + events.messagePage3_3_Timer + events.messagePage3_4_Timer + events.messagePage4_Timer + events.messagePage5_Timer,
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



export const SubmitSurvey = (
  survey: any,
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
