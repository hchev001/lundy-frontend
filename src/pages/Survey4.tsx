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
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

export const Survey4: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [statesSeen, setStatesSeen] = useState<number[]>([]);

  const [filter_time, setFilterTime] = useState({
    start_time: new Date().getTime(),
    belongs_to: 0,
  });
  const [filter_0_time, setFilter0Time] = useState({ time: null });
  const [filter_1_time, setFilter1Time] = useState({ time: null });
  const [filter_2_time, setFilter2Time] = useState({ time: null });

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

  // useEffect(() => {
  //   dispatch(actions.visitPage(new Date()));
  //   return () => {
  //     if (gifState === 0) {
  //       dispatch(actions.leavePage(PageNames.NO_HAT_FILTER, new Date()));
  //     } else if (gifState === 1) {
  //       dispatch(actions.leavePage(PageNames.HAT_1_FILTER, new Date()));
  //     } else if (gifState === 2) {
  //       dispatch(actions.leavePage(PageNames.HAT_2_FILTER, new Date()));
  //     }
  //   };
  // }, [gifState]);

  const handleNext = () => {
    // track the button click
    dispatch(actions.click());

    const { belongs_to, start_time } = filter_time;
    const now = new Date().getTime();
    const elapsed_time = now - start_time;

    let times = {
      filter_0: 0,
      filter_1: 0,
      filter_2: 0,
    };

    if (belongs_to === 0) {
      times.filter_1 = filter_1_time.time;
      times.filter_2 = filter_2_time.time;
      times.filter_0 = filter_0_time.time + elapsed_time;
    } else if (belongs_to === 1) {
      times.filter_1 = filter_1_time.time + elapsed_time;
      times.filter_2 = filter_2_time.time;
      times.filter_0 = filter_0_time.time;
    } else if (belongs_to === 2) {
      times.filter_1 = filter_1_time.time;
      times.filter_2 = filter_2_time.time + elapsed_time;
      times.filter_0 = filter_0_time.time;
    }

    console.log(times, 'what are the times before dispatching?');

    dispatch(actions.setHatFilterTimes(times));

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
      if (filter_time.belongs_to !== -1) {

        if (filter_time.belongs_to !== 0) {

          const now = new Date().getTime();
          const { belongs_to, start_time } = filter_time;
          const elapsed_time = now - start_time;

          if (belongs_to === 1) {
            setFilter1Time({
              time:
                filter_1_time.time == null
                  ? elapsed_time
                  : filter_1_time.time + elapsed_time,
            });
          } else if (belongs_to === 2) {
            setFilter2Time({
              time:
                filter_2_time.time == null
                  ? elapsed_time
                  : filter_2_time.time + elapsed_time,
            });
          }

          setFilterTime({
            start_time: new Date().getTime(),
            belongs_to: 0,
          });
        }
      } else {
        setFilterTime({
          start_time: new Date().getTime(),
          belongs_to: 0,
        });
      }
      setGifState(0);

    } else if (filterState === 1) {
      dispatch(actions.clickLink(Transitions.CLICK_HAT_1));
      setGifState(1);

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(1)) {
        setStatesSeen([...statesSeen, 1]);
      }

      // have set the filter time for some button
      if (filter_time.belongs_to !== -1) {
        // we have a timer running for one of the other buttons that is not this one
        if (filter_time.belongs_to !== 1) {
          const now = new Date().getTime();
          const { belongs_to, start_time } = filter_time;
          const elapsed_time = now - start_time;

          // if other button is zero, no hat
          // finish their tracking time
          if (belongs_to === 0) {
            setFilter0Time({
              time:
                filter_0_time.time == null
                  ? elapsed_time
                  : filter_0_time.time + elapsed_time, // else keep running sum
            });
          } else if (belongs_to === 2) {
            // if other button is 2, hat 2
            setFilter2Time({
              time:
                filter_2_time.time == null
                  ? elapsed_time
                  : filter_2_time.time + elapsed_time, // else keep running sum
            });
          }

          // start tracking this filter (1)
          setFilterTime({
            start_time: new Date().getTime(),
            belongs_to: 1,
          });
        }
      } else {
        // setting up belongs_to for the first time
        setFilterTime({
          start_time: new Date().getTime(),
          belongs_to: 1
        });
      }
    } else if (filterState === 2) {
      dispatch(actions.clickLink(Transitions.CLICK_HAT_2));
      setGifState(2);

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(2)) {
        setStatesSeen([...statesSeen, 2]);
      }

      if (filter_time.belongs_to !== -1) {
        // we have a timer running for one of the other buttons that is not 2
        if (filter_time.belongs_to !== 2) {
          const now = new Date().getTime();
          const { belongs_to, start_time } = filter_time;
          const elapsed_time = now - start_time;

          // if other button is zero, no hat
          // finish tracking their time
          if (belongs_to === 0) {
            setFilter0Time({
              time:
                filter_0_time.time == null
                  ? elapsed_time
                  : filter_0_time.time + elapsed_time, // else keep running sum
            });
          } else if (belongs_to === 1) {
            // if other button is 2, hat 2
            setFilter1Time({
              time:
                filter_1_time.time == null
                  ? elapsed_time
                  : filter_2_time.time + elapsed_time, // else keep running sum
            });
          }
          setFilterTime({
            start_time: new Date().getTime(),
            belongs_to: 2
          });
        }
      } else {
        // setting up belongs_to for the first time
        setFilterTime({
          start_time: new Date().getTime(),
          belongs_to: 2
        });
      }
    }
  };

  return (
    <FullLayout>
      <div className="container">
        <div className="mb-4 p-8 container mx-auto justify-center flex align-center">
          <div>
            <GifLoader src={NoDamageGif} hidden={gifState !== 0} />
          </div>

          <div>
            <GifLoader src={SunglassesGif} hidden={gifState !== 1} />
          </div>

          <div>
            <GifLoader src={HatGif} hidden={gifState !== 2} />
          </div>
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
