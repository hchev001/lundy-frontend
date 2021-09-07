import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";

export const Survey5: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.visitPage(new Date()));
  //   return () => {
  //     dispatch(actions.leavePage(PageNames.MESSAGE_3_PAGE, new Date()));
  //   };
  // }, []);
  return (
    <FullLayout>
      <div className="container p-8">
        <div className="text-3xl font-serif text-brown-500 mb-4">
          Enjoy the Outdoors!
        </div>
        <div className="text-xl text-teal-700 mb-12">
          Being physically active outside is healthy and can help prevent
          conditions like obesity. But it's important to be sun smart when
          playing and working outdoors.
        </div>
        <div className="md:mt-36">
          <Button onClick={() => history.push("/survey/6")} text="Next" />
        </div>
      </div>
    </FullLayout>
  );
};
