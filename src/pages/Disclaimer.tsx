import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";

interface BaseProps {
  history: any;
  location: any;
  match: any;
}
export const Disclaimer = (props: BaseProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);

  // Controls whether to monitor how time is spent viewing the consent form when there is a previous path
  // on the location object
  useEffect(() => {
    if (props.location.state?.from) {
      dispatch(actions.visitPage(new Date()));
    }
    return () => {
      if (props.location.state?.from) {
        dispatch(actions.leavePage(PageNames.CONSENT_FORM, new Date()));
      }
    };
  });

  return (
    <FullLayout>
      <div className="w-full flex justify-center">
        <h1 className="text-2xl">Consent Form</h1>
      </div>
      <div className="text-base">
        <p>
          Purpose & Procedures: You are invited to take part in a research
          study. Doing so is voluntary. The purpose of this research is to test
          and to evaluate the effectiveness of a website which is designed to
          provide an interactive experience for the users. The study will take
          about 20 to 25 minutes to finish. You will be asked to thoroughly
          interact with the website and its features. Then, you will be asked to
          complete a brief survey on your perceptions regarding your experience.
        </p>
        <p>
          Requirements: You must be at least 18 years old to participate in the
          study. Risks: Taking part in the study involves no risks and
          discomfort that are no greater than those ordinarily encountered in
          daily life or during other online activities.
        </p>
        <p>
          Benefits: No direct benefit can be promised to you for being in this
          study.
        </p>
        <p>
          Compensation: You will receive extra credits for your participation.
        </p>
        <p>
          Voluntary Participation: Your participation in this study is
          voluntary.
        </p>
        <p>
          You do not have to be in this study if you do not want to, and you can
          leave the study at any time. You will not lose any services, benefits,
          or rights you would normally have if you chose not to be in the study
          or if you leave the study early. Confidentiality: No personally
          identifying information will be stored. All electronic files
          containing identifiable information will be password-protected. Only
          the members of the research staff will have access to the passwords.
          You may choose to withdraw your data at the end of the survey when the
          information is revealed. At the end of this study, the researchers may
          publish their findings. Information will be presented in summary
          format and you will not be identified in any publications or
          presentations.
        </p>
        <p>
          Contact: If you have any questions or concerns about the research,
          please contact Ms. Di Lun at (305) 284-8605 or dxl744@miami.edu. If
          you have questions regarding your rights as a research participant,
          contact the University of Miami, Human Subject Research Office at
          hsro@med.miami.edu or 305-243-3195.
        </p>
      </div>
      <div>
        <span>
          By clicking “next”, you confirm that you are 18 years old or older,
          you have read and understood the instructions above, and that you are
          willing to participate in this study.
        </span>
      </div>
      <div>
        <Button
          onClick={() => history.push("/survey/1")}
          validationMessage="CLick to continue"
          hidden={isValid}
        >
          Next
        </Button>
      </div>
    </FullLayout>
  );
};
