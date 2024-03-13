import React, {useState} from "react";
import styles from "./SavingSegment.module.css";

function SavingSegment({isVisible, setIsVisible}) {
	const [segmentName, setSegmentName] = useState("");
	const [selectedSchema, setSelectedSchema] = useState([]);
	const [schemas, setSchemas] = useState([
		{label: "First Name", value: "first_name"},
		{label: "Last Name", value: "last_name"},
		{label: "Gender", value: "gender"},
		{label: "Age", value: "age"},
		{label: "Account Name", value: "account_name"},
		{label: "City", value: "city"},
		{label: "State", value: "state"},
	]);

	function handleOnChange(value) {
		let selectSchema = schemas.filter(e => e.value === value);

		let filterSchema = schemas.filter(item => item.value !== value);
		console.log(selectSchema);
		if (selectSchema[0]) {
			setSchemas(() => [...filterSchema]);
			setSelectedSchema(() => [...selectedSchema, ...selectSchema]);
		}
	}
	function handleSubmit(values) {
		values.preventDefault();
		const dataModel = {
			segment_name: segmentName,
			schema: selectedSchema.map(item => ({
				[item.label]: item.value,
			})),
		};

		console.log(dataModel);
		async function postData(url = "", data = {}) {
			let res = await fetch(url, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify(data),
			});
			return res.json();
		}

		postData("https://webhook.site/2530fa9f-7cdc-4d80-986a-f776fd7e4c5d", dataModel)
			.then(res => console.log(res))
			.catch(error => console.log(error));
	}

	function handleNewSchema(e) {
		setSelectedSchema([...selectedSchema, {label: "Add new schema", value: "addSchema"}]);
	}
	function handleSelect(value, index) {
		let selectSchema = schemas.filter(e => e.value === value);

		let filterMainSchema = schemas.filter(e => e.value !== value);
		let selectedSchemaSlice = [...selectedSchema];

		if (selectedSchemaSlice[index].value !== "addSchema") {
			setSchemas(() => [...filterMainSchema, selectedSchema[index]]);
		}
		selectedSchemaSlice.splice(index, 1, ...selectSchema);
		console.log(selectedSchemaSlice);
		setSelectedSchema(() => [...selectedSchemaSlice]);
	}

	function handelCancel() {
		setSelectedSchema(() => []);
		setSchemas(() => [
			{label: "First Name", value: "first_name"},
			{label: "Last Name", value: "last_name"},
			{label: "Gender", value: "gender"},
			{label: "Age", value: "age"},
			{label: "Account Name", value: "account_name"},
			{label: "City", value: "city"},
			{label: "State", value: "state"},
		]);
		setIsVisible(!isVisible);
	}

	return (
		<div className={isVisible ? styles.parentStyle : styles.parentStyleHide}>
			<nav className={styles.nav}>
				&nbsp;&lt;&nbsp;<h3>Saving Segment</h3>
			</nav>
			<section className={styles.container_fluid}>
				<form onSubmit={values => handleSubmit(values)}>
					<label htmlFor="segmentName">Enter the Name of the Segment</label>
					<br />
					<input
						type="text"
						id="segmentName"
						placeholder="Name of the segment"
						onChange={e => setSegmentName(e.target.value)}
					/>
					<br />
					<p>To save you segment, you need to add the schemas to build the query</p>
					<br />
					<div className={styles.traits_container}>
						<div className={styles.trait_green}></div>
						<span>&nbsp;- User Traits</span>
						&nbsp;
						<div className={styles.trait_red}></div>
						<span>&nbsp;- Group Traits</span>
					</div>
					<br />
					<div className={styles.selectedSchemaDropdown} style={{height: "210px", overflowX: "scroll"}}>
						{selectedSchema.length > 0 &&
							selectedSchema.map((e, i) => (
								<div key={i} className={styles.form_input}>
									<div
										className={
											["First Name", "Last Name", "Account Name"].includes(e.label)
												? styles.trait_green
												: styles.trait_red
										}
									></div>
									<select value={e.value} onChange={e => handleSelect(e.target.value, i)}>
										{[e, ...schemas].map((schema, index) => (
											<option key={index} value={schema.value}>
												{schema.label}
											</option>
										))}
									</select>
									<div className={styles.form_input_delete}>
										<div className={styles.delete_icon}> </div>
									</div>
								</div>
							))}
					</div>

					<br />
					<DropDown handleOnChange={handleOnChange} schemas={schemas} />
					<button className={styles.form_link} type="button" onClick={e => handleNewSchema(e)}>
						+ Add new schema
					</button>

					<div className={styles.segment_footer}>
						<button type="submit" className={styles.footer_save}>
							Save the segment
						</button>
						&nbsp;
						<button type="reset" className={styles.footer_cancel} onClick={() => handelCancel()}>
							Cancel
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}

function DropDown({handleOnChange, schemas}) {
	return (
		<div className={styles.form_input}>
			<div className={styles.input_traits}></div>
			<select value={"add schema to segment"} onChange={event => handleOnChange(event.target.value)}>
				<option value={"abcd"}>Add schema to segment</option>
				{schemas.map((schema, i) => (
					<option key={i} value={schema.value}>
						{schema.label}
					</option>
				))}
			</select>
			<div className={styles.form_input_delete}>
				<div className={styles.delete_icon}> </div>
			</div>
		</div>
	);
}

export default SavingSegment;
