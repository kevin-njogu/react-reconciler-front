import React from 'react';

const Button = ({ type, classname, disabled, loader, loading }) => {
    return (
        <button type={type} className={classname} disabled={disabled}>
            {loading ? loader : 'Upload Statement'}
        </button>
    );
};

export default Button;
