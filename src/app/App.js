import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Switch, useParams } from 'react-router-dom'
import Header from '../feature/edit/Header/Header'
import Annotation from '../feature/edit/Annotation/Annotation'
import Comment from '../feature/edit/Comment/Comment'
import Highlighter from 'web-highlighter'
import './App.scss'
import Admin from '../feature/admin/Admin'
import Algorithm from '../feature/algorithm/Algorithm'
import Calc from '../feature/calc/Calc'
import Test from './test'

const Edit = () => {
    const params = useParams()
    const [highlighter, setHighlighter] = useState(
        new Highlighter({
            exceptSelectors: ['.ant-list-item'],
        })
    )
    useEffect(() => {
        const h = new Highlighter({
            exceptSelectors: ['.ant-list-item'],
        })
        setHighlighter(h)

        return () => {
            h.dispose()
        }
    }, [params])

    return (
        <div className='yryr-home'>
            <Header />
            <div className='main'>
                <Annotation key={highlighter} highlighter={highlighter} />
                <Comment key={highlighter} highlighter={highlighter} />
            </div>
        </div>
    )
}

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' component={Admin} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/edit/:objectId' component={Edit} />
                <Route exact path='/algorithm' component={Algorithm} />
                <Route exact path='/calc' component={Calc} />
                <Route exact path='/test' component={Test} />
                {/* <Route path='/result' component={Result} /> */}
            </Switch>
        </HashRouter>
    )
}

export default App
