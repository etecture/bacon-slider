import React from 'react';
import PropTypes from 'prop-types';

export default function GalleryImage(props) {
    const {
        image,
        imageStyle,
        index,
        classList
    } = props;

    const handleTouchStart = (e) => {
        props.handleTouchStart(e, index);
    };

    const handleTouchMove = (e) => {
        props.handleTouchMove(e);
    };

    const handleTouchEnd = (e) => {
        props.handleTouchEnd(e);
    };

    return (
        <div className={classList}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
             style={imageStyle}>
            <img src={image} draggable={false}
            />
        </div>
    );
};

GalleryImage.propTypes = {
    image: PropTypes.string.isRequired,
    imageStyle: PropTypes.object,
    classList: PropTypes.string.isRequired,
    handleTouchStart: PropTypes.func.isRequired,
    handleTouchMove: PropTypes.func.isRequired,
    handleTouchEnd: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};
