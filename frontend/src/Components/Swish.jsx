import React from 'react';

module.exports = class Swish extends React.Component
{
	constructor()
	{
		super();

		this.state = {
			error_phone: "",
			phone: "",
		};
	}

	onChange(event)
	{
		this.props.onChange(event);
	}

	render()
	{
		return (
			<div className="uk-margin-top uk-margin-bottom">
				<div className="" data-uk-grid>
					<div className="uk-width-expand@m">
						<input className={this.state.error_phone ? "uk-input uk-form-danger" : "uk-input"} type="text" name="phone" placeholder="073 123 45 67" onChange={this.onChange.bind(this)} onBlur={this.onBlur} value={this.props.phone}  />
					</div>
				</div>
			</div>
		);
	}
}