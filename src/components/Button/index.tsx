import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ColorValue,
  ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  buttonText: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
}

export function Button({
  buttonText,
  color,
  backgroundColor,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ? <ActivityIndicator color={color} /> :
          <>
            <AntDesign
              name={icon}
              size={24}
              style={styles.icon}
            />
            <Text style={[styles.text, { color }]}>
              {buttonText}
            </Text>
          </>
      }
    </TouchableOpacity>
  );
}