import React, {useRef, useEffect} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors} from '../../utils/constants';
import {cameraIcon, closeIcon, galleryIcon} from '../../assets';
import {moderateScale} from '../../utils/helper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

type Props = {
  isVisible: boolean;
  setIsVisible: (text: boolean) => void;
  imagesArray: string[];
  setImagesArray: (prev: string[]) => void;
};

export const PickerModal = ({
  isVisible,
  setIsVisible,
  imagesArray,
  setImagesArray,
}: Props) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    let imgArr: string[] = [...imagesArray];
    if (result?.assets) {
      imgArr?.unshift(result?.assets[0]?.uri || '');
      setImagesArray?.([...imgArr]);
      setIsVisible?.(false);
    }
  };

  const openLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    let imgArr: string[] = [...imagesArray];
    if (result?.assets) {
      imgArr?.unshift(result?.assets[0]?.uri || '');
      setImagesArray?.([...imgArr]);
      setIsVisible?.(false);
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{translateY}]}]}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Upload Media</Text>
            <TouchableOpacity onPress={closeModal}>
              <Image source={closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.listView}>
            <TouchableOpacity style={styles.listItem} onPress={openCamera}>
              <Image
                source={cameraIcon}
                style={styles.closeIcon}
                tintColor={Colors.cameraIcon}
              />
              <Text style={styles.listItemText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={openLibrary}>
              <Image source={galleryIcon} style={styles.closeIcon} />
              <Text style={styles.listItemText}>Photo Library</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: 200,
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.black,
    fontSize: moderateScale(20),
    fontWeight: '400',
  },
  closeIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  listView: {
    padding: moderateScale(20),
    marginTop: moderateScale(10),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  listItemText: {
    marginLeft: moderateScale(10),
    color: Colors.black,
    fontSize: moderateScale(15),
  },
});
