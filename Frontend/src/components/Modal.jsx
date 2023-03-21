import React from 'react';
import './component.css';

const MyModal = ({ children }) => {
    return (
        <div className="modal">
            <div className="modal-content" >
                {children}
            </div>
        </div>
    );
};

export default MyModal;