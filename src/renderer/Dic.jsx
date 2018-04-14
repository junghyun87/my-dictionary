import React, { Component } from 'react';
import { Link } from 'react-router';

const wv_style = { display: 'inline-flex', width: 360, height: 500 };

class Dic extends Component {
  constructor() {
    super();
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
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
            <button className="btn btn-default btn-dropdown pull-right">
              <span className="icon icon-menu" />
            </button>
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
