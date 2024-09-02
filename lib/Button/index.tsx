import { FC, ReactNode } from "react";
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children }): ReactNode => {
  return (
    <button className={styles.button}>{children}</button>
  )
}