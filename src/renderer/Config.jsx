import React, { Component } from 'react';

class Config extends Component {
  render() {
    return (
      <ul class="list-group" id="data">
        <li class="list-group-item">
          <div class="media-body">
            <strong>Item URL</strong>
            <p>
              title
              <span class="icon icon-trash pull-right" />
            </p>
          </div>
        </li>
      </ul>
    );
  }
}

export default Config;
