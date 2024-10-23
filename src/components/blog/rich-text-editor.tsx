// import React, { Component } from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// interface RichTextEditorProps {
//   handleRichTextEditorChange: (content: string) => void;
//   editMode?: boolean;
//   contentToEdit?: string | null;
// }

// interface RichTextEditorState {
//   editorState: EditorState;
// }

// export default class RichTextEditor extends Component<
//   RichTextEditorProps,
//   RichTextEditorState
// > {
//   constructor(props: RichTextEditorProps) {
//     super(props);

//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };

//     this.onEditorStateChange = this.onEditorStateChange.bind(this);
//   }

//   componentDidMount() {
//     // Cargamos el contenido si estamos en modo edición
//     this.initializeEditor();
//   }

//   componentDidUpdate(prevProps: RichTextEditorProps) {
//     // Actualizamos el editor si el contenido cambia
//     if (
//       this.props.editMode &&
//       this.props.contentToEdit &&
//       this.props.contentToEdit !== prevProps.contentToEdit
//     ) {
//       this.initializeEditor();
//     }
//   }

//   initializeEditor() {
//     if (this.props.editMode && this.props.contentToEdit) {
//       const contentBlock = htmlToDraft(this.props.contentToEdit);
//       if (contentBlock) {
//         const contentState = ContentState.createFromBlockArray(
//           contentBlock.contentBlocks,
//           contentBlock.entityMap
//         );
//         const editorState = EditorState.createWithContent(contentState);
//         this.setState({ editorState });
//       }
//     }
//   }

//   onEditorStateChange(editorState: EditorState) {
//     this.setState({ editorState }, () => {
//       this.props.handleRichTextEditorChange(
//         draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
//       );
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Editor
//           editorState={this.state.editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           toolbarClassName="rdw-editor-toolbar"
//           onEditorStateChange={this.onEditorStateChange}
//           toolbar={{
//             inline: { inDropdown: false },
//             list: { inDropdown: true },
//             textAlign: { inDropdown: true },
//             link: { inDropdown: false },
//             history: { inDropdown: true },
//             fontFamily: {
//               options: [
//                 "Arial",
//                 "Georgia",
//                 "Impact",
//                 "Tahoma",
//                 "Times New Roman",
//                 "Verdana",
//               ],
//             },
//             fontSize: {
//               options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36],
//             },
//             image: {
//               urlEnabled: true,
//               uploadEnabled: true,
//               alignmentEnabled: true,
//               previewImage: true,
//               inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
//               alt: { present: false, mandatory: false },
//             },
//           }}
//         />
//       </div>
//     );
//   }
// }









import React, { Component } from "react";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
      editorState: EditorState.createEmpty(),
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  componentDidMount() {
    // Cargamos el contenido si estamos en modo edición
    if (this.props.editMode && this.props.contentToEdit) {
      this.loadContentToEdit(this.props.contentToEdit);
    }
  }

  componentDidUpdate(prevProps: RichTextEditorProps) {
    // Actualizamos el editor si el contenido cambia
    if (
      this.props.editMode &&
      this.props.contentToEdit &&
      this.props.contentToEdit !== prevProps.contentToEdit
    ) {
      this.loadContentToEdit(this.props.contentToEdit);
    }
  }

  loadContentToEdit(content: string) {
    const contentBlock = htmlToDraft(content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
        contentBlock.entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  onEditorStateChange(editorState: EditorState) {
    this.setState({ editorState }, () => {
      const currentContent = this.state.editorState.getCurrentContent();
      const htmlContent = draftToHtml(convertToRaw(currentContent));
      this.props.handleRichTextEditorChange(htmlContent);
    });
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
            link: { inDropdown: false }, // Habilitamos el botón de enlaces fuera del dropdown
            history: { inDropdown: true },
            fontFamily: {
              options: [
                "Arial",
                "Georgia",
                "Impact",
                "Tahoma",
                "Times New Roman",
                "Verdana",
              ],
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36],
            },
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              alt: { present: false, mandatory: false },
            },
          }}
        />
      </div>
    );
  }
}
