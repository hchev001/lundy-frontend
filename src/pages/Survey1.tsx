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

export const Survey1: React.FC = () => {
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
        <div><span className='font-serif text-3xl'>Skin cancer</span> is the most common cancer in the United States, <span className='font-bold'>but most skin cancers can be prevented!</span></div>

        <div className='mt-6 mb-6 leading-normal'>
          <span className='font-bold'>Every year --</span>
          <br />
          <br />
          <ul className='pl-2' >
            <li>Nearly <span className='text-teal-700 font-bold'>5 milliion</span> people are treated for skin cancer at a cost of more than $8 billion.</li>
            <li>There are about <span className='text-teal-700 font-bold'>76,000</span> new cases of and <span className='text-teal-700 font-bold'>9,000</span> deaths from melanoma, the dealiest from of skin cancer.</li>
          </ul>
        </div>
      <div>
        <Button onClick={() => history.push("/survey/1-2")} text='Next'/>
      </div>
      </BgAsset>
    </FullLayout>
  );
};
