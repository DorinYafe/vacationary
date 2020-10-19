import React from 'react';
import classes from './Icon.module.css';
import { iconMode, } from '../../../types/types';
import { generateStyle, } from '../../../utils/generateStyle';

interface Props {
    mode: iconMode,
    onClick: any,
    miscStyles?: { [key: string]: any },
};

const Icon: React.FC<Props> = ({ mode = 'default', onClick, miscStyles, }) => {

    const { Icon, Edit, Delete, Add, Follow } = classes;
    const iconStyle = generateStyle(Icon);

    return (
        <li
            className={mode === 'add' ?
                iconStyle(Add) : mode === 'edit' ?
                    iconStyle(Edit) : mode === 'delete' ?
                        iconStyle(Delete) : mode === 'unfollow' ?
                            iconStyle(Delete) : mode === 'follow' ?
                                iconStyle(Follow) : iconStyle()
            }
            onClick={onClick}
            style={miscStyles}></li>
    )
};

export default Icon;