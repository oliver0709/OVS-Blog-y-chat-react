import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // Asegúrate de importar los estilos

interface RichTextEditorProps {
  handleRichTextEditorChange: (content: string) => void;
  editMode?: boolean;
  contentToEdit?: string | null;
}

interface RichTextEditorState {
  editorState: EditorState;
}

export default class RichTextEditor extends Component<
  RichTextEditorProps,
  RichTextEditorState
> {
  constructor(props: RichTextEditorProps) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  componentWillMount() {
    if (this.props.editMode && this.props.contentToEdit) {
      const blocksFromHtml = htmlToDraft(this.props.contentToEdit || "");
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  onEditorStateChange(editorState: EditorState) {
    this.setState({ editorState }, () =>
      this.props.handleRichTextEditorChange(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      )
    );
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarClassName="rdw-editor-toolbar"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: false },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              alt: { present: true, mandatory: false },
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
            }
          }}
        />
      </div>
    );
  }
}
