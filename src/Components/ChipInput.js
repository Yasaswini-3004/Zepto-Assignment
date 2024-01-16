import React, { useState } from 'react';
import Select from 'react-select';
import Avatar from 'react-avatar';
import Gravatar from 'react-gravatar';
import './ChipComponent.css';

const userOptions = [
  { value: 'john', label: 'john', name: 'John Doe', email: 'john@example.com' },
  { value: 'jane', label: 'jane', name: 'Jane Doe', email: 'jane@example.com' },
  { value: 'bob', label: 'bob', name: 'Bob Smith', email: 'bob@example.com' },
  { value: 'alice', label: 'alice', name: 'Alice Johnson', email: 'alice@example.com' },
  { value: 'charlie', label: 'charlie', name: 'Charlie Brown', email: 'charlie@example.com' },
  { value: 'emma', label: 'emma', name: 'Emma Watson', email: 'emma@example.com' },
  { value: 'alex', label: 'alex', name: 'Alex Turner', email: 'alex@example.com' },
  { value: 'olivia', label: 'olivia', name: 'Olivia Parker', email: 'olivia@example.com' },
  { value: 'michael', label: 'michael', name: 'Michael Jordan', email: 'michael@example.com' },
];

const MySelect = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [removeCounter, setRemoveCounter] = useState(0);

  const formatOptionLabel = (user, { context }) => (
    <div className={`select__multi-value ${selectedItems.indexOf(user) === selectedItems.length - 1 && highlightedIndex !== null ? 'highlighted' : ''}`}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Gravatar
        email={user.email}
        size={20}
        style={{ marginRight: '10px', borderRadius: '50%' }}
      />
      <div>
      <div style={{ fontSize: '16px', color: 'black' }}>{user.name}</div>
      <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
        {context === 'menu' ? user.email : ''}
      </div>
    </div>
    </div>
    </div>
  );

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      if (selectedItems.length > 0 && event.target.value === '') {
        event.preventDefault(); 
        if (highlightedIndex === null) {
          setHighlightedIndex(selectedItems.length - 1);
        } else {
          const updatedSelectedItems = [...selectedItems];
          updatedSelectedItems.splice(highlightedIndex, 1);
          setSelectedItems(updatedSelectedItems);
          setRemoveCounter((prevCounter) => prevCounter + 1);
          setHighlightedIndex(null);
        }
      }
    }
  };

  return (
    <div>
      <h1>Pick Users</h1>
      <Select
        isMulti
        name="users"
        options={userOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Add New Users..."
        formatOptionLabel={formatOptionLabel}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        onKeyDown={handleKeyDown}
        onChange={(selectedOptions) => {
          setSelectedItems(selectedOptions);
          setHighlightedIndex(null);
        }}
        value={selectedItems}
        
      />
    </div>
  );
};

export default MySelect;
