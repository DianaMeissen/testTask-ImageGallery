import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

import 'normalize.css';
import 'antd/dist/antd.css';

import './App.css';

import * as helpers from '../helpers';
import Gallery from '../screens/Gallery';
import Popup from '../screens/Popup';

const { Content } = Layout;
const { fetchPhotos, fetchToken } = helpers;

const App = () => {
  const [isPopupVisible, togglePopupVisibility] = useState(false);
  const [imagesData, setImagesData] = useState({});
  const [page, increasePage] = useState(1);
  const [selectedImage, setSelectedimage] = useState({});
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    (async function () {
      const newImagesData = await fetchPhotos(page);
      imagesData.pictures && (newImagesData.pictures = imagesData.pictures.concat(newImagesData.pictures));
      setImagesData(newImagesData);
    })();
  }, [page]);

  const togglePopup = (image) => {
    if (image) {
      setSelectedimage(image);
      togglePopupVisibility(true);
    } else {
      togglePopupVisibility(false);
      setSelectedimage({});
    }
  }

  async function getNextImg(id) {
    const index = getIndex(id);

    prevBtnDisabled && setPrevBtnDisabled(false);

    if (imagesData.page === imagesData.pageCount) {
      setNextBtnDisabled(true)
    } else if (!imagesData.pictures[index + 2]) {
      increasePage(page + 1);
      setSelectedimage(imagesData.pictures[index + 1]);
    } else {
      setSelectedimage(imagesData.pictures[index + 1]);
    }
  }

  function getPreviousImg(id) {
    const index = getIndex(id);

    nextBtnDisabled && setNextBtnDisabled(false);

    index !== 0 ?
      setSelectedimage(imagesData.pictures[index - 1]) :
      setPrevBtnDisabled(true);
  }

  function getIndex(id) {
    return imagesData.pictures.findIndex(el => el.id === id);
  }

  return (
    <Layout className="App">
      <Content>
        <Gallery
          imagesData={imagesData}
          togglePopup={togglePopup}
        />
        <Popup
          isPopupVisible={isPopupVisible}
          selectedImage={selectedImage}
          togglePopup={togglePopup}
          getPreviousImg={getPreviousImg}
          getNextImg={getNextImg}
          prevBtnDisabled={prevBtnDisabled}
          nextBtnDisabled={nextBtnDisabled}
        />
        <Button
          className="center_btn"
          onClick={() => increasePage(page + 1)}
          shape="round"
        >
          Load more
        </Button>
      </Content>
    </Layout>
  );
}

export default App;
