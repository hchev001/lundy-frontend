import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  MinimalDamageGif,
  ModDamageGif,
  NoDamageGif,
  SevDamageGif,
} from "../common/assets";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import styled from "styled-components";

import {
  actions,
  PageNames,
  Transitions,
} from "../store/modules/Events";

const GifLoader = styled.img`
  display: ${(props) => (props.hidden ? "none" : "block")};
  height: 100%;
  width: 240px;
`;

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
  const [filter_time, setFilterTime] = useState({
    start_time: new Date().getTime(),
    end_time: null,
    belongs_to: 0,
  });
  const [filter_1_time, setFilter1Time] = useState({ time: null });
  const [filter_2_time, setFilter2Time] = useState({ time: null });
  const [filter_3_time, setFilter3Time] = useState({ time: null });
  const [filter_0_time, setFilter0Time] = useState({ time: null });

  /**
   * Use [0, 1, 2, 3] to denote when to render a gif and also
   * track the time it was seen
   */
  const [gifState, setGifState] = useState(0);

  useEffect(() => {
    dispatch(actions.visitPage(new Date()));

    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_2_PAGE, new Date()));
    };
  }, []);

  const handleNext = () => {
    // track the click
    dispatch(actions.click());

    const {belongs_to, start_time} = filter_time;
    const now = new Date().getTime();
    const elapsed_time = now - start_time;

    let times = {
      filter_0: 0,
      filter_1: 0,
      filter_2: 0,
      filter_3: 0
    }

    if (belongs_to === 0) {
      times.filter_1 = filter_1_time.time;
      times.filter_2 = filter_2_time.time;
      times.filter_3 = filter_3_time.time;
      times.filter_0 = filter_0_time.time + elapsed_time;
      
    } else if (belongs_to === 1) {
      times.filter_1 = filter_1_time.time + elapsed_time;
      times.filter_2 = filter_2_time.time;
      times.filter_3 = filter_3_time.time;
      times.filter_0 = filter_0_time.time;
    } else if (belongs_to === 2) {
      times.filter_1 = filter_1_time.time;
      times.filter_2 = filter_2_time.time + elapsed_time;
      times.filter_3 = filter_3_time.time;
      times.filter_0 = filter_0_time.time;
      
    } else if (belongs_to === 3) {
      times.filter_1 = filter_1_time.time;
      times.filter_2 = filter_2_time.time;
      times.filter_3 = filter_3_time.time + elapsed_time;
      times.filter_0 = filter_0_time.time;
    }

    // console.log(times);

    dispatch(actions.setAgeFilterTimes(times));

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
    dispatch(actions.click());

    if (filterState === 0) {

      dispatch(actions.clickLink(Transitions.CLICK_NO_OLD_FILTER));

      if (filter_time.belongs_to !== -1) {
        // we have a timer running for one of the other buttons
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
          } else if (belongs_to === 3) {
            setFilter3Time({
              time:
                filter_3_time.time == null
                  ? elapsed_time
                  : filter_3_time.time + elapsed_time,
            });
          }
          setFilterTime({
            start_time: new Date().getTime(),
            end_time: null,
            belongs_to: 0,
          });
        }
      } else {
        // setting up belongs_to for the first time
        setFilterTime({
          start_time: new Date().getTime(),
          belongs_to: 0,
          ...filter_time,
        });
      }

      setGifState(0);
    } else if (filterState === 1) {
      dispatch(actions.clickLink(Transitions.CLICK_FILTER_1));
      setGifState(1);

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(1)) {
        setStatesSeen([...statesSeen, 1]);
      }

      if (filter_time.belongs_to !== -1) {
        // we have a timer running for one of the other buttons
        if (filter_time.belongs_to !== 1) {
          const now = new Date().getTime();
          const { belongs_to, start_time } = filter_time;
          const elapsed_time = now - start_time;
          if (belongs_to === 0) {
            setFilter0Time({
              time:
                filter_0_time == null
                  ? elapsed_time
                  : filter_0_time.time + elapsed_time, // else keep running sum
            });
          } else if (belongs_to === 2) {
            setFilter2Time({
              time:
                filter_2_time == null
                  ? elapsed_time
                  : filter_2_time.time + elapsed_time, // else keep running sum
            });
          } else if (belongs_to === 3) {
            setFilter3Time({
              time:
                filter_3_time == null
                  ? elapsed_time
                  : filter_3_time.time + elapsed_time, // else keep running sum
            });
          }
          setFilterTime({
            start_time: new Date().getTime(),
            end_time: null,
            belongs_to: 1,
          });
        }
      } else {
        // setting up belongs_to for the first time
        setFilterTime({
          start_time: new Date().getTime(),
          belongs_to: 1,
          ...filter_time,
        });
      }
    } else if (filterState === 2) {
      dispatch(actions.clickLink(Transitions.CLICK_FILTER_2));
      setGifState(2);

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(2)) {
        setStatesSeen([...statesSeen, 2]);
      }

      if (filter_time.belongs_to !== -1) {
        // we have a timer running for one of the other buttons
        if (filter_time.belongs_to !== 2) {
          const now = new Date().getTime();
          const { belongs_to, start_time } = filter_time;
          const elapsed_time = now - start_time;

          if (belongs_to === 0) {
            setFilter0Time({
              time:
                filter_0_time == null
                  ? elapsed_time
                  : filter_0_time.time + elapsed_time, // else keep running sum
            }); 
          } else if (belongs_to === 1) {
            setFilter1Time({
              time:
                filter_1_time == null
                  ? elapsed_time
                  : filter_1_time.time + elapsed_time, // else keep running sum
            });
          } else if (belongs_to === 3) {
            setFilter3Time({
              time:
                filter_3_time == null
                  ? elapsed_time
                  : filter_3_time.time + elapsed_time, // else keep running sum
            });
          }

          setFilterTime({
            start_time: new Date().getTime(),
            end_time: null,
            belongs_to: 2,
          });
        }
      } else {
        // setting up belongs_to for the first time
        setFilterTime({
          start_time: new Date().getTime(),
          belongs_to: 2,
          ...filter_time,
        });
      }
    } else if (filterState === 3) {
      dispatch(actions.clickLink(Transitions.CLICK_FILTER_3));
      setGifState(3);

      // if we haven't sen this filter, add it to the list of seen filters
      if (!statesSeen.includes(3)) {
        setStatesSeen([...statesSeen, 3]);
      }

      if (filter_time.belongs_to !== -1) {
        // we have a timer running for one of the other buttons
        if (filter_time.belongs_to !== 3) {
          const now = new Date().getTime();
          const { belongs_to, start_time } = filter_time;
          const elapsed_time = now - start_time;

          if (belongs_to === 0) {
            // calculate the time
            setFilter0Time({
              time:
                filter_0_time == null // when first time user only elapsed_time
                  ? elapsed_time
                  : filter_0_time.time + elapsed_time, // else keep running sum
            });
            setFilterTime({
              start_time: new Date().getTime(),
              end_time: null,
              belongs_to: 3,
            });
          } else if (belongs_to === 2) {
            // calculate the time
            setFilter2Time({
              time:
                filter_2_time == null
                  ? elapsed_time
                  : filter_2_time.time + elapsed_time,
            });
            setFilterTime({
              start_time: new Date().getTime(),
              end_time: null,
              belongs_to: 3,
            });
          } else if (belongs_to === 1) {
            // calculate the time
            setFilter1Time({
              time:
                filter_1_time == null // when first time user only elapsed_time
                  ? elapsed_time
                  : filter_1_time.time + elapsed_time, // else keep running sum
            });
            setFilterTime({
              start_time: new Date().getTime(),
              end_time: null,
              belongs_to: 3,
            });
          }
        }
      } else {
        // setting up belongs_to for the first time
        setFilterTime({
          start_time: new Date().getTime(),
          belongs_to: 3,
          ...filter_time,
        });
      }
    }
  };

  return (
    <FullLayout>
      <div className="container">
        <div className="mb-4 p-8 container mx-auto flex justify-center align-center">
          <div>
            <GifLoader src={NoDamageGif} hidden={gifState !== 0} />
          </div>

          <div>
            <GifLoader src={MinimalDamageGif} hidden={gifState !== 1} />
          </div>

          <div>
            <GifLoader src={ModDamageGif} hidden={gifState !== 2} />
          </div>

          <div>
            <GifLoader src={SevDamageGif} hidden={gifState !== 3} />
          </div>
        </div>

        <div className="flex flex-col items-center">
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
