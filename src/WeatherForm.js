import React, { Component } from 'react';

export default class WeatherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: ''
    };
  }

  handleChange = evt => {
    const re = /^[0-9\b]+$/;
    if (evt.target.value === '' || re.test(evt.target.value)) {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const newLocation = this.state.zip;
    this.props.updateLocation(newLocation, false);
    this.setState({ zip: '' });
  };

  render() {
    return (
      <>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <label htmlFor='zip'>Zip:</label>
          <input
            type='zip'
            id='Zip'
            placeholder='Enter Zip'
            name='zip'
            value={this.state.zip}
            onChange={this.handleChange}
            maxLength='5'
          />
          <button type='submit' disabled={this.state.zip.length < 5 && true}>
            Submit
          </button>
        </form>
      </>
    );
  }
}
