import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../components";
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
      <div className="container p-8 text-xl font-sans text-brown-500">
        <div className="w-full text-center">
          <span className="text-3xl font-bold font-serif text-teal-700 ">What is AR</span>
        </div>
        <div className="mt-4 leading-normal text-lg">

          Augmented reality (AR) is an interactive experience of a real-world environment where the objects that reside in the real world are enhanced
          by computer-generated perceptual information, sometimes across multiple sensory modalities, including visual, auditory, haptic, somatosensory
          and olfactory. AR can be defined as a system that fulfills three basic features: a combination of real and virtual worlds, real-time interaction,
          and accurate 3D registration of virtual and real objects. The overlaid sensory information can be constructive (i.e. additive to the natural
          environment), or destructive (i.e. masking of the natural environment). This experience is seamlessly interwoven with the physical world such that it is perceived as 
          an immersive aspect of the real environment. In this way, augmented reality alters one's ongoing perception of a real-world environment, whereas
          virtual reality completely replaces the user's real-world environment with a simulated one.* 

          <br />
          * cited from Wikipedia.com
        </div>
        <div>
          <Button
            onClick={() => handleGoBack()}
            text="Go Back"
            className="mt-8"
          />
        </div>
      </div>
    </FullLayout>
  );
};
