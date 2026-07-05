import { api } from "@/api/axios";

const fetchArticles = async () => {
  const response = await api.get("/articles");
  return response.data;
};
