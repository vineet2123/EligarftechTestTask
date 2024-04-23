import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/constants';
import {moderateScale} from '../../utils/helper';
import {OutlinedTextField} from 'rn-material-ui-textfield';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isErrorRequired?: boolean;
  maxLimit: number;
  multiLine?: boolean;
};

export const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  isErrorRequired,
  maxLimit,
  multiLine,
}: Props) => {
  const [onBlurredError, setOnBlurredError] = useState(false);

  return (
    <View style={styles.container}>
      <OutlinedTextField
        value={value}
        label={placeholder}
        inputContainerStyle={
          multiLine ? styles.multilineTextInputStyle : styles.textInputStyle
        }
        onChangeText={(text: string) => {
          if (text?.length <= maxLimit) {
            onChangeText(text);
          }
          if (!text?.length) {
            setOnBlurredError(true);
          } else {
            setOnBlurredError(false);
          }
        }}
        tintColor={isErrorRequired && onBlurredError ? Colors.red : undefined}
        baseColor={
          isErrorRequired && onBlurredError
            ? Colors.red
            : multiLine
            ? Colors.darkGrey
            : undefined
        }
        onFocus={() => {
          setOnBlurredError(false);
        }}
        onBlur={() => {
          if (!value?.length) {
            setOnBlurredError(true);
          }
        }}
        labelOffset={{
          y1: moderateScale(-47),
          y0: moderateScale(-2),
        }}
        contentInset={{
          top: moderateScale(30),
          label: moderateScale(-30),
          input: moderateScale(multiLine ? 90 : 10),
        }}
        multiline={multiLine}
      />
      <Text style={styles.counterTextStyle}>
        {value?.length}/{maxLimit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(10),
  },
  textInputStyle: {
    height: moderateScale(25),
    backgroundColor: Colors.white,
  },
  multilineTextInputStyle: {
    height: moderateScale(90),
    backgroundColor: Colors.white,
  },
  counterTextStyle: {
    color: Colors.black,
    alignSelf: 'flex-end',
    paddingHorizontal: moderateScale(10),
  },
});
