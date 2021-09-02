import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";
import hand_spf_img from "../common/assets/hand_spf.png";
import Sunglasses_img from "../common/assets/glasses_hat.png";

export const Survey32: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.visitPage(new Date()));
  //   return () => {
  //     dispatch(actions.leavePage(PageNames.MESSAGE_2_PAGE, new Date()));
  //   };
  // }, []);
  return (
    <FullLayout>
      <div className="p-8 font-sans text-brown-500">
        <div className="text-3xl text-teal-700 mb-4 text-center">
          Use a Layered Approach for{" "}
          <span className="font-bold">Sun Protection.</span>
        </div>
        <div>
          <div className="mb-6">
            <div className='flex justify-center'>
              <img src={hand_spf_img} className="h-40 w-40 mb-4" />
            </div>
            <div>
              Sunscreen works best when used with share or clothes, and it must
              be re-applied every 2 hours and after swimming, sweating, or
              toweling off.
            </div>
          </div>

          <div className="border-dotted border-2 border-teal-700 my-6" />

          <div className="mb-8">
            <div className='justify-center flex'>
              <img src={Sunglasses_img} className="h-40 w-40 mb-4" />
            </div>
            <div>
              Wear a hat, sunglasses, and protective clothing to shield skin.
            </div>
          </div>
        </div>
        <div>
          <Button onClick={() => history.push("/survey/3-3")} text="Next" />
        </div>
      </div>
    </FullLayout>
  );
};
