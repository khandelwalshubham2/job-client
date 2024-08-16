const formatDate = (date: string) => {
  const detailArray = date.split("T")[0].split("-");
  return detailArray.reverse().join("-");
};

const getToken = (): string => localStorage.getItem("token") || "";

export { formatDate, getToken };
