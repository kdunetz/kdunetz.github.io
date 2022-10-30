import React, { Component } from "react";

import ReactStructuredQuerySearch from "react-structured-query-search";
import "react-structured-query-search/dist/index.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SymbolData: []
		};
		// NOTE: The operator will seen to UI only if props isAllowOperator={true}
		this.options = [
			{
				category: "Table",
				type: "textoptions",
				operator: ["==", "!="],
				options: this.getTableOptions
			},
			{
				category: "Operator",
				type: "textoptions",
				isAllowCustomValue: false,
				options: ["with", "by"]
			},
			{
				category: "Name",
				type: "text",
				isAllowDuplicateCategories: false,
				operator: () => ["==", "!==", "containes"]
			},
			{ category: "From Date", type: "date" },
			{ category: "To Date", type: "date" },
			{ category: "Year", type: "number" },
		];
	}

	/**
	 * [getTableOptions Get the values using Ajax call]
	 * @return {[type]}
	 */
	getTableOptions = () => {
		if (this.state.SymbolData.length === 0) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					this.setState({ SymbolData: ["Vulnerabilities", "Asset", "User"] }, () => {
						return resolve(this.state.SymbolData);
					});
				}, 100);
			});
		} else {
			return this.state.SymbolData;
		}
	};

	/**
	 * [getSectorOptions Get the values for sector category]
	 * @return {[array]}
	 */
	getSectorOptions() {
		return [{ sectorName: "Finance", id: 1 }, { sectorName: "Consumer Services", id: 2 }, { sectorName: "Services", id: 3 }];
	}

	/**
	 * [getIndustryOptions Get the values for Industry category]
	 * @return {[array]}
	 */
	getIndustryOptions() {
		return [{ name: "Business Services", id: 1 }, { name: "Other Specialty Stores", id: 2 }];
	}

	getTokenItem(obj) {
		let val = obj.children;
		return `${val["category"]}: val`;
	}

	render() {
		return (
			<div className="container">
				<ReactStructuredQuerySearch
					defaultSelected={[ ]}
					options={this.options}
					//renderTokenItem={this.getTokenItem}
					updateOptions={({ updatedValues, addedValue }) => {
						if (addedValue && addedValue.category === "Symbol" && addedValue.value === "TFSC") {
							this.options.push({
								category: "New Category",
								type: "text"
							});
							return this.options;
						}
					}}
					onTokenAdd={val => console.log(val)}
					customClasses={{
						input: "filter-tokenizer-text-input",
						results: "filter-tokenizer-list__container",
						listItem: "filter-tokenizer-list__item"
					}}
				/>
			</div>
		);
	}
}
/*
			{ category: "Price", type: "number" },
			{ category: "MarketCap", type: "number" },
			{ category: "IPO", type: "date" },
			{
				category: "Sector",
				type: "textoptions",
				fuzzySearchKeyAttribute: "sectorName",
				isAllowCustomValue: false,
				isAllowDuplicateOptions: false,
				options: this.getSectorOptions
			},
			{
				category: "Industry",
				type: "textoptions",
				isAllowCustomValue: false,
				options: this.getIndustryOptions
			}
*/
