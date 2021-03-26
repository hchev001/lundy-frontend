import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";

export const Survey2: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   * Use [0, 1, 2] to denote when to render a gif and also
   * track the time it was seen
   */
  const [gifState, setGifState] = useState(-1);
  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      if (gifState === 0) {
        dispatch(actions.leavePage(PageNames.NO_OLD_FILTER, new Date()));
      } else if (gifState === 1) {
        dispatch(actions.leavePage(PageNames.OLD_1_FILTER, new Date()));
      } else if (gifState === 2) {
        dispatch(actions.leavePage(PageNames.OLD_2_FILTER, new Date()));
      } else if (gifState === 3) {
        dispatch(actions.leavePage(PageNames.OLD_3_FILTER, new Date()));
      }
    };
  }, [gifState]);

  return (
    <FullLayout>
      <div>Age Filters</div>
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
          onClick={() => setGifState(0)}
        >
          No Filter
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => setGifState(1)}
        >
          Age 1
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => {
            setGifState(2);
          }}
        >
          Age 2
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => {
            setGifState(3);
          }}
        >
          Age 3
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => history.push("/survey/3")}
        >
          Next
        </button>
      </div>
    </FullLayout>
  );
};
