import React from 'react';
import { default as DropdownLib } from 'react-dropdown';
import cx from 'classnames';

interface PropTypes {
  onChange: (e: { value: string }) => void;
  value: string;
  placeholder?: string;
  options: { value: string; label: string }[] | string[];
  small?: boolean;
}

const Dropdown = ({
  onChange,
  value,
  placeholder,
  options,
  small,
}: PropTypes) => (
  <DropdownLib
    className={cx('source-dropdown', { small })}
    controlClassName={cx('source-dropdown-control', { small })}
    menuClassName={cx('source-dropdown-menu', { small })}
    arrowClassName={cx('source-dropdown-arrow', { small })}
    options={options}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
  />
);

export default Dropdown;
