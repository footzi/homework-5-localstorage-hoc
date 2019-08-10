import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  state = {
    inputValue: ''
  };

  getId() {
    const { savedData } = this.props;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  createNewRecordByEnter = event => {
    if (event.key === 'Enter') {
      this.createNewRecord();
    } 
  };

  toggleRecordComplete = event => {
    const targetId = event.target.dataset.todoId;
    const { savedData, saveData } = this.props;

    const updateData = savedData.map(item => {
      if (item.id === Number(targetId)) {
        return {
          ...item,
          complete: !item.complete
        };
      } else {
        return item;
      }
    });

    saveData(updateData);
  };

  createNewRecord = () => {
    const { inputValue } = this.state;
    const { savedData, saveData } = this.props;

    if (!inputValue) {
      return;
    }

    const data = {
      id: this.getId(),
      text: inputValue,
      complete: false
    };

    saveData([...savedData, data]);

    this.setState({
      inputValue: ''
    });
  };

  render() {
    const { savedData } = this.props;

    return (
      <Card title="Список дел">
        <div className="todo t-todo-list">
          {this.renderInputField()}
          {savedData.map(this.renderRecord)}
        </div>
      </Card>
    );
  }

  renderInputField() {
    const { inputValue } = this.state;

    return (
      <div className="todo-item todo-item-new">
        <input
          type="text"
          className="todo-input t-input"
          placeholder="Введите задачу"
          onChange={this.handleChange}
          onKeyPress={this.createNewRecordByEnter}
          value={inputValue}
        />
        <span onClick={this.createNewRecord} className="plus t-plus">
          +
        </span>
      </div>
    );
  }

  renderRecord = record => {
    return (
      <div className="todo-item t-todo" key={record.id}>
        <p className="todo-item__text">{record.text}</p>
        <span
          className="todo-item__flag t-todo-complete-flag"
          data-todo-id={record.id}
          onClick={this.toggleRecordComplete}
        >
          [{record.complete ? 'x' : ''}]
        </span>
      </div>
    );
  };
}

export default withLocalstorage('todo-app', [])(Todo);
