import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_KEY, API_URL } from "../../API";

const TwoWayConversion = () => {
	const [currencies, setCurrencies] = useState([])
	const [firstInput, setFirstInput] = useState(1)
	const [secondInput, setSecondInput] = useState(1)
	const [firstCurrency, setFirstCurrency] = useState('USD')
	const [secondCurrency, setSecondCurrency] = useState('GEL')

	useEffect(() => {
		fetchCurrencies()
	}, [])

	useEffect (() => {
		convertCurrency(firstInput, secondInput, firstCurrency, secondCurrency)
	}, [firstCurrency, secondCurrency])

	const fetchCurrencies = async () => {
		const response = await axios.get(`${API_URL}/currencies?${API_KEY}`)
		const currencies = response.data.currencies;
		const currencyArr = Object.keys(currencies)
		setCurrencies(currencyArr)
	}

	const handleInputChange = (e) => {
		// check if its first or 2nd input
		console.log(e.target.value)
		if(e.target.name === 'first'){
			setFirstInput(e.target.value)
			convertCurrency(e.target.value, secondInput, firstCurrency, secondCurrency, false)
		}else{
			setSecondInput(e.target.value)
			convertCurrency(e.target.value, firstInput, secondCurrency, firstCurrency, true)
		}
	}

	const convertCurrency = async (amountFrom, amountTo, from, to, isReverse) => {
		if(amountFrom > 0) {
			const response = await axios.get(`${API_URL}/convert?from=${from}&to=${to}&amount=${amountFrom}&${API_KEY}`)
			isReverse ? setFirstInput(response.data.result[`${to}`]) : setSecondInput(response.data.result[`${to}`])
		}
	}
	return (
		<div>
			<select value={firstCurrency} onChange={(e) => setFirstCurrency(e.target.value)}>
				{
					currencies.map(curr => {
						return (
							<option key={curr} value={curr}>{curr}</option>
						)
					})
				}
			</select>
			<input type="number" name='first' min={1} onChange={handleInputChange} value={firstInput} onKeyDown={ (evt) => evt.key ===                                                                                                                          'e' && evt.preventDefault() }/>
			<br/>

			<select value={secondCurrency} onChange={(e) => setSecondCurrency(e.target.value)}>
				{
					currencies.map(curr => {
						return (
							<option key={curr} value={curr}>{curr}</option>
						)
					})
				}
			</select>
			<input type="number" name='second' min={1} onChange={handleInputChange}  value={secondInput} onKeyDown={ (evt) => evt.key                                                                                                                               === 'e' && evt.preventDefault() }/>
		</div>
	);
};

export default TwoWayConversion;
