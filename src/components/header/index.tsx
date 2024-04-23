import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/constants';
import {moderateScale} from '../../utils/helper';
import {backIcon} from '../../assets';

type Props = {
  title: string;
};

export const Header = ({title}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={backIcon} style={styles.backIconStyle} />
      <Text style={styles.headerText}>{title}</Text>
      <Text>{'    '}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: moderateScale(20),
  },
  headerText: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(20),
  },
  backIconStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});
