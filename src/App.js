import React, { Component } from 'react';
import Editor from './Components/Editor/Editor';
import Previewer from './Components/Previewer/Previewer';
import './App.css';
import example from './template/example';
import Header from './Components/Header/Header';
import Resizer from './Components/Resizer/Resizer';
import Footer from './Components/Footer/Footer';
import CookieBanner from './Components/CookieBanner/CookieBanner';

class App extends Component {
  state = {
    editor: example,
    columnView: true,
    cookieBannerMore: false,
    cookieConsent: false
  }
  componentDidMount() {
    const userPref = localStorage.getItem('MarkdownPreviewer');
    this.setState({
      cookieConsent: userPref ? JSON.parse(userPref).cookieConsent : false
    })
  }
  handleEditorChange = newText => {
    this.setState({ editor: newText});
  }
  handleChangeView = () => {
    this.setState(prevState => {
      return {
        columnView: !prevState.columnView
      }
    });
  }
  toogleBannerModal = () => {
    this.setState(prevState => {
      return {
        cookieBannerMore: !prevState.cookieBannerMore
      }
    })
  }
  handleCookieBanner = () => {
    localStorage.setItem('MarkdownPreviewer', JSON.stringify({
      cookieConsent: true
    }));
    this.setState({
      cookieConsent: true
    })
  }

  render() {
    const cookieBannerStyle = window.innerWidth > 400 ?
    { marginTop: '50px' } : { marginTop: '80px' };
    return(
      <div
        style={!this.state.cookieConsent ? cookieBannerStyle : null}
        className={this.state.columnView ? "wrapper" : "wrapper-row"}>
        <Header
          handleChangeView={this.handleChangeView}
          columnView={this.state.columnView} />
        <Editor
          editor={this.state.editor}
          handleChange={this.handleEditorChange} >
          <Resizer
            columnView={this.state.columnView} />
        </Editor>
        <Previewer newMarkdown={this.state.editor} />
        <Footer />
        {!this.state.cookieConsent ?
          <CookieBanner
            giveConsent={this.handleCookieBanner}
            toggleModal={this.toogleBannerModal}
            showModal={this.state.cookieBannerMore} /> : null}
      </div>
    )
  }
}

export default App;
