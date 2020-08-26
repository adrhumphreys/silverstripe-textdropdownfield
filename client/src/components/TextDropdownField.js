import React, {useEffect, useState} from 'react';
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
  let [dropdownOpen, setDropdownOpen] = useState(false)
  let [content, setContent] = useState(textField.value)
  let [dropdown, setDropdown] = useState(dropdownField.value)
  let dropdownOptions = dropdownField.source

  useEffect(() => {
    setContent(textField.value)
  },[textField.value])

  useEffect(() => {
    setDropdown(dropdownField.value)
  },[dropdownField.value])

  useEffect(() => {
    if (typeof onAutofill !== "function") {
      return;
    }

    onAutofill(textField.name, content)
  }, [content])

  useEffect(() => {
    if (typeof onAutofill !== "function") {
      return;
    }

    onAutofill(dropdownField.name, dropdown)
  }, [dropdown])

  return (
    <InputGroup>
      <Input
        name={textField.name}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <InputGroupButtonDropdown
        name={dropdownField.name}
        addonType="append"
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(!dropdownOpen)}
      >
        <DropdownToggle caret outline>
          {dropdownOptions.find(option => option.value === dropdown).title}
        </DropdownToggle>
        <DropdownMenu>
          {dropdownOptions.map(option => (
            <DropdownItem
              dangerouslySetInnerHTML={{__html: option.title}}
              value={option.value}
              disabled={option.disabled}
              onClick={() => setDropdown(option.value)}
            />
          ))}
        </DropdownMenu>
      </InputGroupButtonDropdown>
    </InputGroup>
  )
}

export default fieldHolder(TextDropdownField);
