import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './pictureSelect.css';

class PictureSelect extends Component {

  onChange = (id) => {
    const { value, onChange } = this.props;
    const isChecked = _.includes(value, id);
    const newValue = _.cloneDeep(value);
    if(isChecked) {
      newValue.splice(newValue.indexOf(id), 1);
      onChange(newValue);
    } else {
      onChange([...newValue, id]);
    }
  }

  // 判断是否全选
  isSelectAll = () => {
    const { pictures, value } = this.props;
    return pictures.every(({ id }) => value.includes(id));
  }

  // 选中全部
  selectAll = (isSelectAll) => {
    const { onChange, pictures } = this.props;
    onChange(isSelectAll ? pictures.map(({ id }) => id) : [])
  }

  render() {
    const { pictures, value } = this.props;
    const isSelectAll = this.isSelectAll();
    return (
      <div>
        <p className="seletAll">
          <input type="checkbox" 
            id="selectAll"
            data-testid="selectAll"
            onChange={({ target: { checked } }) => this.selectAll(checked)}
            checked={isSelectAll}
          />
          已选中<span data-testid="selectNum">{value.length}</span>张图片
        </p>
        {
          pictures.map(({ id, url, name }) => (
            <div className="pictureContent" key={id}>
              <input 
                className="picChecked" 
                data-testid={`${id}-input`} 
                type="checkbox" 
                checked={value.includes(id)}  
                onChange={() => this.onChange(id)} 
              />
              <img src={url} />
              <p>{name}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

PictureSelect.defaultProps = {
  pictures: [],
  value: [],
}

PictureSelect.propTypes = {
  pictures: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PictureSelect;