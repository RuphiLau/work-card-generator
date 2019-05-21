import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles.less'

@CSSModules(styles, { allowMultiple: true })
export default class Header extends Component {
    render() {
        return (
            <div styleName="header">
                <div className="g-wrapbox">
                    <div styleName="systemName">WorkCardGenerator</div>
                </div>
            </div>
        )
    }
}