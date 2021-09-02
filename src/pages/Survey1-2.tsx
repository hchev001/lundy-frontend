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

  // useEffect(() => {
  //   dispatch(actions.visitPage(new Date()));
  //   return () => {
  //     dispatch(actions.leavePage(PageNames.MESSAGE_1_PAGE, new Date()));
  //   };
  // }, []);
  return (
    <FullLayout>
      <BgAsset className='p-8 font-sants text-brown-500'>
        <div><span className='font-sans text-xl font-bold'>Melanoma</span> is the deadliest form of skin cancer.</div>

        <div className='mt-6 mb-6'>
          <span className='font-bold'>Every year --</span>
          <br />
          <br />
          <ul className='pl-2' >
            <li><span>Every hour</span> there are <span>more than 2</span> people dead of skin cancer in the U.S.</li>
            <li>
              <span>1 in 5</span> Americans will develop skin cancer by the age of 70
            </li>
            <li>
              Melanoma can develop <span>anywhere</span> on the body - eyes, scalp, nails, mouth, etc.
            </li>
          </ul>
        </div>
      <div>
        <Button onClick={() => history.push("/survey/1-3")} text='Next'/>
      </div>
      </BgAsset>
    </FullLayout>
  );
};