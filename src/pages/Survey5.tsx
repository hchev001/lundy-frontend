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
      <div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          aliquam ultrices ante. Nulla vel est malesuada, luctus dui ut, dapibus
          felis. Vestibulum accumsan, nisi eu tempus vestibulum, sapien nulla
          consequat massa, auctor egestas ligula ipsum at justo. Nulla accumsan,
          eros pharetra ornare ultricies, dui magna dictum risus, ac vulputate
          risus mauris rhoncus felis. Vestibulum in orci sed leo cursus
          scelerisque sed nec lorem. Aenean ac purus ex. Quisque gravida
          suscipit nulla ac sollicitudin. Nullam tincidunt suscipit est in
          feugiat. Praesent lacinia vestibulum ex, sed mattis diam tristique
          vitae. Praesent nec mollis libero. Cras vitae metus sapien. Aenean
          vitae ex ipsum. Aenean quis hendrerit diam. Aliquam volutpat augue
          porta, tempor ex ac, commodo nisi.
        </span>
      </div>
      <div>
        <Button onClick={() => history.push("/survey/6")}>Next</Button>
      </div>
    </FullLayout>
  );
};
