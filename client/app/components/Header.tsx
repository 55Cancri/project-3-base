import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SearchResults from './SearchResults'
import { startLogout } from '../actions/auth'

interface StateProps {
  isAuthenticated: Boolean
  name: string
  words: any
  results: any
  photo: string
}

interface DispatchProps {
  startLogout: () => void
}

type Props = StateProps & DispatchProps

export class Header extends Component<Props> {
  state = {
    dropdownOpen: false,
    searchTerm: '',
    showSearch: false
  }

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  // Probably will only use this for testing
  // @ts-ignore
  componentDidMount = () =>
    document.addEventListener('click', this.determineSelection, false)

  //@ts-ignore
  componentWillUnmount = () =>
    document.removeEventListener('click', this.determineSelection)

  determineSelection = ({ target }) => {
    // if you click outside, some code runs
    if (!target.closest('.section') && !target.dataset.search) this.searchBlur()

    // else if you click inside, some other code runs
  }

  searchFocus = () => {
    this.setState({ showSearch: true })
  }

  searchBlur = () => {
    this.setState({ showSearch: false })
  }

  onFieldChange = e => {
    let value = e.target.value
    this.setState({
      searchTerm: value
    } as any)
  }

  handleSubmit = e => {
    e.preventDefault()
    // console.log('Reached submit')
    // console.log(this.props.words)
    const matches = this.props.words.filter(
      word => word.word === this.state.searchTerm
    )
    // console.log(this.state.searchTerm)

    let results = this.props.results
    // console.log(matches[0])
    this.setState({
      results: matches
    } as any)
    // console.log('Results', this.props.results)

    // alert('Found match' + match[0].word)
  }

  render() {
    const { isAuthenticated, startLogout, photo } = this.props
    const searchTerm = this.state.searchTerm

    return (
      <header className="nav-header">
        <SearchResults term={searchTerm} inputState={this.state.showSearch} />
        <FontAwesomeIcon icon="bars" className="bars" />
        <Link to="/dashboard" className="seam-sm">
          Seam
        </Link>
        <div className="search-group">
          <FontAwesomeIcon icon="search" className="icon" />
          <form className="submit" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="input spawnSearch"
              placeholder="Search"
              value={searchTerm}
              data-search={true}
              onChange={this.onFieldChange}
              onFocus={this.searchFocus}
              // onBlur={this.searchBlur}
            />
          </form>
        </div>

        <FontAwesomeIcon icon="bell" className="alerts" />

        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
          className="dropdown-root"
        >
          <DropdownToggle className="dropdown-toggle">
            <div
              className="image"
              style={{
                background: `url(${photo}) center / cover no-repeat`
              }}
            />
            <p className="nav-username">{this.props.name}</p>
            <FontAwesomeIcon icon="angle-down" className="icon fa-angle-down" />
          </DropdownToggle>
          <DropdownMenu
            right
            className="dropdown-menu"
            style={{
              display: this.state.dropdownOpen === false ? 'none' : 'block'
            }}
          >
            <DropdownItem className="dropdown-item">
              <Link to="/profile" className="profile">
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem
              className="dropdown-item"
              onClick={() => startLogout()}
            >
              {isAuthenticated ? <p className="logout">Logout</p> : null}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>
    )
  }
}

const mapStateToProps = (state): StateProps => {
  return {
    isAuthenticated: !!state.auth.token,
    name: state.auth.name,
    words: state.lexica.words,
    results: state.lexica.results,
    photo: state.auth.profileImage
  }
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  {
    startLogout
    // startGetEverything
  }
)(Header)
