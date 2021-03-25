import { useHistory } from "react-router";
import { FullLayout } from "../layout/FullLayout";

export const Survey2: React.FC = () => {
  const history = useHistory();
  return (
    <FullLayout>
      <div>Hello2</div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
        >
          Old 1
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
        >
          Old 2
        </button>
      </div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
        >
          Old 3
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
