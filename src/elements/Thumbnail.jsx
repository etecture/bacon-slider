import React from 'react';
import PropTypes from 'prop-types';

export default function Thumbnail(props) {

    const {
        image,
        index,
        active
    } = props;

    const handleClickThumb = () => {
        props.handleClickThumb(index);
    };

    const classList = 'image thumb' + (active ? ' active' : '');

    const styles = {
        backgroundImage: `url(${image})`
    };

    return (
        <div className={classList} onClick={handleClickThumb} style={styles} />
    );
};

Thumbnail.propTypes = {
    image: PropTypes.string.isRequired,
    handleClickThumb: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired
};
