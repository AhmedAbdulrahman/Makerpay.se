import React from 'react';
import { CardElement } from 'react-stripe-elements';
import { injectStripe } from 'react-stripe-elements';

module.exports = class Stripe123 extends React.Component
{
	render()
	{
		return (
			<div>
				<CardElement style={{base: {fontSize: '18px'}}} onChange={this.props.onChange} />
			</div>
		);
	}
}