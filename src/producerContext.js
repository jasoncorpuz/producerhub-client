import React from 'react';

const producerContext = React.createContext({
    postLike: () => {},
    deleteLike: () => {}, 
    addSong: () => {}
})

export default producerContext;