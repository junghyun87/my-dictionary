import React, { Component } from 'react';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) => <li>{value}</li>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ol>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.name} />
      ))}
    </ol>
  );
});

class Config extends Component {
  constructor() {
    super();
    this.handleBackClick = this.handleBackClick.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    const dictionaries = JSON.parse(localStorage.getItem('dictionaries'));
    // const dictionaryNames = this.dictionaries.map(d => d.name);
    this.state = {
      items: dictionaries,
    };
  }

  onSortEnd({ oldIndex, newIndex }) {
    const newOrder = arrayMove(this.state.items, oldIndex, newIndex);
    this.setState({
      items: newOrder,
    });
    console.log(newOrder);
    localStorage.setItem('dictionaries', JSON.stringify(newOrder));
  }

  handleBackClick() {
    this.props.router.push('/dic');
  }

  render() {
    return (
      <div>
        <header className="toolbar toolbar-header">
          <h1 className="title">Config</h1>
          <div className="toolbar-actions">
            <button className="btn btn-default" onClick={this.handleBackClick}>
              <span className="icon icon-back" />
              <span>Back to Dictionary</span>
            </button>
          </div>
        </header>

        <div className="window-content">
          <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
        </div>
      </div>
    );
  }
}

export default Config;
