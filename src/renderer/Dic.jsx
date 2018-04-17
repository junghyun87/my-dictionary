import React, { Component } from 'react';
import { Link } from 'react-router';
import './Dic.css';
const wv_style = { display: 'inline-flex', width: 360, height: 500 };

class Dic extends Component {
  constructor() {
    super();
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  handleLeftClick() {
    const { _webview } = this.refs;
    if (_webview.canGoBack()) {
      _webview.goBack();
    }
  }

  handleRightClick() {
    const { _webview } = this.refs;
    if (_webview.canGoForward()) {
      _webview.goForward();
    }
  }

  handleMoreClick() {
    const { _options } = this.refs;
    console.log(_options.style.display);
    _options.style.display === 'none' || _options.style.display === ''
      ? (_options.style.display = 'block')
      : (_options.style.display = 'none');
  }

  render() {
    return (
      <div>
        <header className="toolbar toolbar-header">
          <div className="toolbar-actions">
            <h1 className="title">Dictionary</h1>
            <div className="btn-group">
              <button
                id="btn_left"
                className="btn btn-default"
                onClick={this.handleLeftClick}>
                <span className="icon icon-left" />
              </button>
              <button
                id="btn_right"
                className="btn btn-default"
                onClick={this.handleRightClick}>
                <span className="icon icon-right" />
              </button>
            </div>
            <div id="right-menu" className="pull-right">
              <button
                className="btn btn-default btn-dropdown dropdown"
                onClick={this.handleMoreClick}>
                <span className="icon icon-menu" />
              </button>
              <div className="dropdown-content" ref="_options">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
          </div>
        </header>

        <div className="window-content">
          <webview
            ref="_webview"
            src="https://www.oxfordlearnersdictionaries.com/"
            style={wv_style}
          />
        </div>
      </div>
    );
  }
}

export default Dic;
