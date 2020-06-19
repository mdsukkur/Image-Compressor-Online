import React from "react";

// InputField.defaultProps = {
//     handleOnChange: (e) => {
//         console.log(e.target.name);
//     }
// };

export default function InputField(props) {
    return (
        <div className="group-form">
            <label>{props.label}</label>
            <input
                type={props.type}
                // defaultChecked={props.value === "true" ? true : ''}
                min={props.type === "number" ? '0' : ''}
                value={props.value}
                placeholder={props.placeholder} name={props.name} onChange={props.onChange}/>
        </div>
    )
}