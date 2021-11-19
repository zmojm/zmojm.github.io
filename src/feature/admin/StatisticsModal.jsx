import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table, Select, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

const StatisticsModal = props => {
    const { visible, count, onOk, onCancel } = props
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [dataSource, setDataSource] = useState([])
    //
    const config = useSelector(state => state.annotation.config)

    const handleEdit = () => {
        onCancel && onCancel()
    }

    const handleCancel = () => {
        console.log('？？？调用一下啊')
        onCancel && onCancel()
    }
    console.log('annotationList', config)
    return (
        <Modal
            title='统计分析'
            okText='确定'
            cancelText='取消'
            confirmLoading={loading}
            visible={visible}
            onOk={handleEdit}
            width={800}
            onCancel={handleCancel}
        >
            <div>字数统计：{count}字</div>
        </Modal>
    )
}

export default StatisticsModal
