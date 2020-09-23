import React from 'react';

const InstrucDetail = (props) => {
    const { instruction } = props
    const onShowDetail = () => {
        props.onShowDetail()
    }

    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content flex-column">
                    <span className="card-title teal-text center heading">{instruction.title}</span>
                    <p className="mt-30">{instruction.content}</p>
                    {instruction.image ? <img src={instruction.image} alt={instruction.imageFileName} /> : null}
                </div>
                <div className="card-action grey lighten-4 grey-text flex-row">
                    <button className="btn teal lighten-1 z-depth-0" onClick={onShowDetail}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default InstrucDetail;