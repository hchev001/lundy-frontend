import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../components/index";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";
import BeachCoursel from "../common/assets/beach_carousel.png";
import styled from "styled-components";

const BgAsset = styled.div`
  background-image: url(${BeachCoursel});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right 78%;
  background-size: auto 100px;
`;

interface BaseProps {
  history: any;
  location: any;
  match: any;
}
export const ConsentForm = (props: BaseProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);

  // Controls whether to monitor how time is spent viewing the consent form when there is a previous path
  // on the location object
  useEffect(() => {
    if (props.location.state?.from) {
      dispatch(actions.visitPage(new Date()));
    }

    // when page mounts we indicate that the survey gets started, if they visit the conset form from menu, the same applies
    dispatch(actions.startSurvey());
    return () => {
      if (props.location.state?.from) {
        dispatch(actions.leavePage(PageNames.CONSENT_FORM, new Date()));
      }
    };
  }, []);

  const handleGoBack = () => {
    dispatch(actions.click());
    history.goBack();
  };

  return (
    <FullLayout>
      <BgAsset className="p-8">
        <div className="w-full flex flex-col justify-center items-center text-center mb-5 font-serif">
          <h3 className="text-base">University of Miami</h3>
          <h4 className="text-base font-bold my-1 uppercase">
            Consent to participate in a research study
          </h4>
          <h4 className="text-base">The Sunspot</h4>
        </div>
        <div className="mb-3">
          <p className="font-bold text-sm">
            The following information describes the research study in which you
            are being asked to participate. Please read this carefully. At the
            end, you will be asked if you agree to take part in this research
            study.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Purpose: </span> You are invited to take
            part in a research study. Doing so is voluntary. The purpose of this
            research is to test and learn about a website application, SunSpot,
            which is designed to provide an interactive experience for the
            users. The study will take about 20 minutes to finish. You must be
            at least 18 years old and live in the United States to participate
            in the study.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Procedures: </span>You will be randomly
            assigned to a condition which might ask you to turn on your device’s
            front camera. You will interact with the website and its features.
            Then, you will be asked to complete a brief survey on your
            attitudes, beliefs, about the interaction, as well as your
            demographic information. In the end, you will leave your email
            address which will solely be used for your compensation.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Risks: </span>Taking part in the study
            involves no risks and discomfort that are no greater than those
            ordinarily encountered in daily life or during other online
            activities.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Benefits: </span>No direct benefit can
            be promised to you for being in this study.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Compensation: </span>You will receive a
            $10 complimentary card for your participation.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Voluntary Participation: </span>YYour
            participation in this study is voluntary. You do not have to be in
            this study if you do not want to, and you can leave the study at any
            time. Whatever you decide, you will not be penalized or lose
            benefits.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Confidentiality: </span>No personally
            identifying information will be stored. All electronic files
            containing identifiable information will be password-protected. Only
            the members of the research staff will have access to the passwords.
            You may choose to withdraw your data at the end of the survey when
            the information is revealed.
          </p>
          <p>
            At the end of this study, the researchers may publish their
            findings. Information will be presented in summary format and you
            will not be identified in any publications or presentations.
          </p>
        </div>
        <div className="mb-3">
          <p>
            <span className="font-bold">Conflict of Interest: </span>Di Lun and
            Armando Carrasquillo have disclosed that they have a personal
            interest related to this study. The University of Miami has an
            interest related to the study. Please ask any questions to assure
            yourself that this relationship has not overly influenced the
            conduct of this research study. If you require further information,
            please contact the study doctor or HRSO at 305-243-3195 to ask
            questions or discuss concerns. If you have any questions regarding
            disclosure review and the conflict management process at the
            University of Miami, please call 305-243-0877.
          </p>
          <p className="mb-3">
            By clicking “next”, you confirm that you are 18 years old or older,
            currently live in the United States, you have read and understood
            the instructions above, and that you are willing to participate in
            this study.
          </p>
          <p className="mb-3">
            If you have any questions or concerns about the research, please
            contact Ms. Lun at dxl744@miami.edu under the supervision of Dr.
            Carcioppolo (n.carcioppolo@miami.edu). If you have questions
            regarding your rights as a research participant, contact the
            University of Miami, Human Subject Research Office at
            hsro@med.miami.edu or 305-243-3195.
          </p>
        </div>
        <div>
          <Button
            className="my-4"
            disabled={false}
            onClick={() => handleGoBack()}
            validationMessage="Click to continue"
            hidden={isValid}
            text="Go Back"
          />
        </div>
      </BgAsset>
    </FullLayout>
  );
};
