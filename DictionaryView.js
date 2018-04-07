class DictionaryView {
  constructor() {
    this._btnLeft = document.querySelector('#btn_left');
    this._btnRight = document.querySelector('#btn_right');
    this._webview = document.querySelector('#wv');
    this._bindDomEvent();
  }

  _bindDomEvent() {
    this._btnLeft.addEventListener('click', () => {
      if (this._webview.canGoBack()) {
        this._webview.goBack();
      }
    });
    this._btnRight.addEventListener('click', () => {
      if (this._webview.canGoForward()) {
        this._webview.goForward();
      }
    });
  }
}

module.exports = {
  DictionaryView,
};
