import { api, LightningElement } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//import getFlowApiFromLabel from '@salesforce/apex/DynamicScreenFlow.getFlowApiFromLabel';

export default class DynamicScreenFlow extends LightningElement {

	@api flowApiName = '';
	loading = false;
	hasError = false;
	message = '';

	get hasApiName() {
		return this.flowApiName ? true : false;
	}

	async connectedCallback() {

		console.log(JSON.parse(JSON.stringify({
			'flowApiName': this.flowApiName,
		})));

		this.loading = true;

		if(!this.hasApiName){
			this.hasError = true;
			this.message = 'Please provide the Flow API Name'
			this.toast(this.message, 'error', 'Error');
		}

		this.loading = false;
	}
	status(event) {

		/* const status = event?.status;

		this.dispatchEvent(new CustomEvent('statuschange', {
			composed: true,
			bubbles: true,
			detail: {
				status,
			},
		})); */
	}
	debug() {

		console.log(JSON.parse(JSON.stringify({
			'flowApiName': this.flowApiName,
		})));
	}

	toast(message, variant, title) {
	
		const evt = new ShowToastEvent({
			message,
			variant,
			title: title ? title : variant,
		});
	
		this.dispatchEvent(evt);
	}

	getErrorMessage(error) {
		return typeof error  === 'string'
			? error 
			: error?.message
				? error?.message
				: error?.body?.message
					? error?.body?.message
					: 'Unknown error';
	}
}