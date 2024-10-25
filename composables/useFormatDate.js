export function useFormatDate() {
  const formatDate = (value) => {
    const date = new Date(value);

    // Define options for the desired format
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    // Format the date
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Manipulate the format into 'Aug-04-2024'
    return formattedDate.replace(/\//g, "-");
  };

  return {
    formatDate,
  };
}
