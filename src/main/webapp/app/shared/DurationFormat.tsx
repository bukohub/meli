import * as React from 'react';
import dayjs from 'dayjs';

export interface IDurationFormat {
  value: any;
  blankOnInvalid?: boolean;
  locale?: string;
}

export const DurationFormat = ({ value, blankOnInvalid, locale }: IDurationFormat) => {
  if (blankOnInvalid && !value) {
    return null;
  }

  return (
    <span title={value}>
      {dayjs
        .duration(value)
        .locale(locale || 'en')
        .humanize()}
    </span>
  );
};
