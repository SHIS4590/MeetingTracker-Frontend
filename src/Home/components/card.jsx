import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button, Table } from 'antd'
import UserInfoModel from './userinfoModel'

class Cards extends React.Component {
  state = {
    visible: false,
    type: '',
    userData: {},
  }

  columns = [
    {
      title: 'Candidate Name',
      dataIndex: 'candidateName',
      key: 'candidateName',
    },
    {
      title: 'Email',
      dataIndex: 'candidateEmail',
      key: 'candidateEmail',
    },
    {
      title: 'Uploaded Docs',
      dataIndex: 'fileList',
      key: 'fileList',
      render: (text, record) =>
        record.fileList.map((item, index) => (
          <p>
            {index + 1}. {item.fileName}
          </p>
        )),
    },
    {
      title: 'Meeting Schedule',
      dataIndex: 'meetingSchedule',
      key: 'meetingSchedule',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              const { history } = this.props
              history.push(`/schedule/${record.candidateName}`)
            }}
          >
            Create
          </Button>
          <Button type="link">View</Button>
          <Button type="link">Update</Button>
          <Button type="link">Delete</Button>
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              this.setState({
                type: 'edit',
                userData: record,
                visible: true,
              })
            }}
          >
            Edit
          </Button>
          <Button type="link">Delete</Button>
        </span>
      ),
    },
  ]

  onOpen = () => {
    this.setState({ visible: true })
  }

  onCancel = () => {
    this.setState({ visible: false, userData: {}, type: '' })
  }

  onOK = (data) => {
    const { index } = this.props
    this.props.onOK('users', data, index)
    this.setState({ visible: false, userData: {}, type: '' })
  }

  render() {
    const {
      positionName,
      positionId,
      department,
      list = [],
      index,
    } = this.props
    const { visible, type, userData } = this.state
    return (
      <Card
        type="inner"
        title={
          <div>
            <p>Meeting Scheduling for the Position</p>
            <p>
              Name: {positionName || 'Lecturer'}; ID: {positionId || 2987987};
              Department:{department || 'Phy'}
            </p>
          </div>
        }
        extra={
          <span>
            <Button type="link" onClick={this.onOpen}>
              Add new Candidate
            </Button>
            <Button type="link">View All Meeting Schedules</Button>
          </span>
        }
      >
        {list.length ? (
          <Table pagination={false} dataSource={list} columns={this.columns} />
        ) : null}
        {visible && (
          <UserInfoModel
            visible={visible}
            type={type}
            data={userData}
            onCancel={this.onCancel}
            onOK={this.onOK}
          />
        )}
      </Card>
    )
  }
}

export default withRouter(Cards)
