import React from 'react';

const producerContext = React.createContext({
    postLike: () => {},
    deleteLike: () => {}
})

export default producerContext;