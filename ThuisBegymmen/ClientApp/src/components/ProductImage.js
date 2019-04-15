import React, { Component } from 'react';
import Slider from 'react-slick';

class ProductImage extends Component {
    constructor (props){
        super(props)
        this.state = {
            images: []
        }
        console.log(this.props.productId)
    };

    imageHandler(){
        fetch(`api/Image/getImages?productId=${this.props.productId}`)
        .then(response => {
            response.json()
        .then(responseJson => {
            this.setState({ images : JSON.parse(JSON.stringify(responseJson))})
        })
        .catch(error => console.error(error));
        })
    }

    componentWillMount() {
        this.imageHandler()
    }

    render () {
        const imagelist = this.state.images.map((image,i) => (
            <div key={i}>
            <img
            src={image}
            alt=""
            height="100%" width="100%"
            />
            </div>
        ))

        var settings = { // handige comments voor de slider, enjoy!
            dots: true, // shows dots under the pics to indicate which one you're at
            speed: 300, // lower value is faster swap speed!
            fade: true, // enable for fade effect, disable for slider effect
            autoplay: true, // disable for manual swapping
            autoplaySpeed: 2000, // set value to 10 for disco effect
          };

        return (
            <Slider {...settings}>
                {imagelist}
            </Slider>
        );
    }
}

export default ProductImage;