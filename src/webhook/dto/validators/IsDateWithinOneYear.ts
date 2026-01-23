import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsDateWithinThreeMonths(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsDateWithinThreeMonths',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;

          if (typeof value !== 'string') return false;

          const date = new Date(value);
          if (isNaN(date.getTime())) return false;

          const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})T/);
          if (!isoMatch) return false;

          const [, year, month, day] = isoMatch.map(Number);

          if (
            date.getUTCFullYear() !== year ||
            date.getUTCMonth() + 1 !== month ||
            date.getUTCDate() !== day
          ) {
            return false;
          }

          const now = new Date();

          const threeMonthsFromNow = new Date(now);
          threeMonthsFromNow.setMonth(now.getMonth() + 3);

          return date >= now && date <= threeMonthsFromNow;
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser uma data ISO válida, real e entre agora e no máximo 3 meses`;
        },
      },
    });
  };
}
