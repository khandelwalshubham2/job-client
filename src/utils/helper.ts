const formatDate = (date: string) => {
  const detailArray = date.split("T")[0].split("-");
  return detailArray.reverse().join("-");
};

export { formatDate };
