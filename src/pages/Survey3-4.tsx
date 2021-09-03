import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";
import hat_img from "../common/assets/glasses_hat.png";

export const Survey34: React.FC = () => {
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
        <div className="flex justify-center mb-4">
          <img src={hat_img} className="h-40 w-40 mb-8" />
        </div>
        <div>
          <div className='mb-4 leading-normal'>
            <span className="font-bold text-teal-700 text-2xl">Hat: </span>For
            most protection, wear a hat with a brim all the way around that
            shades the face, ears, and back of the neck. A darker hat may may
            offer more UV protection.
          </div>
          <div className="mb-4 leading-normal">
            <span className="font-bold text-teal-700 text-2xl">
              Sunglasses:{" "}
            </span>
            Sunglasses protect eyes from UV rays and reduce the risk of
            cataracts. THey also protect the tender skin around the eyes from
            sun exposure. Sunglasses that block both UVA and UVB rays offer the
            best protection. Most sunglasses sold in the United States,
            regardless of cost, meet this standard.
          </div>
        </div>
        <div className="mt-16 mb-20 ml font-serif italic text-teal-700 text-xl">
          Click <span>"next"</span> and try on the filters.
        </div>

        <div>
          <Button onClick={() => history.push("/survey/4")} text="Next" />
        </div>
      </div>
    </FullLayout>
  );
};
