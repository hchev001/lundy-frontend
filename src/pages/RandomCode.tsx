import { FullLayout } from "../layout/FullLayout";

export const RandomCode: React.FC = () => {
  return (
    <FullLayout>
      <div>Hello6</div>
      <div>
        <button
          type="button"
          className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2"
          onClick={() => console.log("done with survey")}
        >
          Close
        </button>
      </div>
    </FullLayout>
  );
};
