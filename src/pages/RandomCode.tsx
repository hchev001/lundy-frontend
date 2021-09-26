import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { FullLayout } from "../layout/FullLayout";
import { selectors, SubmitSurvey } from "../store/modules/Events";
import { actions } from "../store/modules/Events";

export const RandomCode: React.FC = () => {
  const store = useStore();

  const [surveyId, setSurveyId] = useState("");
  const surveyStarted = useSelector(selectors.surveyStarted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.click());
    const survey = selectors.survey(store.getState());
    SubmitSurvey(survey, surveyStarted)
      .then((r) => {
        setSurveyId(r.data.data.surveyId);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <FullLayout>
      <div className="container p-8" >
        <div className="w-full text-center text-3xl">Thank you!</div>
        <div className="w-full text-center text-3xl">Your assigned ID is:</div>
        <div className="py-4 text-3xl text-teal-700 font-bold w-full text-center">
          {surveyId}
        </div>

        <div className="my-2 text-2xl text-red-500 font-bold w-full text-center">
          Please write this ID on a sheet of paper.
        </div>
        <div className="my-2 text-2xl text-red-500 font-bold w-full text-center">
          Then go back to the survey page and input the ID.
        </div>

        <div className="my-2">
          NOTE: To complete this study and receive your rewards, please be sure to record the correct ID
          and type it in the follow up survey.  DO NOT close this tab unless you have the ID. Thank you.
        </div>
      </div>
    </FullLayout>
  );
};
