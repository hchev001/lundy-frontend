import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";

export const WhatIsAR = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));

    return () => {
      dispatch(actions.leavePage(PageNames.AR_PAGE, new Date()));
    };
  });
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <FullLayout>
      <div>
        <span className="text-2xl">What is AR</span>
      </div>
      <div>
        <button
          onClick={() => handleGoBack()}
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
        >
          Go Back
        </button>
      </div>
    </FullLayout>
  );
};
