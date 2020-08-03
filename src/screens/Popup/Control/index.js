import React from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './index.css';

const Control = ({ getNextImg, getPreviousImg, id, prevBtnDisabled, nextBtnDisabled }) => {
  return (
    <div className="controls">
      <Button
        className={prevBtnDisabled && "btn__disabled"}
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => { !prevBtnDisabled && getPreviousImg(id) }}
      />
      <Button
        className={nextBtnDisabled && "btn__disabled"}
        shape="circle"
        icon={<RightOutlined />}
        onClick={() => { !nextBtnDisabled && getNextImg(id); }}
      />
    </div>
  );
}

export default Control;