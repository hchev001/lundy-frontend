import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "../components/Button";
import { FullLayout } from "../layout/FullLayout";
import { actions, PageNames } from "../store/modules/Events";

export const Survey5: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.visitPage(new Date()));
    return () => {
      dispatch(actions.leavePage(PageNames.MESSAGE_3_PAGE, new Date()));
    };
  }, []);
  return (
    <FullLayout>
      <div>Hello5</div>
      <div>
        <Button onClick={() => history.push("/survey/6")}>Next</Button>
      </div>
    </FullLayout>
  );
};
