import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  const { handleAddressSelection } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleConfirmAddress = () => {
    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation;
      handleAddressSelection(latitude, longitude);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        region={region}
        onRegionChangeComplete={setRegion}
        zoomEnabled={true}
        zoomControlEnabled={true}
        zoomTapEnabled={true}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} anchor={{ x: 0.5, y: 0.5 }} />
        )}
      </MapView>
      {selectedLocation && (
        <View style={styles.confirmButtonContainer}>
          <Button title="Confirm Address" onPress={handleConfirmAddress} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
});

export default MapScreen;