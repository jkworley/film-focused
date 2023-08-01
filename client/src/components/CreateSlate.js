import TMDBSearch from "./TMDBSearch";

function CreateSlate({ api_key }) {
    return (
        <div className="flex">
        <div className="border border-red-700 w-1/4">

        </div>
        <div className="w-3/4"><TMDBSearch api_key={api_key} /></div>
      </div>
    )
}

export default CreateSlate;