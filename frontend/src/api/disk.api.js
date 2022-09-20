import httpClient from "./httpClient";

const fetchDisk = () => httpClient.get("/api/v1/disks/");
const format = (name) => httpClient.post("/api/v1/format/", { name: name });

export { fetchDisk, format };
