import React from "react";

const PictureInfo = (props) => {
    return (
        <>
            <div className="pictureBody">
                <h4 className="title">{props.title}</h4>

                <div className="pictureContent grid">
                    <div className="picture" style={{backgroundColor: "#eee"}}>
                        {props.data.imageUrl ? <img src={props.data.imageUrl} alt="uisbsuis"/> : ''}
                    </div>

                    <div className="pictureDetails grid">

                        <div className="content">
                            <li>Last Modified</li>
                            <li>Last Modified Date</li>
                            <li>Name</li>
                            <li>Type</li>
                            <li>Size</li>
                        </div>

                        <div className="content">
                            <li>{props.data.lastModified ?? 'N/A'}</li>
                            <li>{props.data.lastModifiedDate ?? 'N/A'}</li>
                            <li>{props.data.name ?? 'N/A'}</li>
                            <li>{props.data.type ?? 'N/A'}</li>
                            <li>{props.data.size ?? 'N/A'}</li>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};

export default PictureInfo;