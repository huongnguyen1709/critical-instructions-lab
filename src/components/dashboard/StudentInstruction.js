import React from 'react';

const StudentInstruction = () => {
    return (
        <div className="container section">
            <div className="card z-depth-0">
                <div className="card-content flex-column">
                    <span className="card-title teal-text center heading">{instruction.title}</span>
                    <img src={instruction.image} alt="There is no chosen image" />
                    <p className="mt-30">{instruction.content}</p>
                </div>
                <div className="card-action grey lighten-4 grey-text flex-row">
                    <Link to='/' className="btn teal lighten-1 z-depth-0">Back</Link>
                    <span className="center">
                        {onAuthor()}
                        <div>{moment(instruction.createdAt.toDate()).calendar()}</div>
                    </span>
                    {onActionInstruction()}
                </div>
            </div>
        </div>
    );
}

export default StudentInstruction;