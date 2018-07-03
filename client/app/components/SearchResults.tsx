import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

interface IState {
  placeholder: string
}

interface IProps {
  term: string
  words?: any
  topics?: any
  tags?: any
  inputState: any
}

const matchFound = term => {
  return x => {
    return x.word.toLowerCase().includes(term.toLowerCase()) || !term
  }
}

const keywordFound = term => {
  return (
    term.includes(':') &&
    (term.substring(0, term.indexOf(':')) === 'tags' ||
      term.substring(0, term.indexOf(':')) === 'topic')
  )
}

export class SearchResults extends Component<IProps, IState> {
  state = {
    placeholder: 'placeholder'
  }

  //@ts-ignore
  componentWillReceiveProps = (props, nextProps) => {
    // console.log('Input so far: ', props.term)
    const wait = async () => {
      await this.setState({
        searchTerm: props.term
      } as any)
      keywordFound(this.props.term)
      console.log(keywordFound(this.props.term))
      // this.state.resultPool = props.words.filter(wordList => wordList.word === this.state.searchTerm)
      // console.log('Words in state: ', this.state.words)
    }
    wait()

    // this.setState(prevState => ({
    //     results: resultPool
    // }))
  }

  keyFilter = term => {
    console.log('Stepped into keyFilter')
    let keyword = term.substring(0, term.indexOf(':'))
    let words = this.props.words
    let termItems = term
      .substring(term.indexOf(':') + 2, term.length)
      .split(' ')
    let allResults = []
    let finalResults = []
    // console.log(keyword)
    // console.log(words)
    // console.log('Tags to search: ', termItems)
    // console.log('Results: ', results)
    switch (keyword) {
      case 'tags':
        termItems.map(char => {
          const stage1 = this.props.tags.filter(tag => tag.tag.includes(char))
          allResults.push(stage1)

          allResults.filter(
            result =>
              !finalResults.includes(result) && finalResults.push(result)
          )
        })

        return finalResults

      // Some logic
      // for (let t of termItems) {
      // console.log(words[0].tags)
      // console.log(words.filter(word => word.tags.includes(t)))
      //   allResults.push(words.filter(word => word.tags.includes(t)))
      // }
      // console.log(allResults)
      // for (let i = 0; i < allResults.length; i++) {
      //   for (let j of allResults[i]) {
      //     if (!finalResults.includes(j)) {
      //       finalResults.push(j)
      //     }
      //   }
      // }
      // return finalResults
      // console.log(finalResults)
      // To remove duplicate words
      // for(let i=0; i<results.length; ++i) {
      //     for(let j=i+1; j<results.length; ++j) {
      //         if(results[i] === results[j])
      //             results.splice(j--, 1);
      //     }
      // }
      case 'topic':
        // More logic
        return words
      default:
        // Do nothing
        return words
    }
  }

  // @ts-ignore
  render = () => {
    return (
      <section
        className={this.props.inputState ? 'section focus' : 'section blur'}
      >
        <div className="search-results-bg" />
        <div className="search-results">
          <h1 className="title">Results</h1>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state): IState => {
  return {
    placeholder: 'placeholder'
  }
}

export default connect(
  mapStateToProps,
  null
)(SearchResults)
