import React, { MouseEventHandler } from 'react';

export default interface ButtonProps {
  text?: string;
  icon?: string | null;
  handleClick?: () => void;
  className?: string;
}
