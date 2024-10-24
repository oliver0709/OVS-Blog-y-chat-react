import React, { Component } from "react";
import ReactModal from "react-modal";
import BlogForm from "../blog/blog-form";

interface BlogModalProps {
  modalIsOpen: boolean;
  handleModalClose: () => void;
  handleSuccessfulNewBlogSubmission: (blog: any) => void;
  editMode?: boolean;
  blog?: any;
  handleUpdateFormSubmission?: (blog: any) => void;
}

export default class BlogModal extends Component<BlogModalProps> {
  constructor(props: BlogModalProps) {
    super(props);
    this.handleSuccessfullFormSubmission = this.handleSuccessfullFormSubmission.bind(this);
  }

  handleSuccessfullFormSubmission(blog: any) {
    if (this.props.editMode) {
      this.props.handleUpdateFormSubmission?.(blog);
    } else {
      this.props.handleSuccessfulNewBlogSubmission(blog);
    }
  }

  render() {
    return (
      <ReactModal
        className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onRequestClose={this.props.handleModalClose}
        isOpen={this.props.modalIsOpen}
        style={{
          content: {
            height: "90%", 
            width: "70%", 
            overflow: "auto",
            margin: "auto", 
          },
        }}
      >
        <BlogForm
          editMode={this.props.editMode}
          blog={this.props.blog}
          handleSuccessfullFormSubmission={this.handleSuccessfullFormSubmission}
          handleUpdateFormSubmission={this.props.handleUpdateFormSubmission}
        />
      </ReactModal>
    );
  }
}

