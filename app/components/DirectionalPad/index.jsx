import React from 'react';
import { Circle, ArrowButton, CenterCircle } from './styles'; 
import { AntDesign } from '@expo/vector-icons';

const Arrow = ({ direction, onPress }) => {
  const iconName = {
    up: 'caretup',
    right: 'caretright',
    down: 'caretdown',
    left: 'caretleft',
  }[direction];

  return (
    <ArrowButton
      style={{
        top: direction === 'up' ? 30 : undefined,
        right: direction === 'right' ? 30 : undefined,
        bottom: direction === 'down' ? 30 : undefined,
        left: direction === 'left' ? 30 : undefined,
      }}
      onPressIn={() => onPress(direction)}
      onPressOut={() => onPress('stop')}
    >
      <AntDesign name={iconName} size={40} color="#011627" />
    </ArrowButton>
  );
};

const DirectionalPad = ({ onArrowPress }) => {
  return (
    <Circle>
      <CenterCircle />
      <Arrow direction="up" onPress={onArrowPress}  />
      <Arrow direction="right" onPress={onArrowPress} />
      <Arrow direction="down" onPress={onArrowPress} />
      <Arrow direction="left" onPress={onArrowPress} />
    </Circle>
  );
};

export default DirectionalPad;
