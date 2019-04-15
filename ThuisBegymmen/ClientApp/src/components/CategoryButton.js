import React from 'react';
import { Link } from 'react-router-dom';


class CategoryButton extends React.Component{

  refreshPage()
  {
    setTimeout( () => {
      window.location.reload();
    }, 100); // milliseconden
    
  }
  
  render()
  {
    return (
    <Link to={{pathname: '/Category/' + this.props.id, state: { discriminator: this.props.discriminator}}}>
        <button 
          className="Category"
          onClick={this.refreshPage}
        >
            {this.props.category}
        </button>
    </Link>
    )
  }
}

export default CategoryButton;