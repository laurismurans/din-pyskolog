import { useEffect, useState } from 'react';
import './App.css';
import getLaunchesJson from './api/getLaunches';
import { getSpaceXLaunchesWithFlickrImages } from './services/launchFilterService';

function App() {
  const [currentFlight, setCurrentFlight] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!currentFlight) {
      return;
    }
    setImageUrls(currentFlight.links.flickr.original);
    setImageUrl(currentFlight.links.flickr.original[0]); // TODO make random
  }, [currentFlight])

  const getLaunches = async () => {
    const spaceXData = await getLaunchesJson();

    const filteredData = getSpaceXLaunchesWithFlickrImages(spaceXData, 4);

    setCurrentFlight(filteredData[0]);
  }

  const randomPicture = () => {
    const randomImageIndex = Math.floor(Math.random() * imageUrls.length);
    setImageUrl(imageUrls[randomImageIndex]);
  }

  const nextPicture = () => {
    const currentIndex = imageUrls.indexOf(imageUrl);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % imageUrls.length;
      setImageUrl(imageUrls[nextIndex]);
    }
  }

  return (
    <div style={{padding: "0 20px"}}>
      <button onClick={getLaunches}>Get Launches</button>

      <div style={{display: "flex", width: "100%", justifyContent: "center", marginTop: "20px"}}>
        {currentFlight && imageUrl && <img src={imageUrl} style={{ width: '100%', maxWidth: "600px" }}/>}
      </div>

      <div className="flex space-x-4">
        <button onClick={nextPicture} className="flex items-center">
          Next
        </button>
        <button onClick={randomPicture} variant="outline" className="flex items-center">
          Random
        </button>
      </div>
    </div>
  );
}

export default App;
