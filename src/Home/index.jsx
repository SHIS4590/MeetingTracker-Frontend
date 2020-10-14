import React from 'react'
import { Button } from 'antd'
import Cards from './components/card'
import PositionModel from './components/positionModel'
import './style.css'

export default class Home extends React.Component {
	state = {
		modelStatus: {
			position: false,
		},
		dataStore: {
			position: [],
			users: [],
		},
	}

	onOpen = () => {
		const { modelStatus } = this.state
		this.setState({ modelStatus: { ...modelStatus, position: true } })
	}

	onOK = (type, data, index) => {
		const { dataStore, modelStatus } = this.state
		switch (type) {
			case 'position':
				const i = dataStore.position.length
				data.index = i
				const newPosition = dataStore.position.concat([data])
				this.setState({
					dataStore: {
						...dataStore,
						position: newPosition,
						users: [...dataStore.users, []],
					},
					modelStatus: { ...modelStatus, position: false },
				})
				window.sessionStorage.setItem('position', JSON.stringify(newPosition))
				break
			case 'users':
				const { users } = dataStore
				const len = users.length ? users[index].length : 0
				data.index = len
				const newUsers = users[index] ? users[index].concat([data]) : [].concat([data])
				users.splice(index, 1, newUsers)
				this.setState({
					dataStore: {
						...dataStore,
						users,
					},
				})
				window.sessionStorage.setItem('users', JSON.stringify(users))
			default:
				break
    }

    window.location.reload()
	}

	onCancel = (type) => {
		const { modelStatus } = this.state
		switch (type) {
			case 'position':
				this.setState({ modelStatus: { ...modelStatus, position: false } })
				break
			default:
				break
		}
	}

	onRemove = (index, sort) => {
		const { dataStore } = this.state
		const newList = dataStore.users.slice(0)
    const arr = newList[index]
    arr.splice(sort, 1)
    newList[index] = arr
		window.sessionStorage.setItem('users', JSON.stringify(newList))
		this.setState({
			dataStore: {
				...dataStore,
				users: newList,
			},
    })
	}

	componentDidMount() {
		const positionData = window.sessionStorage.getItem('position')
		const usersData = window.sessionStorage.getItem('users')
		if (positionData || usersData) {
			const { dataStore } = this.state
			this.setState({
				dataStore: {
					...dataStore,
					position: positionData ? JSON.parse(positionData) : [],
					users: usersData ? JSON.parse(usersData) : [],
				},
			})
		}
	}

	render() {
		const {
			modelStatus,
			dataStore: { position, users },
		} = this.state
		return (
			<div className="home">
				<p>
					<Button type="primary" onClick={this.onOpen}>
						Add a position
					</Button>
				</p>
				{position.length
					? position.map((item, index) => (
							<Cards
								key={index}
								{...item}
								list={users[index]}
								onOK={this.onOK}
								onRemove={this.onRemove}
							/>
					  ))
					: null}
				{modelStatus.position && (
					<PositionModel
						visible={modelStatus.position}
						onOK={this.onOK}
						onCancel={this.onCancel}
					/>
				)}
			</div>
		)
	}
}
