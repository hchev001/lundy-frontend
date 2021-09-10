import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  MinimalDamageGif,
  ModDamageGif,
  NoDamageGif,
  SevDamageGif,
  SunglassesGif,
} from "../common/assets";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import styled from "styled-components";

import {
  actions,
  PageNames,
  selectors,
  Transitions,
} from "../store/modules/Events";

const GifLoader = styled.img`
  display: ${props => props.hidden ? 'none': 'block'};
  height: 100%;
  width: 240px;
`;

interface FilterViewedState {
  noFilter: boolean;
  filter1: boolean;
  filter2: boolean;
  filter3: boolean;
}

/**
 * No Sun Damage
 * Minimal Damage
 * Moderate Damage
 * Severe Damage
 * @returns
 */
export const Survey2: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [statesSeen, setStatesSeen] = useState<number[]>([]);
  const isMenuOpen = useSelector(selectors.isMenuOpen);
  const [state, setState] = useState<FilterViewedState>({
    noFilter: false,
    filter1: false,
    filter2: false,
    filter3: false,
  });
  /**
   * Use [0, 1, 2, 3] to denote when to render a gif and also
   * track the time it was seen
   */
  const [gifState, setGifState] = useState(0);

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      if (gifState === 0) {
        dispatch(actions.click());
        dispatch(actions.leavePage(PageNames.NO_OLD_FILTER, new Date()));
      } else if (gifState === 1) {
        dispatch(actions.click());
        dispatch(actions.leavePage(PageNames.OLD_1_FILTER, new Date()));
      } else if (gifState === 2) {
        dispatch(actions.click())
        dispatch(actions.leavePage(PageNames.OLD_2_FILTER, new Date()));
      } else if (gifState === 3) {
        dispatch(actions.click());
        dispatch(actions.leavePage(PageNames.OLD_3_FILTER, new Date()));
      }
    };
  }, [gifState, dispatch]);

  const handleNext = () => {
    // track the click
    dispatch(actions.click())

    // if seen more than one filter
    if (statesSeen.length > 1) {
      // go to the next survey
      history.push("/survey/3");
    }
  };

  /**
   * disptaches action to track what button was clicked
   */
  const handleFilterClick = (filterState: number): void => {
    if (filterState === 0) {
      dispatch(actions.click())
      dispatch(actions.clickLink(Transitions.CLICK_NO_OLD_FILTER));
      setGifState(0);
    } else if (filterState === 1) {
      dispatch(actions.click())
      dispatch(actions.clickLink(Transitions.CLICK_FILTER_1));
      setGifState(1);
      setState({ ...state, filter1: true });

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(1)) {
        setStatesSeen([...statesSeen, 1]);
      }
    } else if (filterState === 2) {
      dispatch(actions.click())
      dispatch(actions.clickLink(Transitions.CLICK_FILTER_2));
      setGifState(2);
      setState({ ...state, filter2: true });

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(2)) {
        setStatesSeen([...statesSeen, 2]);
      }
    } else if (filterState === 3) {
      dispatch(actions.click())
      dispatch(actions.clickLink(Transitions.CLICK_FILTER_3));
      setGifState(3);
      setState({ ...state, filter3: true });

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(3)) {
        setStatesSeen([...statesSeen, 3]);
      }
    }
  };

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_2_PAGE, new Date()));
    };
  }, []);

  return (
    <FullLayout>
      <div className="container">
        <div className="mb-4 p-8 container mx-auto flex justify-center align-center">
          {gifState === 0 && (
            <div>
              <GifLoader src={NoDamageGif} />
            </div>
          )}

          {gifState === 1 && (
            <div>
              <GifLoader src={MinimalDamageGif} />
            </div>
          )}

          {gifState === 2 && (
            <div>
              <GifLoader src={ModDamageGif} />
            </div>
          )}

          {gifState === 3 && (
            <div>
              <GifLoader src={SevDamageGif} />
            </div>
          )}
        </div>

        <div className='flex flex-col items-center'>
          <div className="px-4 container lg:w-3/4 lg:justify-self-center">
            <Button
              className="mb-4"
              onClick={() => handleFilterClick(0)}
              text="No Damage"
            />
            <Button
              className="mb-4"
              onClick={() => {
                handleFilterClick(1);
              }}
              text="Minimal Sun Damage"
            />
            <Button
              className="mb-4"
              onClick={() => {
                handleFilterClick(2);
              }}
              text="Moderate Sun Damage"
            />
            <Button
              className="mb-4"
              onClick={() => {
                handleFilterClick(3);
              }}
              text="Severe Sun Damage"
            />
            <Button
              className="mb-4"
              text="Next"
              disabled={statesSeen.length < 2}
              onClick={() => handleNext()}
            />
          </div>
        </div>
      </div>
    </FullLayout>
  );
};
