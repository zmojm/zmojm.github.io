import React, { useEffect, useState } from 'react'
import { Upload, Tree, Button } from 'antd'
import { getCategoryQuestion } from '../../service/question'
import '../xingce/XingCe.scss'
import { useHistory } from 'react-router'
import { getBookList } from '../../service/exam'

const XingCe = () => {
    const [categoryList, setCategoryList] = useState([])
    const history = useHistory()
    useEffect(() => {
        getCategoryQuestion('625d56e11122b910ec683964').then(res => {
            const data = res.toJSON().content
            processCategoryList(data)
            console.log('res', data)
            setCategoryList(data)
        })
    }, [])

    // 开始练习
    const handleClickPractice = (questionIds, id) => {
        history.push({
            pathname: `/book/${questionIds.toString()}`,
        })

        // getBookList(questionIds).then(res => {
        //     console.log('res', res.length, questionIds.length)
        //     const data = res
        //         .map(item => item.toJSON())
        //         .sort(
        //             (a, b) =>
        //                 b.questionMeta.totalCount - a.questionMeta.totalCount
        //         )
        //     window.localStorage.setItem('dataSource', JSON.stringify(data))
        // })
    }

    /**
     * 17:36
     * [ 335, 337, 351, 357 ]
     * 337：
     * 351：拓展才能体现将范围扩大，而推广并没有这个意思
     * 357：前文说到不仅是无视，因此填空处要比无视的力度要强，因此抹杀比漠视更好
     */
    const processCategoryList = data => {
        // 处理数据
        data.forEach(item => {
            item.title = (
                <div className='category-item'>
                    <div className='name'>{item.name}</div>
                    <div className='num'>{item.questionIds.length}题</div>
                    <div className='practice'>
                        <Button
                            onClick={() =>
                                handleClickPractice(item.questionIds, item.id)
                            }
                            shape='round'
                        >
                            练习
                        </Button>
                    </div>
                </div>
            )
            item.key = item.id
            if (item.children) {
                processCategoryList(item.children)
            }
        })
    }

    return (
        <div className='xing-ce-book'>
            <div className='category'>
                <Tree className='xing-ce-tree' treeData={categoryList} />
            </div>
        </div>
    )
}

export default XingCe
