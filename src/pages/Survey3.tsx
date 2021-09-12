import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";
import styled from "styled-components";
import CaretRight from '../common/assets/caret-right.png';

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

export const Survey31: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_3_PAGE, new Date()));
    };
  }, []);

  const handleNext = () => {
    //track the click
    dispatch(actions.click());

    // go to next page
    history.push("/survey/3-2");
  }
  return (
    <FullLayout>
      <BgAsset className='p-8 font-sans text-brown-500 text-xl'>
      <div className='text-teal-700 text-3xl'>Most skin cancers can be prevented.</div>
      <div className='mt-6 mb-6 leading-normal'>
        <ul className='pl-2'>
          <li>When detected early, the 5-year survival rate for melanoma is <span className='font-bold text-teal-700'>99%</span></li>
          <li>It's easy to be protected from UV exposure, just choose sun protection strategies that work:</li>
        </ul>
      </div>
      <div className="md:mt-36">
        <Button onClick={() => handleNext()} text="Next"/>
      </div>
      </BgAsset>
      
      
    </FullLayout>
  );
};
