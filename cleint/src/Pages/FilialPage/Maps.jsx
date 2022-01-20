import React from 'react';
import { YMaps, Map, Placemark, FullscreenControl, GeolocationControl, ZoomControl } from 'react-yandex-maps';

// const mapState = { center: [41.363374, 69.288652], zoom: 15 };

class Maps extends React.Component {
  state = { width: '100%', height: 452, small: true };
  render() {
    console.log(this.props);
    const { width, height, small } = this.state;
    return (
      <YMaps>
        <div id="map-basics">
          <Map state={{ center: [(this.props.brunchItem.locationPosition[0]), (this.props.brunchItem.locationPosition[1])], zoom: 16 }} width={width} height={height}>
              <Placemark  geometry={[(this.props.brunchItem.locationPosition[0]), (this.props.brunchItem.locationPosition[1])]}  />
              <FullscreenControl options={{float: 'right'}} />
              <GeolocationControl options={{float: 'left'}} />
              <ZoomControl options={{float: 'left'}} />
          </Map>
        </div>
      </YMaps>
    );
  }
}

export default Maps;