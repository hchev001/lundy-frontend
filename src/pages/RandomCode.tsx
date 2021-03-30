import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullLayout } from "../layout/FullLayout";
import { selectors, SubmitSurvey } from "../store/modules/Events";

export const RandomCode: React.FC = () => {
  const dispatch = useDispatch();
  const survey = useSelector(selectors.survey);
  const [surveyId, setSurveyId] = useState("");
  useEffect(() => {
    SubmitSurvey(survey)
      .then((r) => {
        console.log(r.data);
        setSurveyId(r.data.data.surveyId);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <FullLayout>
      <div>
        <span className="text-2xl">Survey Code</span>
      </div>
      <div>
        <span className="text-lg">{surveyId}</span>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => window.close()}
        >
          Close
        </button>
      </div>
    </FullLayout>
  );
};
