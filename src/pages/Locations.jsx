import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import InfiniteScroll from 'react-infinite-scroll-component';

const Locations = () => {
  // TODO render all
  let { locations } = useGlobalContext();

  const itemsPerPage = 15;
  const [renderedLocations, setRenderedLocations] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const initialLoad = () => {
      console.log('here');
      setRenderedLocations(
        locations.slice(0, itemsPerPage).map((l) => locationToElement(l))
      );
      if (itemsPerPage >= locations.lenght) {
        setHasMore(false);
      }
    };
    initialLoad();
  }, [locations]);

  const loadMore = () => {
    const renderedAmount = renderedLocations.length;
    const newLocations = locations
      .slice(renderedAmount, renderedAmount + itemsPerPage)
      .map((location) => locationToElement(location));

    const transformedRenderedLocations = [
      ...renderedLocations,
      ...newLocations,
    ];
    setTimeout(() => {
      setRenderedLocations(transformedRenderedLocations);
    }, 250);

    if (transformedRenderedLocations.length === locations.lenght) {
      setHasMore(false);
    }
  };

  const locationToElement = (location) => {
    return (
      <div className="location-card" key={location.id}>
        <div className="location-card-name">{location.canonicalName}</div>
        <div>type: {location.type}</div>
        <div>
          coordinates: {location.latitude} {location.longitude}
        </div>
      </div>
    );
  };

  return (
    <InfiniteScroll
      dataLength={renderedLocations.length}
      next={loadMore}
      hasMore={hasMore}
      // TODO add proper loader
      loader={
        <div style={{ fontSize: '3rem', marginLeft: '45%' }}>Loading</div>
      }
    >
      <div className="locations-container">
        <div className="locations">{renderedLocations}</div>
      </div>
    </InfiniteScroll>
  );
};

export default Locations;
