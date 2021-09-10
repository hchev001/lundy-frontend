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

export const Survey12: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // on mount
  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_1_2_PAGE, new Date()));
    };
  }, []);

  const handleNext = () => {
    //track the click
    dispatch(actions.click());

    // go to next page
    history.push("/survey/1-3");
  }

  return (
    <FullLayout>
      <BgAsset className='p-8 font-sans text-brown-500 text-xl'>
        <div><span className='text-3xl font-bold'>Melanoma</span> is the deadliest form of skin cancer.</div>

        <div className='mt-6 mb-6'>
          <ul className='pl-2 leading-normal' >
            <li><span className='text-teal-700 font-bold'>Every hour</span> there are <span className='text-teal-700 font-bold'>more than 2</span> people dead of skin cancer in the U.S.</li>
            <li>
              <span className='text-teal-700 font-bold'>1 in 5</span> Americans will develop skin cancer by the age of 70
            </li>
            <li>
              Melanoma can develop <span className='text-teal-700 font-bold'>anywhere</span> on the body - eyes, scalp, nails, mouth, etc.
            </li>
          </ul>
        </div>
      <div className="md:mt-36">
        <Button onClick={() => handleNext()} text='Next'/>
      </div>
      </BgAsset>
    </FullLayout>
  );
};
