import React from 'react';

export default function Muda(props) {
    return (
        <img
            {...props}
            src='/storage/images/muda.png'
            alt='SMK MUDA'
            style={{ width: '150px', height: '130px', marginTop:'5px' }}
        />
    );
}
