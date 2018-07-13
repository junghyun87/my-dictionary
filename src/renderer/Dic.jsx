import React, { Component } from 'react';
import { Link } from 'react-router';
import * as Mousetrap from 'mousetrap';
import './Dic.css';
import { RingLoader } from 'react-spinners';
const { ipcRenderer } = require('electron');

class Dic extends Component {
  constructor() {
    super();
    this.handleAppClick = this.handleAppClick.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleQuickClick = this.handleQuickClick.bind(this);
    this.handleShortcut = this.handleShortcut.bind(this);
    this.handleStartLoading = this.handleStartLoading.bind(this);
    this.handleStopLoading = this.handleStopLoading.bind(this);
    this.handleESC = this.handleESC.bind(this);
    if (localStorage.getItem('dictionaries') === null) {
      console.log('Local storage does not have dictionaries key');
      localStorage.setItem(
        'dictionaries',
        JSON.stringify([
          {
            name: 'Dictionary.com',
            url: 'http://www.dictionary.com/',
          },
          {
            name: "Oxford learner's Dict.",
            url: 'https://www.oxfordlearnersdictionaries.com/',
          },
          {
            name: 'Naver Korean-English Dict.',
            url: 'http://m.endic.naver.com/',
          },
          {
            name: 'Google',
            url: 'https://www.google.com/',
          },
        ])
      );
    }
    this.dictionaries = JSON.parse(localStorage.getItem('dictionaries'));
    this.state = {
      webview_url: 'https://www.oxfordlearnersdictionaries.com/',
      is_loading: false,
    };
  }

  handleShortcut(number) {
    console.log('shortchut function!', number);
    if (number === 0) {
      this.props.router.push('/config');
    } else {
      this.setState({ webview_url: this.dictionaries[number - 1].url });
    }
  }

  componentDidMount() {
    this.dictionaries.forEach((d, i) => {
      Mousetrap.bind(`command+${i + 1}`, () => {
        this.handleShortcut(i + 1);
      });
    });
    Mousetrap.bind(`command+0`, () => {
      this.handleShortcut(0);
    });
    Mousetrap.bind('esc', () => {
      this.handleESC();
    });
    const { _webview } = this.refs;
    _webview.addEventListener('did-start-loading', this.handleStartLoading);
    _webview.addEventListener('did-stop-loading', this.handleStopLoading);
  }

  componentWillUnmount() {
    const { _webview } = this.refs;
    _webview.removeEventListener('did-start-loading', this.handleStartLoading);
    _webview.removeEventListener('did-stop-loading', this.handleStopLoading);
  }
  handleAppClick(e) {
    const { _options } = this.refs;
    if (_options.style.display === 'block') {
      _options.style.display = 'none';
    }
  }
  handleESC() {
    const { _options } = this.refs;
    if (_options.style.display === 'block') {
      _options.style.display = 'none';
    } else {
      ipcRenderer.send('hide-me');
    }
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

  handleMoreClick(e) {
    const { _options } = this.refs;
    _options.style.display === 'none' || _options.style.display === ''
      ? (_options.style.display = 'block')
      : (_options.style.display = 'none');
    e.stopPropagation();
  }

  handleMenuItemClick(dicURL, e) {
    this.setState({ webview_url: dicURL });
    const { _options } = this.refs;
    _options.style.display = 'none';
    e.preventDefault();
  }

  handleEditClick(e) {
    this.props.router.push('/config');
    e.preventDefault();
  }

  handleStartLoading(e) {
    this.setState({
      is_loading: true,
    });
  }

  handleStopLoading(e) {
    this.setState({
      is_loading: false,
    });
  }

  handleQuickClick(e) {
    ipcRenderer.send('close-me');
  }

  render() {
    const dropdown_items = this.dictionaries.map((dic, i) => {
      return (
        <div key={i} onClick={e => this.handleMenuItemClick(dic.url, e)}>
          <span>{dic.name}</span>
          {i < 10 ? <span>⌘{i + 1}</span> : null}
        </div>
      );
    });

    return (
      <div onClick={e => this.handleAppClick(e)}>
        <header className="toolbar toolbar-header">
          <h1 className="title">My Dictionary</h1>
          <div className="toolbar-actions">
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
            <div className="btn-group">
              <RingLoader
                color={'#123abc'}
                loading={this.state.is_loading}
                size={20}
              />
            </div>

            <div id="right-menu" className="pull-right">
              <button
                className="btn btn-default btn-dropdown dropdown"
                id="edit-button"
                onClick={e => this.handleMoreClick(e)}>
                <span className="icon icon-menu" />
              </button>
              <div className="dropdown-content" ref="_options">
                {dropdown_items}
                <div onClick={e => this.handleEditClick(e)}>
                  <span>Edit dictionaries</span>
                  <span>⌘0</span>
                </div>
                <div onClick={e => this.handleQuickClick(e)}>
                  <span>Quit</span>
                  <span>⌘Q</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="window-content">
          <webview
            ref="_webview"
            src={this.state.webview_url}
            useragent="Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36"
            className="webview-style"
          />
        </div>
      </div>
    );
  }
}

export default Dic;
