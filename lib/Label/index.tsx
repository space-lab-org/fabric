import { FC, ReactNode } from "react";
import styles from './Label.module.scss';

interface LabelProps {
    children: ReactNode;
}

export const Label: FC<LabelProps> = ({ children }): ReactNode => {
    return (
        <label className={styles.label}>{children}</label>
    )
}