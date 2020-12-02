'use strict';

class Item {
    constructor(element) {
        this.size = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Burger {
    constructor(size, filling, option) {
        this.size = new Item(this._select(size));
        this.filling = new Item(this._select(filling));
        this.options = this._getOptions(option);
    }

    _select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    _getOptions(name){
        let result = [];
        this._selectAll(name).forEach(elem => result.push(new Item(elem)));
        return result;
    }

    _selectAll(name){
        return document.querySelectorAll(`input[name="${name}"]:checked`);
    }

    _sumPrice(){
        let result = this.size.price + this.filling.price;
        this.options.forEach(option => result += option.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.calories + this.filling.calories;
        this.options.forEach(option => result += option.calories);
        return result;
    }

    _showSum(price, calories){
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
}

window.onload = () => {
    document.getElementById('check').addEventListener('click', () => {
        let burger = new Burger('size', 'filling', 'options');
        burger._showSum('#price', '#calories');
    });
}