import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames, Transitions } from "../store/modules/Events";

export const Survey4: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [gifStates, setGiftStates] = useState<number[]>([]);
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
    } else if (filterState === 1) {
      dispatch(actions.clickLink(Transitions.CLICK_MOLE_1));
      setGifState(1);
    } else if (filterState === 2) {
      dispatch(actions.clickLink(Transitions.CLICK_MOLE_2));
      setGifState(2);
    } else if (filterState === 3) {
      dispatch(actions.clickLink(Transitions.CLICK_MOLE_3));
      setGifState(3);
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
              src="https://giphy.com/embed/GrUhLU9q3nyRG"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
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
              src="https://giphy.com/embed/Nt8Q1I8rlfzZS"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {gifState === 3 && (
          <div
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "100%",
              position: "relative",
            }}
          >
            <iframe
              src="https://giphy.com/embed/lo9wzT7ENLVX04TIGZ"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => handleFilterClick(0)}
        >
          No Filter
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => {
            if (!gifStates.includes(1)) {
              setGiftStates([...gifStates, 1]);
            }
            handleFilterClick(1);
          }}
        >
          Hat 1
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => {
            if (!gifStates.includes(2)) {
              setGiftStates([...gifStates, 2]);
            }
            handleFilterClick(2);
          }}
        >
          Hat 2
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => {
            if (!gifStates.includes(3)) {
              setGiftStates([...gifStates, 3]);
            }
            handleFilterClick(3);
          }}
        >
          Mole 3
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={gifStates.length > 1 ? false : true}
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => handleNext()}
        >
          Next
        </button>
      </div>
    </FullLayout>
  );
};
