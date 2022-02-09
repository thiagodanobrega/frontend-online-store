import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromAndQuery } from '../services/api';
import CategoryList from '../Components/CategoryList';
import Card from '../Components/Card';

class Home extends React.Component {
  state = {
    resultCategory: [],
    searchValue: '',
    results: [],
    isLength: false,
  }

  async componentDidMount() {
    await this.getCategory();
  }

  getCategory = async () => {
    const result = await getCategories();
    this.setState({
      resultCategory: result,
    });
    console.log(result);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { searchValue } = this.state;
    const { results } = await getProductsFromAndQuery(searchValue);
    this.setState({
      results,
      isLength: true,
    });
  }

  render() {
    const { resultCategory, results, isLength } = this.state;
    return (
      <div>
        {resultCategory.map(({ id, name }) => (
          <CategoryList key={ id } id={ id } name={ name } />
        ))}
        <input type="text" />
        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">Adicionar ao carrinho</button>
        </Link>

        <input
          type="text"
          data-testid="query-input"
          name="searchValue"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Search
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {isLength ? (
          <div>
            { results.length > 0 ? (
              <div>
                {results.map(({ id, title, price, thumbnail }) => (
                  <Card
                    key={ id }
                    title={ title }
                    price={ price }
                    image={ thumbnail }
                  />
                ))}
              </div>
            ) : <p>Nenhum produto foi encontrado</p>}
          </div>
        ) : ''}
      </div>
    );
  }
}

export default Home;
