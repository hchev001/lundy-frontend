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

  // useEffect(() => {
  //   dispatch(actions.visitPage(new Date()));
  //   return () => {
  //     dispatch(actions.leavePage(PageNames.MESSAGE_1_PAGE, new Date()));
  //   };
  // }, []);
  return (
    <FullLayout>
      <BgAsset className='p-8 font-sans text-brown-500 text-xl'>
        <div><span className="font-bold">UV and sunlight exposures</span>are responsible for <span>90%</span> of visible changes to the skin, including wrinkles, fine lines, and pigmentation.</div>

        <div className="mt-20 mb-20 ml font-serif italic">Click <span>"next"</span> and try on the filters.</div>

        
      <div>
        <Button onClick={() => history.push("/survey/2")} text='Next'/>
      </div>
      </BgAsset>
    </FullLayout>
  );
};
