import React, { useEffect, useState } from 'react';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupButtonDropdown
} from 'reactstrap';

const TextDropdownField = (props) => {
  const { textField, dropdownField, onAutofill } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [content, setContent] = useState(textField.value);
  const [dropdown, setDropdown] = useState(dropdownField.value);
  const dropdownOptions = dropdownField.source;

  useEffect(() => {
    setContent(textField.value);
  }, [textField.value]);

  useEffect(() => {
    setDropdown(dropdownField.value);
  }, [dropdownField.value]);

  useEffect(() => {
    if (typeof onAutofill !== 'function') {
      return;
    }

    onAutofill(textField.name, content);
  }, [content]);

  useEffect(() => {
    if (typeof onAutofill !== 'function') {
      return;
    }

    onAutofill(dropdownField.name, dropdown);
  }, [dropdown]);

  const selectedItem = dropdownOptions.find(option => option.value === dropdown);
  // This handles the case where the selected item isn't
  // passed through as the source item as it's been removed
  const selectedTitle = selectedItem ? selectedItem.title : dropdown;

  return (
    <InputGroup>
      <Input
        name={textField.name}
        value={content}
        type="text"
        onChange={e => {
          props.onChange?.(e);
          setContent(e.target.value);
        }}
      />
      <InputGroupButtonDropdown
        name={dropdownField.name}
        addonType="append"
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(!dropdownOpen)}
      >
        <DropdownToggle caret outline>
          {selectedTitle}
        </DropdownToggle>
        <DropdownMenu>
          {dropdownOptions.map(option => (
            <DropdownItem
              dangerouslySetInnerHTML={{ __html: option.title }}
              value={option.value}
              disabled={option.disabled}
              onClick={e => {
                props.onChange?.(e);
                setDropdown(option.value);
              }}
            />
          ))}
        </DropdownMenu>
      </InputGroupButtonDropdown>
    </InputGroup>
  );
};

export default fieldHolder(TextDropdownField);
