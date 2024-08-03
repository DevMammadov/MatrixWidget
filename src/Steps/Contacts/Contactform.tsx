import Button from "@/Components/Shared/Button";
import TextField from "@/Components/Shared/TextField";
import { useI18 } from "@/i18next";
import { TClientDTO, TContactForm } from "@/Steps/Contacts/TContacts";

const ContactForm = ({
  onSubmit,
  hasConfirmCode,
  loading,
  codeError,
}: TContactForm) => {
  const t = useI18();

  const [formData, setFormData] = React.useState<TClientDTO>({
    name: "",
    surname: "",
    fatherName: "",
    phoneNumber: "",
    email: "",
    comment: "",
  });

  React.useEffect(() => {
    if (hasConfirmCode) {
      setFormData((old) => ({ ...old, confirmCode: "" }));
    }
  }, [hasConfirmCode]);

  const [errors, setErrors] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emptyFields = Object.keys(formData).filter(
      (k) => formData[k as keyof typeof formData] === ""
    );

    if (emptyFields.length > 0) {
      setErrors(emptyFields);
    } else {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors.includes(name) && value.length > 0) {
      setErrors(errors.filter((e) => e !== name));
    }

    if (value.length === 0) {
      setErrors([...errors, name]);
    }
  };

  return (
    <div className="py-4">
      <h1 className="font-bold text-5xl mb-5">{t("yourInfo")}</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <TextField
            required
            label={t("name")}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.includes("name")}
            disabled={loading}
          />
          <TextField
            required
            label={t("surname")}
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            error={errors.includes("surname")}
            disabled={loading}
          />
        </div>
        <TextField
          required
          label={t("patronomic")}
          name="fatherName"
          value={formData.fatherName}
          onChange={handleInputChange}
          error={errors.includes("fatherName")}
          disabled={loading}
        />
        <TextField
          required
          label={t("phone")}
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          error={errors.includes("phoneNumber")}
          type="number"
          disabled={loading}
        />
        <TextField
          required
          label={t("mail")}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.includes("email")}
          disabled={loading}
        />
        <TextField
          required
          label={t("noteToRecord")}
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          error={errors.includes("comment")}
          disabled={loading}
        />

        {hasConfirmCode && (
          <div>
            <TextField
              required
              label={t("confirmCode")}
              name="confirmCode"
              value={formData.confirmCode}
              onChange={handleInputChange}
              error={errors.includes("confirmCode") || codeError}
              disabled={loading}
            />
            {codeError && (
              <div className="text-sm text-red-600 pl-3 mt-1">
                {t("invalidCode")}
              </div>
            )}
          </div>
        )}

        <Button type="submit">{t("confirm")}</Button>
      </form>
    </div>
  );
};

export default ContactForm;
