import { FullLayout } from "../layout/FullLayout";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actions, PageNames } from "../store/modules/Events";
import { Button } from "../components";

export const ContactUs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.visitPage(new Date()));

    return () => {
      dispatch(actions.leavePage(PageNames.CONTACT_US_PAGE, new Date()));
    };
  });
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <FullLayout>
      <div className="p-8 text-xl font-sans text-brown-500">
        <div>
          <span className="font-bold">Contact Us</span>
        </div>
        <div className="my-2">
          <span>
            If you have any questions, concerns, or complaints, or think the
            research has hurt you, please contact Ms. Lun at dxl744@miami.edu.
            If you have questions regarding your rights as a research
            participant, contact the University of Miami, Human Subject Research
            Office at hsro@med.miami.edu or 305-243-3195.
          </span>
        </div>
        <div className="md:my-36">
          <Button onClick={() => handleGoBack()} text="Go Back" />
        </div>
      </div>
    </FullLayout>
  );
};
