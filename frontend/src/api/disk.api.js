import httpClient from "./httpClient";

const fetchDisk = () => httpClient.get("/api/v1/disks/");
const format = params => httpClient.post("/api/v1/format/", { params: params });

export { fetchDisk, format };
