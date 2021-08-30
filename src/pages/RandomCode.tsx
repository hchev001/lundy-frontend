import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { selectors, SubmitSurvey } from "../store/modules/Events";

export const RandomCode: React.FC = () => {
  const survey = useSelector(selectors.survey);
  const [surveyId, setSurveyId] = useState("");
  const surveyStarted = useSelector(selectors.surveyStarted);

  // useEffect(() => {
  //   SubmitSurvey(survey, surveyStarted)
  //     .then((r) => {
  //       setSurveyId(r.data.data.surveyId);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);
  return (
    <FullLayout>
      <div>
        <span className="text-2xl">Survey Code</span>
      </div>

      <div className="w-full flex justify-center">
        <span className="text-lg my-4">{surveyId}</span>
      </div>
      <div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          aliquam ultrices ante. Nulla vel est malesuada, luctus dui ut, dapibus
          felis. Vestibulum accumsan, nisi eu tempus vestibulum, sapien nulla
          consequat massa, auctor egestas ligula ipsum at justo. Nulla accumsan
        </span>
      </div>

      <div>
        <Button onClick={() => window.close()} text="Close"/ >
      </div>
    </FullLayout>
  );
};
