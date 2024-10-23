import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface BlogDetailProps {
  id: string;
}

interface BlogDetailState {
  title: string;
  content: string;
  featuredImageUrl: string;
}

class BlogDetail extends Component<BlogDetailProps, BlogDetailState> {
  constructor(props: BlogDetailProps) {
    super(props);

    this.state = {
      title: "",
      content: "",
      featuredImageUrl: "",
    };
  }

  componentDidMount() {
    const { id } = this.props;

    axios
      .get(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const blogData = response.data;
        this.setState({
          title: blogData.title,
          content: blogData.content,
          featuredImageUrl: blogData.featured_image_url,
        });
      })
      .catch((error) => {
        console.error("Error fetching blog details", error);
      });
  }

  render() {
    const { title, content, featuredImageUrl } = this.state;

    return (
      <div className="blog-detail-container max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {featuredImageUrl && (
          <img
            src={featuredImageUrl}
            alt="Featured"
            className="w-full h-64 object-cover mb-6"
          />
        )}
        <div
          className="blog-content text-lg text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }
}

const BlogDetailWithParams = () => {
  const { id } = useParams<{ id?: string }>();

  // Verificar si `id` está definido antes de renderizar el componente
  if (!id) {
    return <div>Blog ID not found.</div>;
  }

  return <BlogDetail id={id} />;
};

export default BlogDetailWithParams;
