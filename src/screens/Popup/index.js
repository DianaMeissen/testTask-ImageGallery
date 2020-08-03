import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Modal, Button } from 'antd';

import Description from './Description';
import Control from './Control';

import * as helpers from '../../helpers';

import './index.css';

const { storeData, fetchPhotoDetails, getData } = helpers;

const Popup = ({ isPopupVisible,
  selectedImage,
  togglePopup,
  getPreviousImg,
  getNextImg,
  prevBtnDisabled,
  nextBtnDisabled
}) => {
  const [img, setImg] = useState({});

  useEffect(() => {
    if (isPopupVisible) {
      if (getData(selectedImage.id)) {
        setImg(JSON.parse(getData(selectedImage.id)));
      } else {
        (async function () {
          const imagesData = await fetchPhotoDetails(selectedImage.id);
          storeData(imagesData.id, JSON.stringify(imagesData));
          setImg(imagesData);
        })()
      };
    }
  }, [selectedImage, isPopupVisible]);

  return (
    <Modal
      visible={isPopupVisible}
      centered={true}
      closable={true}
      onCancel={() => togglePopup(null)}
      width={'50%'}
      footer={null}
    >
      <div className="popup__inner_container">
        <Control
          getNextImg={getNextImg}
          getPreviousImg={getPreviousImg}
          id={img.id}
          prevBtnDisabled={prevBtnDisabled}
          nextBtnDisabled={nextBtnDisabled}
        />

        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="zoom__tools">
                <Button
                  className="margin-right"
                  shape="circle"
                  onClick={zoomIn}
                >+</Button>
                <Button
                  className="margin-right"
                  shape="circle"
                  onClick={zoomOut}
                >-</Button>
                <Button
                  shape="circle"
                  onClick={resetTransform}
                >x</Button>
              </div>
              <TransformComponent>
                <img alt="desc from server" className="popup__img" src={img.full_picture} />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>

        <Description
          tags={img.tags}
          author={img.author}
          camera={img.camera}
        />
      </div>
    </Modal>)

}

export default Popup;