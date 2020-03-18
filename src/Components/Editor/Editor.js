import React, { Component } from 'react';
import ClickableIcon from '../ClickableIcon/ClickableIcon';
import CustomSelect from '../CustomSelect/CustomSelect';
import Modal from '../UI/Modal/Modal';
import { toolbox, urlModal, urlPlaceHolders } from '../../template/toolbox';
import { editorActions } from '../../template/userActions';
import { createFile, formatSelectedText, calHeadingMarkdown } from '../../utility/utility';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.textAreaRef = null;

    this.handleTextArea = element => {
      this.textAreaRef = element;
    };
  }
  state = {
    editor: this.props.editor,
    selected: '',
    start: 0,
    end: 0,
    showModal: false,
    text: urlPlaceHolders.text,
    url: urlPlaceHolders.url,
    buttonId: '',
    insertUrl: true,
    uploadedText: '',
    uploadError: false,
    showFlashMessage: false,
    flashMessage: '',
    usingToolbox: false,
    showSelectOpt: false
  }
  componentDidUpdate() {
    //while using the toolbox the caret position is calculated and saved to state, so the selected text is updated in the textarea
    if(this.state.usingToolbox) {
      this.textAreaRef.focus();
      this.textAreaRef.selectionStart = this.state.start;
      this.textAreaRef.selectionEnd = this.state.end;
      this.setState({usingToolbox: false})
    }
  }
  handleSelect = e => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd
    this.setState({
      selected: e.target.value.substring(start, end),
      start,
      end
    });
  }
  handleEditorUpdate = text => {
    this.textAreaRef.style.height = (this.textAreaRef.scrollHeight)+"px";
    this.setState({ editor: text });
    this.props.handleChange(text);
  }
  handleToolboxClick = (e, type, markdown) => {
    //if nothing is selected on click shows the title, or if it's a url the placeholder.
    const selectedText = this.state.selected !== '' && this.state.selected !== ' ' ?
    this.state.selected :
    type === 'url' ?
    urlPlaceHolders.text :
    e.currentTarget.title;
    if(type === 'url') {
      this.setState({
        text: selectedText,
        showModal: true,
        buttonId: e.currentTarget.title,
        insertUrl: true
      });
    }
    else {
      const [newText, startSel, endSel] = formatSelectedText(this.state.editor, selectedText, this.state.start, this.state.end, markdown, type);

      this.setState({
        usingToolbox: true,
        start: startSel,
        end: endSel
      })
      this.handleEditorUpdate(newText);
    }
  }
  handleHeading = ( e, type, markdown, i ) => {
    this.toggleSelect();
    const finalMarkdown = calHeadingMarkdown(i, markdown);
    this.handleToolboxClick(e, type, finalMarkdown);
  }
  handleChange = e => {
    this.handleEditorUpdate(e.target.value);
  }
  toggleSelect = () => {
    this.setState(prevState => {
      return {
        showSelectOpt: !prevState.showSelectOpt
      }
    })
  }
  onSelectBlur = () => {
    //because using toggleSelect onBlur when the button has focus and then clicking outside of the browser window if the browser window gets focus after that it will trigger another toggleSelect
    this.setState({
      showSelectOpt: false
    });
  }
  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        text: urlPlaceHolders.text,
        url: urlPlaceHolders.url,
        uploadedText: '',
        uploadError: false
      }
    });
  }
  modalInputChange = (e, el) => {
    this.setState({
      [el]: e.target.value
    })
  }
  modalSaveUrl = () => {
    //call formatSelectedText using text and url to compose selected
    const [newText, start, end ] = formatSelectedText(this.state.editor, {
      text: this.state.text,
      url: this.state.url
    }, this.state.start, this.state.end, this.state.buttonId, 'url');
    this.setState({
      usingToolbox: true,
      start,
      end
    });
    this.handleEditorUpdate(newText);
    this.toggleModal();
  }
  handleEditorActions = e => {
    switch (e.currentTarget.name) {
      case 'copy':
        this.textAreaRef.select();
        document.execCommand('copy');
        this.setState({
          showFlashMessage: true,
          flashMessage: 'Copied to clipboard'
        },
        () => {
          setTimeout( () => {
            this.setState({
              showFlashMessage: false,
              flashMessage: ''
            })
          }, 1000)
        });
        break;
      case 'download':
        createFile(this.state.editor);
        return;
      case 'import':
        if (window.File && window.FileReader && window.FileList) {
          this.setState({
            insertUrl: false,
            showModal: true
          })
        } else {
          alert('The File APIs are not fully supported in this browser.');
        }
        return;
      default:
        return;
    }
  }
  handleImportFile = e => {
    const file = e.target.files;
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = e => {
      this.setState({uploadedText: e.target.result})
    }
  }
  handleSaveImportedFile = e => {
    if(this.state.uploadedText === '') this.setState({
      uploadError: true
    })
    else {
      this.handleEditorUpdate(this.state.uploadedText, 0, 0);
      this.setState({
        showModal: false,
        uploadedText: ''
      })
    }
  }

  render() {
    const toolboxEl = (
      <div className='Toolbox'>
        {toolbox.map(el => {
          if(el.type === 'select') {
            return (
              <CustomSelect
                key={el.id}
                onSelectBlur={this.onSelectBlur}
                el={el}
                choseHeading={this.handleHeading}
                selectClick={() => this.toggleSelect()}
                showOptions={this.state.showSelectOpt}/>
            )
          } else return (
            <ClickableIcon
              name={el.title}
              key={el.id}
              onClick={e => this.handleToolboxClick(e, el.markdownType, el.markdown)}
              title={el.title}
              icon={el.icon} />
            )
        } )}
      </div>
    );
    const editorActionsEl = (
      <div className='EditorActions'>
        {editorActions.map(el =>
          <ClickableIcon
            name={el.name}
            key={el.name}
            onClick={this.handleEditorActions}
            title={el.title}
            icon={el.icon} />
        )}
        {this.state.showFlashMessage ? <span className="flashMessage">{this.state.flashMessage}</span> : null}
      </div>
    );
    const uploadFile = (
      <>
        <input
          onChange={this.handleImportFile}
          type="file"
          id="file"
          name="file" />
        {this.state.uploadError ?
          <span className="error" >Please Select a file</span> : null}
        <div className="button_container">
          <button
            className="btn action"
            name="saveFile"
            onClick={this.handleSaveImportedFile} >Upload</button>
        </div>
      </>
    );
    const insertUrl = (
      <>
        {urlModal.map(el => (
          <div
            className={`Input ${el.name}`}
            key={el.name}>
            <label
              htmlFor={el.name}>
              {el.label}
            </label>
            <input
              id={el.name}
              type={el.type}
              value={this.state[el.type]}
              onChange={e => this.modalInputChange(e, el.type)}/>
          </div>
          )
        )}
        <div className="button_container">
        <button
          className="btn action"
          name="save"
          onClick={this.modalSaveUrl}>Save</button>
        <button
          className="btn action cancel"
          name="cancel"
          onClick={this.toggleModal}>Cancel</button>
        </div>
      </>
    )
    const modal = (
      <Modal
        show={this.state.showModal}
        backDropClick={this.toggleModal} >
        {this.state.insertUrl ? insertUrl : uploadFile}
      </Modal>
    );
    return (
      <div className="editor-wrapper">
        {this.state.showModal ? modal : null}
        <div className="toolbar-wrapper">
          {toolboxEl}
          {editorActionsEl}
        </div>
        <textarea
          ref={this.handleTextArea}
          onSelect={this.handleSelect}
          id="editor"
          type="text"
          value={this.state.editor}
          onChange={this.handleChange} />
          {this.props.children}
      </div>
    )
  }

};

export default Editor;
