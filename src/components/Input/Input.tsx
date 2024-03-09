import {forwardRef} from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import {InputProps} from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({isValid = true, labelText, className, ...props}, ref) {
        return (
            <div className={styles['field']}>
                <label htmlFor="email">{labelText}</label>
                <input ref={ref} className={cn(styles['input'], className, {
                    [styles['invalid']]: isValid
                })} {...props} />
            </div>

        );
    });

export default Input;