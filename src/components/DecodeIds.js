export const decodeIds = (encoded) => {
    const decoded = atob(encoded);
    return decoded.split("/");
  };

export const decodeMyId=(id1)=>{
  return atob(id1);
}