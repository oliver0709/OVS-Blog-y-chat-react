import React, { Component } from "react";
import axios from "axios";
import BlogItem from "@/components/blog/blog-item";
import BlogModal from "@/components/blog/blog-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle, faSpinner, faEdit } from "@fortawesome/free-solid-svg-icons";

// Tipos para las props y el estado
interface BlogProps {
  loggedInStatus: string;
}

interface BlogState {
  blogItems: any[];
  totalCount: number;
  currentPage: number;
  isLoading: boolean;
  blogModalIsOpen: boolean;
  blogToEdit: any;
}

class Blog extends Component<BlogProps, BlogState> {
  constructor(props: BlogProps) {
    super(props);

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false,
      blogToEdit: null,
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
  }

  handleDeleteClick(blog: any) {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          blogItems: this.state.blogItems.filter((blogItem) => blog.id !== blogItem.id),
        });
      })
      .catch((error) => {
        console.log("delete blog error", error);
      });
  }

  handleEditClick(blog: any) {
    console.log("Blog to edit:", blog);
    this.setState({
      blogModalIsOpen: true,
      blogToEdit: blog,
    });
  }

  // handleSuccessfulNewBlogSubmission(blog: any) {
  //   console.log("New blog data:", blog);
  //   this.setState((prevState) => ({
  //     blogModalIsOpen: false,
  //     blogItems: [blog, ...prevState.blogItems],
  //     blogToEdit: null,
  //   }));
  //   this.getBlogItems(); // Actualizamos la lista de blogs
  // }

  handleSuccessfulNewBlogSubmission(blog: any) {
    if (!blog) {
      console.error("Error: Blog data is undefined after submission.");
      return;
    }
    console.log("New blog data:", blog);
    this.setState((prevState) => ({
      blogModalIsOpen: false,
      blogItems: [blog, ...prevState.blogItems],
      blogToEdit: null,
    }));
  }

  






  // handleUpdateFormSubmission(blog: any) {
  //   console.log("Updated blog data:", blog);
  //   if (!blog || !blog.id) {
  //     console.error("Error: Blog update failed.");
  //     return;
  //   }

  //   this.setState((prevState) => ({
  //     blogModalIsOpen: false,
  //     blogItems: prevState.blogItems.map((item) =>
  //       item.id === blog.id ? blog : item
  //     ),
  //     blogToEdit: null,
  //   }));
  //   this.getBlogItems(); // Actualizamos la lista de blogs
  // }


  handleUpdateFormSubmission(blog: any) {
    if (!blog || !blog.id) {
      console.error("Error: Blog update failed. Blog data is undefined.");
      return;
    }
    console.log("Updated blog data:", blog);
    this.setState((prevState) => ({
      blogModalIsOpen: false,
      blogItems: prevState.blogItems.map((item) =>
        item.id === blog.id ? blog : item
      ),
      blogToEdit: null,
    }));
  }

  

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false,
      blogToEdit: null,
    });
  }

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true,
      blogToEdit: null,
    });
  }

  getBlogItems() {
    axios
      .get(
        `https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("API Response:", response.data);
        this.setState({
          blogItems: response.data.portfolio_blogs, 
          totalCount: response.data.meta.total_records,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  }

  componentDidMount() {
    this.getBlogItems();
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll() {
    if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
      return;
    }

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      this.getBlogItems();
    }
  }

  render() {
    const blogRecords = this.state.blogItems.map((blogItem) => {
      return blogItem && blogItem.id ? (
        this.props.loggedInStatus === "LOGGED_IN" ? (
          <div key={`${blogItem.id}-${blogItem.title}`} className="admin-blog-wrapper">
            <BlogItem blogItem={blogItem} />
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => this.handleEditClick(blogItem)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => this.handleDeleteClick(blogItem)}
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ) : (
          <BlogItem key={`${blogItem.id}-${blogItem.title}`} blogItem={blogItem} />
        )
      ) : null;
    });

    return (
      <div className="blog-container p-4">
        <BlogModal
          handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.blogModalIsOpen}
          editMode={!!this.state.blogToEdit}
          blog={this.state.blogToEdit} 
          handleUpdateFormSubmission={this.handleUpdateFormSubmission}
        />

        {this.props.loggedInStatus === "LOGGED_IN" && (
          <button
            onClick={this.handleNewBlogClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Add New Blog
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogRecords}
        </div>

        {this.state.isLoading && (
          <div className="content-loader text-center">
            <FontAwesomeIcon icon={faSpinner} spin className="text-3xl" />
          </div>
        )}
      </div>
    );
  }
}

export default Blog;


