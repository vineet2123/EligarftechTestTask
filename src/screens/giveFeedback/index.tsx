import {
  StyleSheet,
  Text,
  Pressable,
  Keyboard,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../components/header';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/constants';
import {
  CustomButton,
  CustomDropdown,
  CustomInput,
  ImagePicker,
} from '../../components';
import {closeIcon} from '../../assets';

const ImageViewComponent = ({
  item,
  onRemove,
}: {
  item: string;
  onRemove: () => void;
}) => {
  return (
    <View style={styles.imageContainer} key={item}>
      <Image source={{uri: item}} style={styles.selectedImageStyle} />
      <TouchableOpacity style={styles.closeIconContainer} onPress={onRemove}>
        <Image
          source={closeIcon}
          style={styles.closeIcon}
          tintColor={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export const GiveFeedback = () => {
  const [purposeValue, setPurposeValue] = useState('');
  const [subjectValue, setSubjectValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [imagesArray, setImagesArray] = useState<string[]>([]);

  const removeImage = (uri: string) => {
    setImagesArray(imagesArray.filter((item: string) => item !== uri));
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Header title="Give Feedback" />
      <Text style={styles.textStyle}>
        We'd love to hear from you. Please tell us how we can help you.
      </Text>
      <CustomDropdown onSelect={setPurposeValue} />
      <CustomInput
        placeholder="Subject*"
        value={subjectValue}
        onChangeText={setSubjectValue}
        isErrorRequired
        maxLimit={100}
      />
      <CustomInput
        placeholder="Message"
        value={messageValue}
        onChangeText={setMessageValue}
        maxLimit={750}
        multiLine
      />
      <View style={styles.pickerView}>
        <ImagePicker
          imagesArray={imagesArray}
          setImagesArray={setImagesArray}
        />
        <FlatList
          data={imagesArray}
          renderItem={({item}: {item: string}) => (
            <ImageViewComponent
              item={item}
              onRemove={() => removeImage(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pickerPadding}
        />
      </View>
      <Text style={styles.textStyle}>
        By sending your feedback, you are allowing us to contact you for more
        details.
      </Text>
      <CustomButton
        text={'SEND'}
        isEnabled={purposeValue?.length && subjectValue?.length ? true : false}
        onPress={() => Alert.alert('Success', 'Your feedback is submitted!')}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
  },
  textStyle: {
    color: Colors.black,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  pickerView: {
    flexDirection: 'row',
  },
  selectedImageStyle: {
    height: moderateScale(70),
    width: moderateScale(70),
  },
  imageContainer: {
    marginLeft: moderateScale(10),
    position: 'relative',
  },
  closeIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  closeIconContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    position: 'absolute',
    right: moderateScale(-5),
    top: moderateScale(-5),
  },
  pickerPadding: {padding: moderateScale(5)},
});
