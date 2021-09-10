import { ContactUs } from "../pages/ContactUs";
import { Disclaimer } from "../pages/Disclaimer";
import { Survey1 } from "../pages/Survey1";
import { Survey2 } from "../pages/Survey2";
import { Survey31 } from "../pages/Survey3";
import { Survey4 } from "../pages/Survey4";
import { Survey5 } from "../pages/Survey5";
import { RandomCode } from "../pages/RandomCode";
import { WhatIsAR } from "../pages/WhatIsAr";
import { ConsentForm } from "../pages/ConsentForm";
import { Survey12 } from "../pages/Survey1-2";
import { Survey13 } from "../pages/Survey1-3";
import { Survey32 } from "../pages/Survey3-2";
import { Survey33 } from "../pages/Survey3-3";
import { Survey34 } from "../pages/Survey3-4";
import { Survey14 } from "../pages/Survey1-4";


export const IndexRoutes = [
  { path: "/consent-form", name: "Consent Form", component: ConsentForm },
  { path: "/what-is-ar", name: "What is AR?", component: WhatIsAR },
  { path: "/contact-us", name: "Contact Us", component: ContactUs },
  { path: "/survey/1", component: Survey1 },
  { path: "/survey/1-2", component: Survey12},
  { path: "/survey/1-3", component: Survey13},
  { path: "/survey/1-4", component: Survey14},
  { path: "/survey/2", component: Survey2 },
  { path: "/survey/3", component: Survey31 },
  { path: "/survey/3-2", component: Survey32 },
  { path: "/survey/3-3", component: Survey33 },
  { path: "/survey/3-4", component: Survey34 },
  { path: "/survey/4", component: Survey4 },
  { path: "/survey/5", component: Survey5 },
  { path: "/survey/6", component: RandomCode },
  { path: "/survey/", component: Survey1 },
  { path: "/", name: "Disclaimer", component: Disclaimer },
];
