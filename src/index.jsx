import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {merge} from 'lodash';

import GalleryImage from './elements/Image';
import Thumbnail from './elements/Thumbnail';

import './Gallery.scss';

export default class Gallery extends Component {

    touchStartPos = null;
    touchImgIndex = null;
    touchDelta = null;

    initialState = {
        currentImage: 0,
        imageStyles: [],
        thumbstyles: {
            left: 0,
            originalOffset: 0
        }
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    componentWillReceiveProps(props) {
        let nextState = {};
        let imagesStyles = [];
        const images = props.images;
        if (images.length > 0) {
            images.forEach((image) => {
                imagesStyles.push({
                    left: 0,
                    originalOffset: 0
                });
            });
            nextState.imageStyles = imagesStyles;
        }
        this.setState(nextState);
    }

    componentDidUpdate() {
        if (this.refs.gallery) {
            this.refs.gallery.focus();
        }
    }

    clearData = () => {
        setTimeout(() => {
            let imageStyles = merge({}, this.state.imageStyles);
            imageStyles[this.touchImgIndex].originalOffset = 0;
            imageStyles[this.touchImgIndex].left = 0;
            this.setState({
                imageStyles
            }, () => {
                this.touchStartPos = null;
                this.touchImgIndex = null;
                this.touchDelta = null;
            });
        }, 100);
    }

    nextImage = () => {
        this.setState({
            currentImage: (this.state.currentImage + 1) % this.props.images.length
        });
    }

    prevImage = () => {
        this.setState({
            currentImage: (this.state.currentImage + this.props.images.length - 1) % this.props.images.length
        });
    }

    handleClickPrev = (e) => {
        e.stopPropagation();
        this.prevImage();
    }

    handleClickNext = (e) => {
        e.stopPropagation();
        this.nextImage();
    }

    handleClickThumb = (index) => {
        this.setState({
            currentImage: index
        });
    }

    handleKeyPress = (e) => {
        if (this.props.isOpen) {
            if (e.which === 37) {
                this.prevImage();
            } else if (e.which === 39) {
                this.nextImage();
            } else {
                e.preventDefault();
                return false;
            }
        }
    }

    handleTouchThumbsStart = (e) => {
        this.touchStartPos = e.touches[0].pageX;
    }

    handleTouchThumbsMove = (e) => {
        this.touchDelta = e.touches[0].pageX - this.touchStartPos;
        const leftPos = parseFloat(this.state.thumbstyles.originalOffset) + this.touchDelta;
        let thumbstyles = merge({}, this.state.thumbstyles);
        thumbstyles.left = leftPos + 'px';
        this.setState({
            thumbstyles
        });
    }

    handleTouchThumbsEnd = () => {
        let thumbstyles = merge({}, this.state.thumbstyles);
        thumbstyles.originalOffset = thumbstyles.left;
        this.setState({
            thumbstyles
        });
    }

    handleTouchStart = (e, imgIndex) => {
        this.touchStartPos = e.touches[0].pageX;
        this.touchImgIndex = imgIndex;
    }

    handleTouchMove = (e) => {
        this.touchDelta = e.touches[0].pageX - this.touchStartPos;
        const leftPos = parseFloat(this.state.imageStyles[this.touchImgIndex].originalOffset) + this.touchDelta;
        let imageStyles = merge({}, this.state.imageStyles);
        imageStyles[this.touchImgIndex].left = leftPos + 'px';
        this.setState({
            imageStyles
        });
    }

    handleTouchEnd = (e) => {
        if (this.touchDelta > 150) {
            this.prevImage();
        }
        if (this.touchDelta < -150) {
            this.nextImage();
        }
        this.clearData();

    }

    handleClickCloseGallery = () => {
        this.setState(this.initialState, this.handleCloseGallery);
    }

    handleCloseGallery = () => {
        this.props.handleCloseGallery();
    }

    render() {

        const {
            isOpen,
            images
        } = this.props;

        const {
            currentImage,
            thumbstyles,
            imageStyles
        } = this.state;

        const classList = 'vehicle-image-gallery--container' + (isOpen ? ' open' : '');

        return (
            <div className={classList}
                 tabIndex='0'
                 onKeyDown={this.handleKeyPress}
                 ref='gallery'
            >
                <div className='gallery-header'>
                    <i className='fa fa-times'
                       onClick={this.handleClickCloseGallery}/>
                </div>
                <div className='arrow prev' onClick={this.handleClickPrev}>
                  <i className='fa fa-angle-left' />
                </div>
                <div className='slider-container'>
                    {images.map((image, index) => {
                        let imageClass = 'image-container';
                        if (index === currentImage) {
                            imageClass = imageClass + ' active';
                        }
                        if (index < currentImage) {
                            if (index === 0 && currentImage === images.length - 1) {
                                imageClass = imageClass + ' after';
                            } else {
                                imageClass = imageClass + ' before';
                            }
                        }
                        if (index > currentImage) {
                            if (index === images.length - 1 && currentImage === 0) {
                                imageClass = imageClass + ' before';
                            } else {
                                imageClass = imageClass + ' after';
                            }
                        }
                        if (index === this.touchImgIndex) {
                            imageClass = imageClass + ' touched';
                        }

                        return (
                            <GalleryImage classList={imageClass} key={index}
                                          index={index}
                                          image={image}
                                          handleTouchStart={this.handleTouchStart}
                                          handleTouchMove={this.handleTouchMove}
                                          handleTouchEnd={this.handleTouchEnd}
                                          imageStyle={imageStyles[index]}
                            />
                        );
                    })}
                </div>
                <div className='arrow next' onClick={this.handleClickNext}>
                  <i className='fa fa-angle-right' />
                </div>
                <div className='thumbnail-container'>
                        <div className='thumbnail-slide'
                             style={thumbstyles}
                             onTouchMove={this.handleTouchThumbsMove}
                             onTouchStart={this.handleTouchThumbsStart}
                             onTouchEnd={this.handleTouchThumbsEnd}>
                            {images.map((image, index) => {
                                let active = currentImage === index;
                                return (
                                    <Thumbnail image={image}
                                               active={active}
                                               key={index}
                                               index={index}
                                               handleClickThumb={this.handleClickThumb}
                                    />
                                );
                            })}
                        </div>
                </div>
                <div className='gallery-footer'>
                </div>
            </div>
        );
    }

}

Gallery.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleCloseGallery: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired
};
