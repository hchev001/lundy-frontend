import { FullLayout } from "../layout/FullLayout";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actions, PageNames } from "../store/modules/Events";

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
      <div>
        <span className="text-2xl">Contact Us</span>
      </div>
      <div>
        <span>
          If you have any questions, concerns, or complaints, or think the
          research has hurt you, please contact Ms. Lun at dxl744@miami.edu. If
          you have questions regarding your rights as a research participant,
          contact the University of Miami, Human Subject Research Office at
          hsro@med.miami.edu or 305-243-3195.
        </span>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => handleGoBack()}
        >
          Go Back
        </button>
      </div>
    </FullLayout>
  );
};
