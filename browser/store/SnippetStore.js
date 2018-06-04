import { observable, computed } from 'mobx'
import formatDate from 'lib/date-format'
import SnippetAPI from 'core/API/snippet'

class SnippetStore {
  @observable raw_snippets = []

  @computed get snippets () {
    return this.raw_snippets.map(snippet => {
      snippet.createAt = formatDate(snippet.createAt)
      snippet.updateAt = formatDate(snippet.updateAt)
      return snippet
    })
  }

  @computed get languages () {
    const languages = {}
    this.raw_snippets.forEach(snippet => {
      if (languages[snippet.lang]) {
        languages[snippet.lang] += 1
      } else {
        languages[snippet.lang] = 1
      }
    })
    return languages
  }

  loadSnippets (snippets) {
    this.raw_snippets = snippets
  }

  createSnippet (snippet) {
    const newSnippet = SnippetAPI.createSnippet(snippet)
    this.raw_snippets.push(newSnippet)
  }
}

let store = window.store = new SnippetStore()

export default store