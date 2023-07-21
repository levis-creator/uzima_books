import axios from "axios";

export const fetch_data = async (items_per_page, current_page, book_type) => {
  try {
    const response = await axios.get(
      "https://book-finder1.p.rapidapi.com/api/search",
      {
        params: {
          results_per_page: items_per_page != undefined ? items_per_page : 100,
          page: current_page != undefined ? current_page : 1,
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Key,
          "X-RapidAPI-Host": "book-finder1.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
