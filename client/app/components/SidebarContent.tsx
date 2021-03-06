import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { generateUuid } from '../helpers/helpers'
import { loadModal } from '../actions/modal'
// import { NEW_WORD_MODAL } from '../constants/modaltypes'

interface IProps {
  username?: string
  startAddTopic?: (nextTopic: any) => any
  loadModal?: (string) => void
}

interface IState {
  isEditing: boolean
}

export class SidebarContent extends Component<IProps, IState> {
  state = {
    isEditing: false,
    topic: ''
  }

  onFieldChange = e => {
    let { name, value }: { name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  handleSubmit = e => {
    e.preventDefault()
    let topic = this.state.topic
    let id = generateUuid()
    let username = this.props.username
    let nextTopic = {
      uid: id,
      owner: username,
      topic: topic
    }
    this.props.startAddTopic(nextTopic)
  }

  // spawnWordModal = () => this.props.loadModal(NEW_WORD_MODAL)

  toggle = e => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    const { topic } = this.state
    return (
      <div className="content">
        <Link to="/dashboard" className="link">
          <FontAwesomeIcon icon="home" className="icon fa-home" />
        </Link>
        <Link to="/tags" className="link">
          <FontAwesomeIcon icon="tags" className="icon fa-tags" />
        </Link>
        <Link to="/glossary" className="link">
          <FontAwesomeIcon icon="list" className="icon fa-list" />
        </Link>
        <Link to="/dashboard" className="link">
          <FontAwesomeIcon icon="user" className="icon fa-user" />
        </Link>
        <Link to="/settings" className="link">
          <FontAwesomeIcon icon="cog" className="icon fa-cog" />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username
})

export default connect<any, any>(
  mapStateToProps,
  { loadModal }
)(SidebarContent)
