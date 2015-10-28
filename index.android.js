'use strict';

let React = require('react-native');

let {
  View,
  Component,
  requireNativeComponent,
  PropTypes,
  DeviceEventEmitter,
  Image
} = React;


/* Default properties */
let DEFAULTS = {
  center: { lat: 51.506423, lng: -0.119108 },
  zoomLevel: 1,
  markers: [],
  zoomOnMarkers: false
};

/* RNGMAPS COMP */
var gmaps = {
  name: 'RNGMaps',
  propTypes: {
    center: PropTypes.object,
    zoomLevel: PropTypes.number,
    markers: PropTypes.array,
    zoomOnMarkers: PropTypes.bool,

    /* Hackedy hack hack hack */
    scaleX: React.PropTypes.number,
    scaleY: React.PropTypes.number,
    translateX: React.PropTypes.number,
    translateY: React.PropTypes.number,
    rotation: React.PropTypes.number,
  },
};

let MapView = requireNativeComponent('RNGMaps', gmaps);

class RNGMaps extends Component {
  constructor (props) {
    super(props);
    this._event = null;
    this.state = {
      zoomOnMarkers: false
    }
  }

  componentDidMount () {
    this._event = DeviceEventEmitter.addListener('mapChange', (e: Event) => {
      this.props.onMapChange&&this.props.onMapChange(e);
    });
  }

  componentWillUnmount () {
    this._event&&this._event.remove();
  }

  zoomOnMarkers () {
    this.setState({ zoomOnMarkers: true })
  }

  render () {
    return ( <MapView { ...this.props } zoomOnMarkers={ this.state.zoomOnMarkers } /> );
  }
}

module.exports = RNGMaps;
