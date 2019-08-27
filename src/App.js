import React from 'react';
import PictureSelect from './components/pictureSelect';
import './App.css';

export const pictures = [
  {
    id: '1',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
  {
    id: '2',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
  {
    id: '3',
    name: 'foo',
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
];

function App() {
  const [ value, setValue ] = React.useState(['1']);
  return (
    <div className="App">
      <PictureSelect pictures={pictures} value={value} onChange={(value) => setValue(value)} />
    </div>
  );
}

export default App;
