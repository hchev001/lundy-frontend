import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";
import Lotion_img from "../common/assets/Lotion-SPF15.png";
import tree_img from "../common/assets/Tree.png";

export const Survey33: React.FC = () => {
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
      <div className="p-8 font-sans text-brown-500 text-xl">
        <div className="text-3xl text-teal-700 mb-4 text-center">
          Use a Layered Approach for{" "}
          <span className="font-bold">Sun Protection.</span>
        </div>
        <div>
          <div className="mb-6 leading-normal">
            <div className='flex justify-center'>
              <img src={Lotion_img} className="h-40 w-40 mb-4" />
            </div>
            <div>
              Use broad spectrum sunscreen with at least SPF 15 to protect exposed skin.
            </div>
          </div>

          <div className="border-dotted border-2 border-teal-700 my-6" />

          <div className="mb-8 leading-normal">
            <div className='justify-center flex'>
              <img src={tree_img} className="h-40 w-40 mb-4" />
            </div>
            <div>
              Seek shade, especially during midday hours.
            </div>
          </div>
        </div>
        <div className="md:mt-36">
          <Button onClick={() => history.push("/survey/3-4")} text="Next" />
        </div>
      </div>
    </FullLayout>
  );
};
