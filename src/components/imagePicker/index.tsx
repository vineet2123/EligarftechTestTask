import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/constants';
import {videoCameraIcon} from '../../assets';
import {PickerModal} from './pickerModal';

type Props = {
  imagesArray: string[];
  setImagesArray: (prev: string[]) => void;
};

export const ImagePicker = ({imagesArray, setImagesArray}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsVisible(true)}>
        <Image source={videoCameraIcon} style={styles.videoIcon} />
        <Text style={styles.textStyle}>Add Media</Text>
      </TouchableOpacity>
      <PickerModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        imagesArray={imagesArray}
        setImagesArray={setImagesArray}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(80),
    height: moderateScale(70),
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginVertical: moderateScale(5),
  },
  textStyle: {
    color: Colors.mediaBlue,
    marginTop: moderateScale(5),
  },
  videoIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});
