import React from 'react';
import { useWindowSize } from '../functions/handle-resize';
import { ScreenSize } from '../types/ScreenSize';

type TemplateType = {
    header: string,
    p?: string,
    children: JSX.Element,
}

const Template = ({ header, p , children}: TemplateType) => {
    const size: ScreenSize = useWindowSize();
    const style = {
        // minHeight: size.height - 200,
        maxHeight: size.height - 200,
    };

    return (
        <div className='form-root' >
            <div className="form-content" style={style}>
                <div className='form-header-content'>
                    <h1 className="form-header">
                        {header}
                    </h1>
                    { p &&
                    <p>
                        Fill in your email and password to sign in.
                    </p>
                    }
                </div>
                {children}
            </div>
        </div>
    );
};

export default Template;