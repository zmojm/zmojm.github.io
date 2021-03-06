import LC from './index'

/**
 * 添加文章
 * @param {*} data
 * @returns
 */
export const createArticle = data => {
    // 文章表里添加文章相关数据
    const Configs = LC.Object.extend('Article')
    const configs = new Configs()
    Object.keys(data).forEach(key => {
        configs.set(key, data[key])
    })
    return configs.save()
}

/**
 * 添加文章内容
 * @param {*} data
 * @returns
 */
// export const createArticle = data => {
//     const Configs = LC.Object.extend('Article')
//     const configs = new Configs()
//     Object.keys(data).forEach(key => {
//         configs.set(key, data[key])
//     })
//     return configs.save()
// }

// 从leanCloud获取数据
export const getArticleFromLeanCloud = objectId => {
    const query = new LC.Query('Article')
    query.descending('createdAt')
    if (objectId) return query.get(objectId)
    else {
        query.limit(500)
        return query.find()
    }
}

// update
export const updateArticleToLeanCloud = (objectId, data) => {
    const config = LC.Object.createWithoutData('Article', objectId)
    Object.keys(data).forEach(key => {
        config.set(key, data[key])
    })
    return config.save()
}

// delete
export const deleteArticleToLeanCloud = objectId => {
    const todo = LC.Object.createWithoutData('Article', objectId)
    return todo.destroy()
}
