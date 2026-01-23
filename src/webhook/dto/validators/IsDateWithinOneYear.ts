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

          const date = new Date(value);
          if (isNaN(date.getTime())) return false;

          const now = new Date();

          const threeMonthsFromNow = new Date(now);
          threeMonthsFromNow.setMonth(now.getMonth() + 3);

          return date >= now && date <= threeMonthsFromNow;
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser uma data futura entre agora e no máximo 3 meses`;
        },
      },
    });
  };
}
