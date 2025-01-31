export const EncodeIds=(id1, id2)=>{
    const combinedIds = `${id1}/${id2}`;
    return btoa(combinedIds); 
}

export const EncodeMyId=(id1)=>{
    return btoa(id1);
}