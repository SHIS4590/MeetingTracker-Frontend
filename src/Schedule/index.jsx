import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Input, Button, Table } from 'antd'
import './style.css'

class Schedule extends React.Component {
  state = {
    user: '',
    info: {
      candidateName: '',
      participants: '',
      startTime: '',
      endTime: '',
      location: '',
    },
    list: [],
  }

  columns = [
    {
      title: 'Candidate Name',
      dataIndex: 'candidateName',
      key: 'candidateName',
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
  ]

  componentDidMount() {
    const { name } = this.props.match.params
    this.setState({ user: name })
  }

  onChange = (e, type) => {
    const { value } = e.target
    const { info } = this.state
    switch (type) {
      case 'participants':
        this.setState({
          info: {
            ...info,
            participants: value,
          },
        })
        break
      case 'startTime':
        this.setState({
          info: {
            ...info,
            startTime: value,
          },
        })
        break
      case 'endTime':
        this.setState({
          info: {
            ...info,
            endTime: value,
          },
        })
        break
      case 'location':
        this.setState({
          info: {
            ...info,
            location: value,
          },
        })
        break
      default:
        break
    }
  }

  onAdd = () => {
    const { info, user, list } = this.state
    const newArr = list.concat([{ ...info, candidateName: user }])
    this.setState({
      list: newArr,
      info: {
        candidateName: '',
        participants: '',
        startTime: '',
        endTime: '',
        location: '',
      },
    })
  }

  onNav = () => {
    this.props.history.push('/')
  }

  render() {
    const { info, list } = this.state
    return (
      <div>
        <Row>
          <Col span={12}>
            <div className="form">
              <h3>A meeting box</h3>
              <p>
                <Input
                  addonBefore="Participants"
                  defaultValue={info.participants}
                  value={info.participants}
                  onChange={(e) => this.onChange(e, 'participants')}
                />
              </p>
              <p>
                <Input
                  addonBefore="Start time"
                  defaultValue={info.startTime}
                  value={info.startTime}
                  onChange={(e) => this.onChange(e, 'startTime')}
                />
              </p>
              <p>
                <Input
                  addonBefore="End time"
                  defaultValue={info.endTime}
                  value={info.endTime}
                  onChange={(e) => this.onChange(e, 'endTime')}
                />
              </p>
              <p>
                <Input
                  addonBefore="Location"
                  defaultValue={info.location}
                  value={info.location}
                  onChange={(e) => this.onChange(e, 'location')}
                />
              </p>
              <p>
                <Button type="primary" onClick={this.onAdd}>
                  Finish Adding
                </Button>
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className="table">
              <p>
                <Button type="primary" onClick={this.onNav}>
                  Adding done
                </Button>
              </p>
              <Table
                pagination={false}
                locale={{ emptyText: 'No Data' }}
                dataSource={list}
                columns={this.columns}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Schedule)
