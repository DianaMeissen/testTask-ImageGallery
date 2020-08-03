import React from 'react';
import { Tag, Descriptions } from 'antd';

import './index.css';

const Description = ({ tags, author, camera }) => {
  return (<>
    <Descriptions bordered>
      <Descriptions.Item label="Author">{author}</Descriptions.Item>
      {camera && <Descriptions.Item label="Camera">{camera}</Descriptions.Item>}
    </Descriptions>
    <div style={{ marginTop: "16px", width: "fit-content" }}>
      <span>Tags: </span><span>{tags && tags.trim().split(' ').map(tag => <Tag key={tag}>{tag}</Tag>)}</span>
    </div>
  </>
  );
}

export default Description;