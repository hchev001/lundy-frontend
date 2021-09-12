import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";
import styled from "styled-components";
import CaretRight from "../common/assets/caret-right.png";

const BgAsset = styled.div`

  li {
    background: url(${CaretRight});
    background-size: 24px 24px;
    background-repeat: no-repeat;
    margin: 0 6px 0 0;
    padding: 0px 0px 1px 26px;
    vertical-align: middle;
    list-style-type: none;
  }
`;

export const Survey13: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_1_3_PAGE, new Date()));
    };
  }, []);

  const handleNext = () => {
    //track the click
    dispatch(actions.click());

    // go to next page
    history.push("/survey/1-4");
  }
  return (
    <FullLayout>
      <BgAsset className='p-8 font-sans text-brown-500 text-xl'>
        <div>Exposure to <span className=" text-3xl font-bold">ultraviolet (UV) rays</span>--from the sun or from artificial sources like tanning beds--is the most common cause of skin cancer.</div>

        <div className="mt-20 mb-20 ml font-serif italic text-teal-700 font-bold text-2xl">Anyone, no matter their skin tone can get skin cancer.</div>

        
      <div className="md:mt-36">
        <Button onClick={() => handleNext()} text='Next'/>
      </div>
      </BgAsset>
    </FullLayout>
  );
};
