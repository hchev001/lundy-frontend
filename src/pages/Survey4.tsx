import classNames from "classnames";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames, Transitions } from "../store/modules/Events";
import styled from "styled-components";
import { NoDamageGif, HatGif, SunglassesGif } from "../common/assets";

const GifLoader = styled.img`
  height: 100%;
  width: 240px;
`;

interface FilterViewedState {
  noFilter: boolean;
  filter1: boolean;
  filter2: boolean;
  filter3: boolean;
}

export const Survey4: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [statesSeen, setStatesSeen] = useState<number[]>([]);
  const [state, setState] = useState<FilterViewedState>({
    noFilter: false,
    filter1: false,
    filter2: false,
    filter3: false,
  });

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_4_PAGE, new Date()));
    };
  }, []);

  /**
   * Use [0, 1, 2] to denote when to render a gif and also
   * track the time it was seen
   */
  const [gifState, setGifState] = useState(0);

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      if (gifState === 0) {
        dispatch(actions.leavePage(PageNames.NO_HAT_FILTER, new Date()));
      } else if (gifState === 1) {
        dispatch(actions.leavePage(PageNames.HAT_1_FILTER, new Date()));
      } else if (gifState === 2) {
        dispatch(actions.leavePage(PageNames.HAT_2_FILTER, new Date()));
      }
    };
  }, [gifState]);

  const handleNext = () => {
    // track the button click
    dispatch(actions.click());
    if (statesSeen.length > 1) {
      history.push("/survey/5");
    }
  };

  /**
   * disptaches action to track what button was clicked
   */
  const handleFilterClick = (filterState: number): void => {
    if (filterState === 0) {
      dispatch(actions.clickLink(Transitions.CLICK_NO_HAT));
      setGifState(0);
    } else if (filterState === 1) {
      dispatch(actions.clickLink(Transitions.CLICK_HAT_1));
      setGifState(1);
      setState({ ...state, filter1: true });

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(1)) {
        setStatesSeen([...statesSeen, 1]);
      }
    } else if (filterState === 2) {
      dispatch(actions.clickLink(Transitions.CLICK_HAT_2));
      setGifState(2);
      setState({ ...state, filter2: true });

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(2)) {
        setStatesSeen([...statesSeen, 2]);
      }
    }
  };

  return (
    <FullLayout>
      <div className="container">
        <div className="mb-4 p-8 container mx-auto justify-center flex align-center">
          {gifState === 0 && (
            <div>
              <GifLoader src={NoDamageGif} />
            </div>
          )}
          {gifState === 1 && (
            <div>
              <GifLoader src={SunglassesGif} />
            </div>
          )}

          {gifState === 2 && (
            <div>
              <GifLoader src={HatGif} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="px-4 container">
            <div>
              <Button
                onClick={() => handleFilterClick(0)}
                text="None"
                className="mb-4"
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  handleFilterClick(1);
                }}
                text="Sunglasses"
                className="mb-4"
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  handleFilterClick(2);
                }}
                text="Hat"
                className="mb-4"
              />
            </div>
            <div>
              <Button
                className="mb-4"
                text="Next"
                disabled={statesSeen.length < 2}
                onClick={() => handleNext()}
              />
            </div>
          </div>
        </div>
      </div>
    </FullLayout>
  );
};
