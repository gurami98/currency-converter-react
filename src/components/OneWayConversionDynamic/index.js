import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_KEY, API_URL } from "../../API";

const OneWayConversionDynamic = () => {
	const [currencies, setCurrencies] = useState([])

	const [currencyInputCount, setCurrencyInputCount] = useState(1)
	const [currencyInfo, setCurrencyInfo] = useState([
		{
			currency: 'USD',
			amount: 1
		},
	])

	const [secondInput, setSecondInput] = useState(1)
	const [secondCurrency, setSecondCurrency] = useState('GEL')

	useEffect(() => {
		fetchCurrencies()
	}, [])

	useEffect (() => {
		convertCurrency()
	}, [currencyInfo, secondCurrency])

	const fetchCurrencies = async () => {
		const response = await axios.get(`${API_URL}/currencies?${API_KEY}`)
		const currencies = response.data.currencies;
		const currencyArr = Object.keys(currencies)
		setCurrencies(currencyArr)
	}

	const handleInputChange = (e) => {
		setCurrencyInfo(
			currencyInfo.map((currObj, index) => {
				if(index.toString() === e.target.name) return {...currObj, amount: e.target.value}
				return currObj
			})
		)
	}

	const convertCurrency = async () => {
		let sum = 0
		for(const currencyObj of currencyInfo){
			const response = await axios.get(`${API_URL}/convert?from=${currencyObj.currency}&to=${secondCurrency}&amount=${currencyObj.amount}&${API_KEY}`)
			sum += response.data.result[secondCurrency]
		}
		setSecondInput(sum)
	}

	const addCurrencyHandler = () => {
		setCurrencyInfo([
				...currencyInfo,
				{
					currency: 'USD',
					amount: 1
				}
			]
		)
		setCurrencyInputCount((prevState) => {
			return prevState + 1
		})
	}

	const currencyObjectArray = []
	for(let i = 0; i < currencyInputCount; i++) {
		currencyObjectArray.push(
			<React.Fragment key={i}>
				<select value={currencyInfo[i].currency} onChange={(e) => setCurrencyInfo(
					currencyInfo.map((currencyObj, index) => {
						if(index === i) return {...currencyObj, currency: e.target.value}
						else return currencyObj
					})
				)}>
					{
						currencies.map(curr => {
							return (
								<option key={curr} value={curr}>{curr}</option>
							)
						})
					}
				</select>
				<input type="number" name={i} min={1} onChange={handleInputChange} value={currencyInfo[i].amount}
				       onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}/>
				<br/>
			</React.Fragment>
		)
	}

	return (
		<div>
			<button onClick={addCurrencyHandler}>Add Currency</button>
			{
				currencyObjectArray
			}



			<select value={secondCurrency} onChange={(e) => setSecondCurrency(e.target.value)}>
				{
					currencies.map(curr => {
						return (
							<option key={curr} value={curr}>{curr}</option>
						)
					})
				}
			</select>
			<input type="number" readOnly value={secondInput}/>
		</div>
	);
};

export default OneWayConversionDynamic;
