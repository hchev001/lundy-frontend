import classNames from "classnames";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components/Button";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames, Transitions } from "../store/modules/Events";

interface FilterViewedState {
  noFilter: boolean;
  filter1: boolean;
  filter2: boolean;
  filter3: boolean;
}

export const Survey4: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [gifStates, setGiftStates] = useState<number[]>([]);
  const [state, setState] = useState<FilterViewedState>({
    noFilter: false,
    filter1: false,
    filter2: false,
    filter3: false,
  });

  /**
   * Use [0, 1, 2] to denote when to render a gif and also
   * track the time it was seen
   */
  const [gifState, setGifState] = useState(-1);
  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      if (gifState === 0) {
        dispatch(actions.leavePage(PageNames.NO_MOLE_FILTER, new Date()));
      } else if (gifState === 1) {
        dispatch(actions.leavePage(PageNames.MOLE_1_FILTER, new Date()));
      } else if (gifState === 2) {
        dispatch(actions.leavePage(PageNames.MOLE_2_FILTER, new Date()));
      } else if (gifState === 3) {
        dispatch(actions.leavePage(PageNames.MOLE_3_FILTER, new Date()));
      }
    };
  }, [gifState]);

  const handleNext = () => {
    if (gifStates.length > 1) {
      history.push("/survey/5");
    }
  };

  /**
   * disptaches action to track what button was clicked
   */
  const handleFilterClick = (filterState: number): void => {
    if (filterState === 0) {
      dispatch(actions.clickLink(Transitions.CLICK_NO_MOLE_FILTER));
      setGifState(0);
      setState({ ...state, noFilter: true });
    } else if (filterState === 1) {
      dispatch(actions.clickLink(Transitions.CLICK_MOLE_1));
      setGifState(1);
      setState({ ...state, filter1: true });
    } else if (filterState === 2) {
      dispatch(actions.clickLink(Transitions.CLICK_MOLE_2));
      setGifState(2);
      setState({ ...state, filter2: true });
    } else if (filterState === 3) {
      dispatch(actions.clickLink(Transitions.CLICK_MOLE_3));
      setGifState(3);
      setState({ ...state, filter3: true });
    }
  };

  return (
    <FullLayout>
      <div>Something about Hats and Moles</div>
      <div className="mb-4">
        {gifState === 1 && (
          <div
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "54%",
              position: "relative",
            }}
          >
            <iframe
              title="mole1"
              src="https://giphy.com/embed/GrUhLU9q3nyRG"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
            ></iframe>
          </div>
        )}

        {gifState === 2 && (
          <div
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "50%",
              position: "relative",
            }}
          >
            <iframe
              title="nose2"
              src="https://giphy.com/embed/Nt8Q1I8rlfzZS"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
            ></iframe>
          </div>
        )}

        {gifState === 3 && (
          <div
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "50%",
              position: "relative",
            }}
          >
            <iframe
              title="nose3"
              src="https://giphy.com/embed/lo9wzT7ENLVX04TIGZ"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
            ></iframe>
          </div>
        )}
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:mb-4">
        <div>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            aliquam ultrices ante. Nulla vel est malesuada, luctus dui ut,
            dapibus felis. Vestibulum accumsan, nisi eu tempus vestibulum,
            sapien nulla consequat massa, auctor egestas ligula ipsum at justo.
            Nulla accumsan, eros pharetra ornare ultricies, dui magna dictum
            risus, ac vulputate risus mauris rhoncus felis. Vestibulum in orci
            sed leo cursus scelerisque sed nec lorem. Aenean ac purus ex.
            Quisque gravida suscipit nulla ac sollicitudin. Nullam tincidunt
            suscipit est in feugiat. Praesent lacinia vestibulum ex, sed mattis
            diam tristique vitae. Praesent nec mollis libero. Cras vitae metus
            sapien. Aenean vitae ex ipsum. Aenean quis hendrerit diam. Aliquam
            volutpat augue porta, tempor ex ac, commodo nisi.
          </span>
        </div>
        <div>
          <div>
            <Button onClick={() => handleFilterClick(0)}>No Filter</Button>
          </div>
          <div>
            <Button
              onClick={() => {
                if (!gifStates.includes(1)) {
                  setGiftStates([...gifStates, 1]);
                }
                handleFilterClick(1);
              }}
            >
              Hat 1
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                if (!gifStates.includes(2)) {
                  setGiftStates([...gifStates, 2]);
                }
                handleFilterClick(2);
              }}
            >
              Hat 2
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                if (!gifStates.includes(3)) {
                  setGiftStates([...gifStates, 3]);
                }
                handleFilterClick(3);
              }}
            >
              Mole 3
            </Button>
          </div>
          <div>
            <button
              type="button"
              disabled={gifStates.length > 1 ? false : true}
              className={classNames(
                { "hover:border-red-200": gifStates.length > 1 },
                { "hover:bg-gray-50": gifStates.length > 1 },
                { "bg-white": gifStates.length > 1 },
                { "opacity-0": gifStates.length < 2 },
                { "opacity-100": gifStates.length > 1 },
                "transition-opacity",
                "ease-out",
                "duration-300",
                "mt-4",
                "inline-flex",
                "justify-center",
                "w-full",
                "rounded-md",
                "border",
                "border-gray-300",
                "shadow-sm",
                "px-4",
                "py-2",
                "text-sm",
                "font-medium",
                "text-gray-700",
                "focus:outline-none"
              )}
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </FullLayout>
  );
};
