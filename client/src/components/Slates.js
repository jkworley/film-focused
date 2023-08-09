import SlatePreview from "./SlatePreview";

function Slates({ slates }) {

    const renderSlatePreviews = slates.map((slate) => 
        <SlatePreview
            key = {slate.id}
            slate = {slate}
            title = {slate.slate_title}
            created_by = {slate.created_by}
        />
    )
    
    return (
        <div className="">
            {renderSlatePreviews}
        </div>
    )
}

export default Slates;