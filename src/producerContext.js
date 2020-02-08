import React from 'react';

const producerContext = React.createContext({
    postLike: () => {},
    deleteLike: () => {}, 
    addSong: () => {}, 
    sortSongs: () => {}
})

export default producerContext;