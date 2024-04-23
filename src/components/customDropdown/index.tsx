import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/constants';
import {dropdownIcon} from '../../assets';

type Props = {
  onSelect: (title: string) => void;
};

const dropdownData = [
  {title: 'Report a bug'},
  {title: 'Idea or Suggestion'},
  {title: 'Testimonial'},
  {title: 'Media and PR'},
  {title: 'Collaborations/Business Proposals'},
  {title: 'Other'},
];

export const CustomDropdown = ({onSelect}: Props) => {
  return (
    <SelectDropdown
      data={dropdownData}
      onSelect={selectedItem => {
        onSelect(selectedItem?.title);
      }}
      dropdownOverlayColor="rgba(0,0,0,0)"
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || (
                <Text style={!isOpened ? styles.openText : styles.closeText}>
                  Purpose
                  {!isOpened && <Text style={styles.starStyle}>*</Text>}
                </Text>
              )}
            </Text>
            <Image source={dropdownIcon} style={styles.iconStyle} />
          </View>
        );
      }}
      renderItem={(item, _, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {backgroundColor: Colors.lightGrey}),
            }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  dropdownButtonTxtStyle: {
    fontSize: moderateScale(15),
    color: Colors.black,
  },
  iconStyle: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  dropdownItemStyle: {
    padding: moderateScale(15),
    backgroundColor: Colors.white,
  },
  dropdownMenuStyle: {
    borderWidth: 1,
    borderColor: Colors.dropdownBorderGrey,
    backgroundColor: Colors.white,
  },
  dropdownItemTxtStyle: {
    color: Colors.black,
  },
  starStyle: {
    color: Colors.red,
  },
  openText: {
    color: Colors.black,
  },
  closeText: {
    color: Colors.white,
  },
});
