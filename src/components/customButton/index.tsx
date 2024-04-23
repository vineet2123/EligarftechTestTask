import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/constants';

type Props = {
  text: string;
  isEnabled: boolean;
  onPress: () => void;
};

export const CustomButton = ({text, isEnabled, onPress}: Props) => {
  return (
    <TouchableOpacity
      disabled={!isEnabled}
      style={[styles.container, isEnabled ? styles.enabledButton : {}]}
      onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    backgroundColor: Colors.disabledButton,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  textStyle: {
    color: Colors.white,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  enabledButton: {
    backgroundColor: Colors.enabledButton,
  },
});
