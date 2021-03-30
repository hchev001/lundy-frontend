import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { FullLayout } from "../layout/FullLayout";
import { selectors, SubmitSurvey } from "../store/modules/Events";

export const RandomCode: React.FC = () => {
  const survey = useSelector(selectors.survey);
  const [surveyId, setSurveyId] = useState("");
  useEffect(() => {
    SubmitSurvey(survey)
      .then((r) => {
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
        <Button onClick={() => window.close()}>Close</Button>
      </div>
    </FullLayout>
  );
};
