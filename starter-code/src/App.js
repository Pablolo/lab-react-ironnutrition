import React, { Component } from 'react';
import FoodBox from './components/FoodBox';
import Form from './components/Form';
import foods from './foods.json';
import Search from './components/Search';
import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {

  state = {
    allfood: [...foods],
    form: true,
    filteredFood: [...foods],
    todaysFood: [],
  }

  toggleForm = () => {
    this.setState({
      form: !this.state.form,
    })
  }

  updateFoods = (newFood) => {
    const updatedFoods = [...this.state.allfood];
    updatedFoods.push(newFood); 
    console.log(newFood);
    this.setState({
      filteredFood: updatedFoods,
    })
  }

  filterFood = (search) => {
    const { allfood } = this.state;
    const filteredFood = allfood.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    this.setState({
      filteredFood: filteredFood,
    })
  }

  addToList = (quantity, name, calories) => {
    let index = this.state.todaysFood.findIndex(x=> x.name === name);
    console.log(index);
    if (index === -1) {
      this.setState({
        todaysFood: this.state.todaysFood.concat({quantity, name, calories}),
      })
    } else {
      console.log('quantity', this.state.todaysFood[index].quantity);
      const copyOfTodays = this.state.todaysFood;
      copyOfTodays[index].quantity += quantity;
      
      this.setState({
        todaysFood: copyOfTodays,
      })
    }
  }

  totalCal = () => {
    let caloriesAdded = this.state.todaysFood.map(item => item.calories * item.quantity);
    const total = caloriesAdded.reduce((a,b) => a + b, 0)
    return total;
  }

  render() {
    const { form, filteredFood, todaysFood } = this.state;
    return (
      <div className="container">
        <h1 className="title">IronNutrition</h1>
        
        { form && <div className="button-home"><button onClick={this.toggleForm} className="button is-normal is-info">Add new food</button>
        <Search filterFood={this.filterFood}/> </div> }
        { !form && <Form updateFoods={this.updateFoods} toggle={this.toggleForm}/> }
        { form && 
        <div className="columns">
          <div className="column">
            {filteredFood.map(item => {
              return <FoodBox key={item.name} name={item.name} calories={item.calories} image={item.image} addToList={this.addToList} />
            })}
          </div>
          <div className="column gray-column">
            <h2 className='today-food'>Today's foods</h2>
            <ul>
              {todaysFood.map(item => {
                return <li>{item.quantity} {item.name} = {item.calories * item.quantity} calories</li>
              })}
            </ul>
            <p>Total: {this.totalCal()} cal</p>
          </div>
        </div> }
      </div>
    );
  }
}

export default App;
