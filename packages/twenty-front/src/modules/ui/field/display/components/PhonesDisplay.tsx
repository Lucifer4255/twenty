import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { RoundedLink, THEME_COMMON } from 'twenty-ui';

import { FieldPhonesValue } from '@/object-record/record-field/types/FieldMetadata';
import { ExpandableList } from '@/ui/layout/expandable-list/components/ExpandableList';

import { DEFAULT_PHONE_CALLING_CODE } from '@/object-record/record-field/meta-types/input/components/PhonesFieldInput';
import { parsePhoneNumber } from 'libphonenumber-js';
import { isDefined } from '~/utils/isDefined';
import { logError } from '~/utils/logError';

type PhonesDisplayProps = {
  value?: FieldPhonesValue;
  isFocused?: boolean;
<<<<<<< HEAD
  onPhoneNumberClick?: (phoneNumber: string,event : React.MouseEvent<HTMLElement>) => void;
=======
  onPhoneNumberClick?: (
    phoneNumber: string,
    event: React.MouseEvent<HTMLElement>,
  ) => void;
>>>>>>> origin/main
};

const themeSpacing = THEME_COMMON.spacingMultiplicator;

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeSpacing * 1}px;
  justify-content: flex-start;

  max-width: 100%;

  overflow: hidden;

  width: 100%;
`;

<<<<<<< HEAD
export const PhonesDisplay = ({ value, isFocused, onPhoneNumberClick }: PhonesDisplayProps) => {
=======
export const PhonesDisplay = ({
  value,
  isFocused,
  onPhoneNumberClick,
}: PhonesDisplayProps) => {
>>>>>>> origin/main
  const phones = useMemo(
    () =>
      [
        value?.primaryPhoneNumber
          ? {
              number: value.primaryPhoneNumber,
              callingCode:
                value.primaryPhoneCallingCode ||
                value.primaryPhoneCountryCode ||
                `+${DEFAULT_PHONE_CALLING_CODE}`,
            }
          : null,
        ...parseAdditionalPhones(value?.additionalPhones),
      ]
        .filter(isDefined)
        .map(({ number, callingCode }) => {
          return {
            number,
            callingCode,
          };
        }),
    [
      value?.primaryPhoneNumber,
      value?.primaryPhoneCallingCode,
      value?.primaryPhoneCountryCode,
      value?.additionalPhones,
    ],
  );
  const parsePhoneNumberOrReturnInvalidValue = (number: string) => {
    try {
      return { parsedPhone: parsePhoneNumber(number) };
    } catch (e) {
      return { invalidPhone: number };
    }
  };
<<<<<<< HEAD
  const handleClick = (number: string,event :React.MouseEvent<HTMLElement>) => {
    if (onPhoneNumberClick) {
      onPhoneNumberClick(number,event);
    }
  };
=======

  const handleClick = (
    number: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    onPhoneNumberClick?.(number, event);
  };

>>>>>>> origin/main
  return isFocused ? (
    <ExpandableList isChipCountDisplayed>
      {phones.map(({ number, callingCode }, index) => {
        const { parsedPhone, invalidPhone } =
          parsePhoneNumberOrReturnInvalidValue(callingCode + number);
        const URI = parsedPhone?.getURI();
        return (
          <RoundedLink
            key={index}
            href={URI || ''}
            label={
              parsedPhone ? parsedPhone.formatInternational() : invalidPhone
            }
<<<<<<< HEAD
            onClick={(event) => handleClick(callingCode + number,event)}
=======
            onClick={(event) => handleClick(callingCode + number, event)}
>>>>>>> origin/main
          />
        );
      })}
    </ExpandableList>
  ) : (
    <StyledContainer>
      {phones.map(({ number, callingCode }, index) => {
        const { parsedPhone, invalidPhone } =
          parsePhoneNumberOrReturnInvalidValue(callingCode + number);
        const URI = parsedPhone?.getURI();
        return (
          <RoundedLink
            key={index}
            href={URI || ''}
            label={
              parsedPhone ? parsedPhone.formatInternational() : invalidPhone
            }
<<<<<<< HEAD
            onClick={(event) => handleClick(callingCode + number,event)}
=======
            onClick={(event) => handleClick(callingCode + number, event)}
>>>>>>> origin/main
          />
        );
      })}
    </StyledContainer>
  );
};

const parseAdditionalPhones = (additionalPhones?: any) => {
  if (!additionalPhones) {
    return [];
  }

  if (typeof additionalPhones === 'object') {
    return additionalPhones;
  }

  if (typeof additionalPhones === 'string') {
    try {
      return JSON.parse(additionalPhones);
    } catch (error) {
      logError(`Error parsing additional phones' : ` + error);
    }
  }

  return [];
};
