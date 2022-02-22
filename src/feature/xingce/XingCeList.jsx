import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import classNames from 'classnames'
import { getCategoryQuestion, getQuestionList } from '../../service/question'
import './XingCe.scss'
import { useParams } from 'react-router'
import Answer from './Answer'

const XingCeList = () => {
    const params = useParams()
    const [categoryList, setCategoryList] = useState([])
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        getCategoryQuestion().then(res => {
            const data = res.toJSON().content
            setCategoryList(data)
        })
    }, [])

    useEffect(() => {
        const getQuestionIds = (data, id, callback) => {
            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                if (item.id == id) {
                    callback(item.questionIds)
                    return
                }
                if (item.children) {
                    getQuestionIds(item.children, id, callback)
                }
            }
        }

        if (categoryList.length > 0) {
            const id = params.objectId
            let questionIds = ''
            getQuestionIds(categoryList, id, res => {
                questionIds = res
            })
            if (questionIds) {
                getQuestionList(questionIds).then(res => {
                    const data = res.map(item => item.toJSON())
                    setDataSource(data)
                })
            } else {
                message.error('题目不存在')
            }
        }
    }, [categoryList, params])

    const handleSelectOption = (item, index) => {
        const choice = item.correctAnswer.choice
        const questionId = item.id
        let status = ''
        if (choice == index) {
            status = 'correct'
        } else {
            status = 'wrong'
        }
        const newDataSource = dataSource.map(item => {
            if (item.id === questionId) {
                return {
                    ...item,
                    answerVisible: true,
                    status,
                    selectIndex: index,
                }
            } else {
                return item
            }
        })
        setDataSource(newDataSource)
    }

    const handleClose = item => {
        const questionId = item.id
        const newDataSource = dataSource.map(item => {
            if (item.id === questionId) {
                return {
                    ...item,
                    answerVisible: false,
                    status: '',
                    selectIndex: '',
                }
            } else {
                return item
            }
        })
        setDataSource(newDataSource)
    }

    return (
        <div className='wrap'>
            <h2>错题整理</h2>
            <div className='wrap-print'>
                <div className='list'>
                    {dataSource.map((item, index) => {
                        let layout = 'four'
                        // 任一选项文字长度超过10，则选择两栏布局
                        // 任一选项文字长度超过20，则选择一栏布局
                        // 否则使用四栏布局
                        const itemLength = []
                        item.accessories[0].options.forEach(item => {
                            itemLength.push(item.length)
                        })
                        const len = Math.max(...itemLength)
                        if (len >= 20) {
                            layout = 'one'
                        } else if (len > 10) {
                            layout = 'two'
                        }
                        const cls = classNames({
                            question: true,
                            [item.status]: item.status,
                        })
                        return (
                            <div key={item.id} className='item'>
                                <div className={cls}>
                                    <span>{index + 1}.</span>
                                    <div className='content'>
                                        <div className='title'>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            ></span>
                                        </div>

                                        <div className={`options ${layout}`}>
                                            {item.accessories[0] &&
                                                item.accessories[0].options.map(
                                                    (option, pos) => {
                                                        const mapIndexToLetter =
                                                            ['A', 'B', 'C', 'D']
                                                        let status =
                                                            pos ==
                                                                item.selectIndex &&
                                                            item.status ==
                                                                'correct'
                                                                ? 'correct'
                                                                : 'wrong'
                                                        const optionCls =
                                                            classNames({
                                                                option: true,
                                                                [status]:
                                                                    pos ===
                                                                    item.selectIndex,
                                                            })
                                                        return (
                                                            <div
                                                                key={pos}
                                                                onClick={() =>
                                                                    handleSelectOption(
                                                                        item,
                                                                        pos
                                                                    )
                                                                }
                                                                className={
                                                                    optionCls
                                                                }
                                                            >
                                                                <span className='num'>
                                                                    {
                                                                        mapIndexToLetter[
                                                                            pos
                                                                        ]
                                                                    }
                                                                    .
                                                                </span>
                                                                <span
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: option,
                                                                    }}
                                                                ></span>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                        </div>
                                    </div>
                                </div>
                                {item.answerVisible && (
                                    <Answer
                                        onClose={() => handleClose(item)}
                                        data={item}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default XingCeList
