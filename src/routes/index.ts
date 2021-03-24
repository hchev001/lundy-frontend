import { ContactUs } from "../pages/ContactUs";
import { Disclaimer } from "../pages/Disclaimer";
import { WhatIsAR } from "../pages/WhatIsAr";

export const IndexRoutes = [
  { path: "/consent-form", name: "Consent Form", component: Disclaimer },
  { path: "/what-is-ar", name: "What is AR?", component: WhatIsAR },
  { path: "/contact-us", name: "Contact Us", component: ContactUs },
  { path: "/", name: "Disclaimer", component: Disclaimer },
];
