import { TextInput } from '@/ui/input/components/TextInput';
import { Controller, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { isDefined } from '~/utils/isDefined';
import { Form } from '@/auth/sign-in-up/hooks/useSignInUpForm';

const StyledFullWidthMotionDiv = styled(motion.div)`
  width: 100%;
`;

const StyledInputContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const SignInUpEmailField = ({
  showErrors,
  onChange: onChangeFromProps,
}: {
  showErrors: boolean;
  onChange?: (value: string) => void;
}) => {
  const form = useFormContext<Form>();

  return (
    <StyledFullWidthMotionDiv
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 35,
      }}
    >
      <Controller
        name="email"
        control={form.control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <StyledInputContainer>
            <TextInput
              autoFocus
              value={value}
              placeholder="Email"
              onBlur={onBlur}
              onChange={(value: string) => {
                onChange(value);
                if (isDefined(onChangeFromProps)) onChangeFromProps(value);
              }}
              error={showErrors ? error?.message : undefined}
              fullWidth
            />
          </StyledInputContainer>
        )}
      />
    </StyledFullWidthMotionDiv>
  );
};