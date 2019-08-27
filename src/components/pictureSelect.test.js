import React from 'react';
import PictureSelect from './pictureSelect';
import { render, fireEvent } from '@testing-library/react';
import { pictures } from '../App'


it('can be checked by value', () => {
  const value = [ '1', '2' ];

  const props = {
    value,
    onChange: value => console.log(value),
    pictures,
  }

  const { getByTestId } = render(<PictureSelect {...props} />);

  // 全选框
  expect(getByTestId('selectAll').checked).toEqual(false);
  expect(getByTestId('selectNum').innerHTML).toEqual('2');
  
  // 单选
  pictures.map(({id}) => {
    expect(getByTestId(`${id}-input`).checked).toEqual(value.includes(id))  
  })
});

it('can be fireEvent by value', async () => {
  let value = [];

  const props = {
    value,
    pictures,
    onChange: val => value = val,
  }

  const { getByTestId, rerender } = render(<PictureSelect {...props} />);

  // 全选框
  expect(getByTestId('selectAll').checked).toEqual(false);


  // 单选
  pictures.map(({id}) => {
    expect(getByTestId(`${id}-input`).checked).toEqual(false)  
  })

  // 全选
  fireEvent.click(
    getByTestId('selectAll'),
  )
  expect(value).toEqual(['1', '2', '3']);
  rerender(<PictureSelect { ...props } value={value} />)
  expect(getByTestId('selectNum').innerHTML).toEqual(pictures.length.toString());
  expect(getByTestId('selectAll').checked).toEqual(true);
  pictures.map(({id}) => {
    expect(getByTestId(`${id}-input`).checked).toEqual(true)  
  });

  // 全不选
  fireEvent.click(
    getByTestId('selectAll'),
  )
  expect(value).toEqual([]);
  rerender(<PictureSelect { ...props } value={value} />)
  expect(getByTestId('selectNum').innerHTML).toEqual('0');
  expect(getByTestId('selectAll').checked).toEqual(false);
  pictures.map(({id}) => {
    expect(getByTestId(`${id}-input`).checked).toEqual(false)  
  });

  // 选中id为2的图片
  fireEvent.click(
    getByTestId('2-input'),
  )
  expect(value).toEqual(['2']);
  rerender(<PictureSelect { ...props } value={value} />)
  expect(getByTestId('selectNum').innerHTML).toEqual('1');
  expect(getByTestId('selectAll').checked).toEqual(false);
  pictures.map(({id}) => {
    expect(getByTestId(`${id}-input`).checked).toEqual(id === '2')  
  });

});