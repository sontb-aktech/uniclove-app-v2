import React from 'react';
import {StyleSheet, View} from 'react-native';
const TemplateComponent = () => {
  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TemplateComponent;
