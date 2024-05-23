export const formatCPF = (value: string) => {
  const cleanedValue = value.replace(/\D/g, ""); // remove caracteres não numéricos

  // CPF
  return cleanedValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2");
};

export function formatPhone(value: string) {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned === "" || cleaned.length < 2) {
    return "";
  }

  let formatted = `(${cleaned.substring(0, 2)})`;
  if (cleaned.length > 2) {
    formatted += ` ${cleaned.substring(2, 7)}`;
  }
  if (cleaned.length > 7) {
    formatted += `-${cleaned.substring(7, 11)}`;
  }

  return formatted;
}
