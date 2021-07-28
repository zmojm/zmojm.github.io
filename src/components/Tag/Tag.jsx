import React from 'react'
import classNames from 'classnames'

const Tag = props => {
    const { type = 'primary', ...other } = props
    const cls = classNames({
        btn: true,
        [`btn-${type}`]: true,
    })

    return (
        <button type='button' className={cls} {...other}>
            {props.children}
        </button>
    )
}

export default Tag
