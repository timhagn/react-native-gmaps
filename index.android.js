'use strict';

let React = require('react-native');

let {
  View,
  Component,
  requireNativeComponent,
  PropTypes,
  DeviceEventEmitter
} = React;

/* RNGMAPS COMP */
var gmaps = {
  name: 'RNGMaps',
  propTypes: {
    center: PropTypes.object,
    zoomLevel: PropTypes.number,
    markers: PropTypes.array,
    zoomOnMarkers: PropTypes.bool
  },
};

let DEFAULTS = {
  center: { lat: 51.506423, lng: -0.119108 },
  zoomLevel: 10,
  markers: [],
  zoomOnMarkers: false
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
    this._event = DeviceEventEmitter.addListener('mapChange', function(e: Event) {
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
    let { props } = this;

    for (var key in DEFAULTS) {
      if (!props.hasOwnProperty(key)) {
        props[key] = DEFAULTS[key];
      }
    }

    return ( <MapView { ...props } zoomOnMarkers={ this.state.zoomOnMarkers } /> );
  }
}

module.exports = RNGMaps;
