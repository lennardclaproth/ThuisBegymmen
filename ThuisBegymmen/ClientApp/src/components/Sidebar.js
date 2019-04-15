import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';
import CategoryButton from './CategoryButton';


class Sidebar extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    id: 1,
                    name: "Free Weights",
                    discriminator: "FreeWeight"
                },
                {
                    id: 2,
                    name: "Fixed Weights",
                    discriminator: "FixedWeight"
                },
                {
                    id: 3,
                    name: "Bankjes",
                    discriminator: "Bankje"
                },
                {
                    id: 4,
                    name: "Cardio",
                    discriminator: "Cardio"
                },
                {
                    id: 5,
                    name: "Klein Fitness",
                    discriminator: "KleinFitness"
                },
                {
                    id: 6,
                    name: "Accessoires",
                    discriminator: "Accessoires"
                },
                ]

        }

    }

    render()
    {
        const categorybuttons = this.state.categories.map((category,i) => (
                <CategoryButton
                key={i}
                id={category.id}
                category={category.name}
                discriminator={category.discriminator}
                />
          ));
          
        return(
            <div>
                <Link to={'/'} exact="true">
                    <button className="Category">All Products</button>
                </Link>

                {categorybuttons}
            </div>
        );
    }
}

export default Sidebar;