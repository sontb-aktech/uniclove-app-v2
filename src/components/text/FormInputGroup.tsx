import React, {useRef, ReactNode, ReactElement} from 'react';
import {TextInput, Keyboard, TextInputProps} from 'react-native';

interface FormInputGroupProps {
  children: ReactNode;
}

export const FormInputGroup = ({children}: FormInputGroupProps) => {
  const inputRefs = useRef<TextInput[]>([]);
  const count = React.Children.count(children);

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<TextInputProps>(child)) return child;

        const isLast = index === count - 1;

        const childOnSubmit = child.props.onSubmitEditing;

        return React.cloneElement(child, {
          //@ts-ignore
          ref: (ref: TextInput) => {
            if (ref) inputRefs.current[index] = ref;
          },

          returnKeyType: isLast ? 'done' : 'next',
          blurOnSubmit: isLast,

          onSubmitEditing: (e: any) => {
            childOnSubmit?.(e);

            if (isLast) {
              Keyboard.dismiss();
            } else {
              inputRefs.current[index + 1]?.focus();
            }
          },
        });
      })}
    </>
  );
};
