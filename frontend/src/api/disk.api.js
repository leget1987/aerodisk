import httpClient from "./httpClient";

const fetchDisk = () => httpClient.get("/api/v1/disks/");
const format = (params) =>
  httpClient.post("/api/v1/format/", { params: params });
const mount = (params) => httpClient.post("/api/v1/mount/", { params: params });
const umount = (params) =>
  httpClient.post("/api/v1/umount/", { params: params });

export { fetchDisk, format, mount, umount };
