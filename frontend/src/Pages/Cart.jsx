import React from 'react';
import { Link } from 'react-router-dom'
import CartComponent from '../Components/Cart'
import Swish from '../Components/Swish'
import Stripe from '../Components/Stripe'
import { Elements } from 'react-stripe-elements';

module.exports = class Cart extends React.Component
{
	constructor()
	{
		super();

		this.state = {
			page: "form",
			accepted: false,
			newsletter: false,
			submitEnabled: false,
			error_name: false,
			error_address: false,
			error_zipcode: false,
			error_city: false,
			error_amount: false,
			error_email: false,
			error_membernumber: false,
			stripeComplete: false,

			name: "",
			address: "",
			zipcode: "",
			city: "",
			email: "",
			phone: "",
			membernumber: "",
			payment_type: "swish",
		};
	}

	onChange(event)
	{
		var s = {};

		if(event.target.type == "checkbox")
		{
			s[event.target.name] = event.target.checked;
		}
		else
		{
			s[event.target.name] = event.target.value;
		}

		this.setState(s);

		this.recalcSubmit();
	}

	onStripeChange(a)
	{
		this.setState({stripeComplete: a.complete});
		this.recalcSubmit();
	}

	onSwishChange(a)
	{
		console.log("Swish change")
	}

	validate(name)
	{
		console.log("Validate: " + name); // TODO

		if(name == "name" && this.state.name.length < 5)
		{
			this.setState({error_name: true});
		}

		if(name == "email" && this.state.email.length < 5)
		{
			this.setState({error_email: true});
		}

		// TODO: Fler fält

		this.recalcSubmit();
	}

	onBlur(event)
	{
		console.log("Blur: " + event.target.name); // TODO
		this.validate(event.target.name);
	}

	recalcSubmit()
	{
		var _this = this;
		setTimeout(function()
		{
			var submitEnabled = true;

			if(_this.state.accepted !== true)
			{
				submitEnabled = false;
			}

			if(_this.state.email.length < 5)
			{
				submitEnabled = false;
			}
			else
			{
				_this.setState({error_email: false});
			}

			if(_this.state.name.length < 5)
			{
				submitEnabled = false;
			}
			else
			{
				_this.setState({error_name: false});
			}

			// TODO: Fler fält

			if(_this.state.payment_type == "card" && !_this.state.stripeComplete)
			{
				submitEnabled = false;
			}

			if(_this.state.payment_type == "swish" && _this.state.phone.length < 5)
			{
				submitEnabled = false;
			}

			_this.setState({submitEnabled});
		});
	}

	submit(event)
	{
		var _this = this;

		// Prevent the form from being submitted
		event.preventDefault();

		if(this.state.payment_type == "card")
		{
			alert("TODO: Betala med Stripe");
/*
			var handler = StripeCheckout.configure({
				key: config.stripeKey,
				image: config.stripeImage,
				locale: "auto",
				token: function(token)
				{
					_this.sendDataToServer(token);
				}
			});

			// Open Checkout with further options:
			handler.open({
				name: "Crowdfunding",
				description: this.state.project_title,
				email: this.state.email,
				currency: "SEK",
				amount: this.state.amount * 100,
			});
*/
		}
		else if(this.state.payment_type == "swish")
		{
			alert("TODO: Betala med Swish");
//			this.setState({page: "swish"});
		}
	}

	render()
	{
		return (
			<div>
				<h2>Kundvagn</h2>

				<CartComponent />

				<h3>Personuppgifter</h3>

				<form className="uk-form-horizontal uk-margin-top uk-margin-bottom">
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Namn / företag *</label>
						<div className="uk-form-controls">
							<input className={this.state.error_name ? "uk-input uk-form-danger" : "uk-input"} type="text" name="name" placeholder="Anders Andersson" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={this.state.name} />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Medlemsnummer</label>
						<div className="uk-form-controls">
							<input className={this.state.error_membernumber ? "uk-input uk-form-danger" : "uk-input"} type="text" name="membernumber" placeholder="1234" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={this.state.membernumber}  />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">E-postadress *</label>
						<div className="uk-form-controls">
							<input className={this.state.error_email ? "uk-input uk-form-danger" : "uk-input"} type="text" name="email" placeholder="anders@example.com" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={this.state.email}  />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Adress *</label>
						<div className="uk-form-controls">
							<input className={this.state.error_address ? "uk-input uk-form-danger" : "uk-input"} type="text" name="address" placeholder="Testvägen 55" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={this.state.address} />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Postnummer och ort*</label>
						<div className="uk-form-controls">
							<input className={this.state.error_zipcode ? "uk-input uk-form-danger" : "uk-input"} type="text" name="zipcode" placeholder="123 45" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={this.state.zipcode} />
							<input className={this.state.error_city ? "uk-input uk-form-danger" : "uk-input"} type="text" name="city" placeholder="Stockholm" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={this.state.city} />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Meddelande</label>
						<div className="uk-form-controls">
							<textarea className="uk-textarea" rows="5" name="message" placeholder="Meddelande" onChange={this.onChange.bind(this)} value={this.state.message}  ></textarea>
						</div>
					</div>
				</form>

				<h3>Betalningssätt</h3>

				<form className="uk-form-horizontal uk-margin-top uk-margin-bottom">
					<div className="uk-margin">
						<div className="uk-form-label paymentSelector">
							<input type="radio" id="card" name="payment_type" value="card" checked={this.state.payment_type == "card"} onChange={this.onChange.bind(this)} />
							<label htmlFor="card"><img src="/images/card.png" alt="Betala med kort"/></label><br />

							<input type="radio" id="swish" name="payment_type" value="swish" checked={this.state.payment_type == "swish"} onChange={this.onChange.bind(this)} />
							<label htmlFor="swish"><img src="/images/swish.png" alt="Betala med Swish" /></label><br />
						</div>
						<div className="uk-form-controls">
							{this.state.payment_type == 'card' ?
								<Elements ref="meep" >
									<Stripe onChange={this.onStripeChange.bind(this)} />
								</Elements>
							: ""}

							{this.state.payment_type == 'swish' ?
								<Swish onChange={this.onChange.bind(this)} phone={this.state.phone} />
							: ""}
						</div>
					</div>
				</form>

				<div className="uk-clearfix" />

				<form className="uk-form-horizontal uk-margin-top uk-margin-bottom">
					<label><input className="uk-checkbox" type="checkbox" name="newsletter" checked={this.state.newsletter} onChange={this.onChange.bind(this)} /> Jag vill ha nyhetsbrev från Stockholm Makerspace</label><br />

					<label><input className="uk-checkbox" type="checkbox" name="accepted" checked={this.state.accepted} onChange={this.onChange.bind(this)} /> Jag godkänner <Link to="/villkor" target="_blank">användarvillkoren</Link> för Makerpay.se och är införstådd med att jag genomför en betalning till föreningen <a href="https://www.makerspace.se/">Stockholm Makerspace</a>, org. nr 802467-7026.</label><br />
				</form>

				{/*
					Thank you toffeomurice for this fancy credit card icon licensed under CC0!
					https://pixabay.com/en/credit-card-icon-money-credit-card-2761073/
				*/}

				<form className="uk-form-horizontal uk-margin-top uk-margin-bottom">
					<div className="uk-clearfix">
						<div className="uk-float-left">
							<Link to={"/projekt/" + "this.props.params.project_id"} className="uk-button uk-button-danger" disabled={!this.state.accepted}><span uk-icon="icon: arrow-left" /> Avbryt</Link>
						</div>

						<div className="uk-float-right">
							<button className="uk-button uk-button-primary" disabled={!this.state.submitEnabled} onClick={this.submit.bind(this)}>Genomför köp <span uk-icon="icon: arrow-right" /></button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}