export const getColor = (id: string): string => {
  if (id === "planned") {
    return "#2f3032";
  } else if (id === "open") {
    return "#f4d63c";
  } else if (id === "in-progress") {
    return "#e0965c";
  } else if (id === "done") {
    return "#3c6447";
  } else {
    return "";
  }
};

export const getLightColor = (id: string): string => {
  if (id === "planned") {
    return "#2f303230";
  } else if (id === "open") {
    return "#f4d63c30";
  } else if (id === "in-progress") {
    return "#e0965c30";
  } else if (id === "done") {
    return "#3c644730";
  } else {
    return "";
  }
};
