import { Input } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'
import './index.scss'

const ShenLun = () => {
    const [inputValue, setInputValue] = useState('')
    const [textList, setTextList] = useState(new Array(1400).fill(''))
    const [activeIndex, setActiveIndex] = useState(0)

    const handleKeyDown = e => {
        // 禁用删除键
        const keyCode = e.keyCode
        if (keyCode === 8) {
            return e.preventDefault()
        }
    }

    const handleInputChange = e => {
        let value = e.target.value
        const stringifyValue = JSON.stringify(value)
        if (stringifyValue.includes('\\n')) {
            const suffix = 25 - (value.length % 25)
            value = value.replace(
                '\n',
                ' ' + new Array(suffix).fill(' ').join('')
            )
            window.string = value
        }
        setInputValue(value)
        const newTextList = new Array(1400).fill('')
        Array.from(value).forEach((item, index) => {
            newTextList[index] = item
        })
        setTextList(newTextList)
        setActiveIndex(value.length)
    }
    return (
        <div className='shenlun-wrap'>
            <Input.TextArea
                className='input'
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />

            <div className='list'>
                {textList.map((item, index) => {
                    const cls = classNames({
                        item: true,
                        active: activeIndex === index,
                    })
                    return (
                        <div key={index} className={cls}>
                            {item}
                            {(index + 1) % 100 === 0 && (
                                <div className='count'>{index + 1}</div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShenLun
