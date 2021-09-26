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

export const Survey14: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_1_4_PAGE, new Date()));
    };
  }, []);

  const handleNext = () => {
    //track the click
    dispatch(actions.click());

    // go to next page
    history.push("/survey/3");
  }
  return (
    <FullLayout>
      <BgAsset className='p-8 font-sans text-brown-500 text-xl'>
        <div><span className="font-bold text-2xl">UV and sunlight exposures</span> are responsible for <span className={"text-teal-700 font-bold text-2xl"}>90%</span> of visible changes to the skin, including wrinkles, fine lines, and pigmentation.</div>

        {/* <div className="mt-20 mb-20 ml font-serif italic text-teal-700">Click <span className="font-bold">"next"</span> and try on the filters.</div> */}

        
      <div className="mt-20 md:mt-36">
        <Button onClick={() => handleNext()} text='Next'/>
      </div>
      </BgAsset>
    </FullLayout>
  );
};
