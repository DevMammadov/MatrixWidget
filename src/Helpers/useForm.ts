type TUseForm<T> = {
  initialValues?: Record<keyof T, string>;
};

type TError<T> = Record<keyof T, string>;
type TValidators = Array<(value: string) => false | string>;
type TConfig = {
  validators?: TValidators;
};
type TFormState<T> = Record<keyof T, string>;

export const useForm = <T extends object>(props?: TUseForm<T>) => {
  const [formState, setFormState] = React.useState<TFormState<T>>(
    {} as TFormState<T>
  );
  const [errors, setErrors] = React.useState<TError<T>>({} as TError<T>);
  const fieldsValidators: Partial<Record<keyof T, TValidators>> = {};

  const handleSubmit =
    (onSubmit: (data: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      Object.keys(formState).forEach((key) => {
        const value = formState[key as keyof T];
        const validators = fieldsValidators[key as keyof T] as TValidators;

        if (validators) {
          validators.forEach((func) => {
            if (func(value)) {
              setErrors({ ...errors, [key]: func(value) });
            }
          });
        }
        // TODO: Do submitting
      });
    };

  const register = (name: keyof T, config?: TConfig) => {
    if (config?.validators) {
      fieldsValidators[name] = config.validators;
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState({ ...formState, [name]: value });
    };

    //TODO: cancel validation

    return {
      value: formState[name] || "",
      onChange,
      error: !!errors[name],
      errorText: errors[name],
    };
  };

  return { register, handleSubmit, validators: fieldValidators() };
};

const fieldValidators = () => {
  const required = (value: string | number) => {
    return value === "" ? "Заполните обязательные поля" : false;
  };

  return { required };
};
