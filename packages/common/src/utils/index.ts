export function formatDate(date?: Date): string {
  if (!date) return "--";
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getPostDescription(desc: string): string {
  return desc.slice(0, 400);
}
