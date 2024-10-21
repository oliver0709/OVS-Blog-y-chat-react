import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import "react-dropzone-component/styles/filepicker.css";
import "dropzone/dist/dropzone.css";
import RichTextEditor from "./rich-text-editor";

interface BlogFormProps {
  editMode?: boolean;
  blog?: any;
  handleFeaturedImageDelete?: () => void;
  handleUpdateFormSubmission?: (blog: any) => void;
  handleSuccessfullFormSubmission?: (blog: any) => void;
}

interface BlogFormState {
  id: string;
  title: string;
  blog_status: string;
  content: string;
  featured_image: any;
  featured_image_url: string | null; // Nueva propiedad para manejar el estado de la imagen
  apiUrl: string;
  apiAction: string;
}

export class BlogForm extends Component<BlogFormProps, BlogFormState> {
  featuredImageRef: React.RefObject<any>;

  constructor(props: BlogFormProps) {
    super(props);

    this.state = {
      id: "",
      title: "",
      blog_status: "",
      content: "",
      featured_image: null,
      featured_image_url: null, // Inicializamos la propiedad como null
      apiUrl: "https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs",
      apiAction: "post",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.featuredImageRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: BlogFormProps, prevState: BlogFormState) {
    if (nextProps.editMode && nextProps.blog && nextProps.blog.id !== prevState.id) {
      return {
        id: nextProps.blog.id,
        title: nextProps.blog.title,
        blog_status: nextProps.blog.blog_status,
        content: nextProps.blog.content,
        featured_image_url: nextProps.blog.featured_image_url, // Cargamos la URL de la imagen en el estado
        apiUrl: `https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${nextProps.blog.id}`,
        apiAction: "patch",
      };
    }
    return null;
  }

  handleFeaturedImageDrop() {
    return {
      addedfile: (file: File) => this.setState({ featured_image: file }),
    };
  }

  handleRichTextEditorChange(content: string) {
    this.setState({ content });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      [event.target.name]: event.target.value,
    } as Pick<BlogFormState, keyof BlogFormState>);
  }

  buildForm() {
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("blog_status", this.state.blog_status);
    formData.append("content", this.state.content);

    if (this.state.featured_image) {
      formData.append("featured_image", this.state.featured_image);
    }

    return formData;
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    const formData = this.buildForm();
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        const updatedBlog = response.data;

        if (!updatedBlog) {
          console.error("Error: Blog data is undefined.");
          return;
        }

        if (this.state.featured_image && this.featuredImageRef?.current) {
          this.featuredImageRef.current.dropzone.removeAllFiles();
        }

        this.setState({
          title: "",
          blog_status: "",
          content: "",
          featured_image: null,
        });

        if (this.props.editMode) {
          this.props.handleUpdateFormSubmission?.(updatedBlog);
        } else {
          this.props.handleSuccessfullFormSubmission?.(updatedBlog);
        }
      })
      .catch((error) => {
        console.log("handleSubmit for blog error", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Please check if the token is valid.");
        }
      });
  }

  deleteImage(imageType: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    axios
      .delete(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${this.props.blog?.id}/image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        this.setState({ featured_image_url: null }); // Actualizamos el estado para reflejar la eliminación
        this.props.handleFeaturedImageDelete?.();
      })
      .catch((error) => {
        console.log("deleteImage error", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper space-y-6">
        <div className="flex space-x-6">
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
            className="w-1/2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            onChange={this.handleChange}
            name="blog_status"
            placeholder="Blog status"
            value={this.state.blog_status}
            className="w-1/2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <RichTextEditor
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode || false}
            contentToEdit={this.state.content}
          />
        </div>

        <div className="image-uploaders">
          {this.props.editMode && this.state.featured_image_url ? (
            <div className="portfolio-manager-image-wrapper">
              <img
                src={this.state.featured_image_url}
                alt="Blog Featured"
                className="w-full"
              />
              <div className="image-removal-link">
                <a
                  onClick={() => this.deleteImage("featured_image")}
                  className="text-red-600 cursor-pointer"
                >
                  Remove file
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.featuredImageRef}
              config={{
                iconFiletypes: [".jpg", ".png"],
                showFiletypeIcon: true,
                postUrl: "https://httpbin.org/post",
              }}
              djsConfig={{
                addRemoveLinks: true,
                maxFiles: 1,
              }}
              eventHandlers={this.handleFeaturedImageDrop()}
              className="dropzone-class"
            >
              <div className="dz-message text-gray-400">Featured Image</div>
            </DropzoneComponent>
          )}
        </div>

        <button className="btn bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
      </form>
    );
  }
}

export default BlogForm;
