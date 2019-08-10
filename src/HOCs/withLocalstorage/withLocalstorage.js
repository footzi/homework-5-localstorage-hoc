import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (localStorageKey, defaultData) => (WrappedComponent) => {
  return class extends Component {
    static displayName = localStorageKey;

    saveData = (data) => {
      save(localStorageKey, data);
      
      this.forceUpdate();
    }
    
    render() {
      const savedData = load(localStorageKey) || defaultData;

      return (
        <WrappedComponent savedData={savedData} saveData={this.saveData} />
      )
    }
  }
};

export default withLocalstorage;
