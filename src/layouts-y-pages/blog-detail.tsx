// import React, { Component } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // Usamos useParams


// interface BlogDetailProps {
//   id: string;
// }

// interface BlogDetailState {
//   title: string;
//   content: string;
//   featuredImageUrl: string;
// }

// class BlogDetail extends Component<BlogDetailProps, BlogDetailState> {
//   constructor(props: BlogDetailProps) {
//     super(props);

//     this.state = {
//       title: "",
//       content: "",
//       featuredImageUrl: "",
//     };
//   }

//   componentDidMount() {
//     const { id } = this.props;  // Obtenemos el id pasado como prop desde el componente de función

//     axios
//       .get(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${id}`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         const blogData = response.data;
//         this.setState({
//           title: blogData.title,
//           content: blogData.content,
//           featuredImageUrl: blogData.featured_image_url,
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching blog details", error);
//       });
//   }

//   render() {
//     const { title, content, featuredImageUrl } = this.state;

//     return (
//       <div className="blog-detail-container p-8">
//         <h1 className="text-3xl font-bold mb-6">{title}</h1>
//         {featuredImageUrl && (
//           <img
//             src={featuredImageUrl}
//             alt="Featured"
//             className="w-full h-64 object-cover mb-6"
//           />
//         )}
//         <div className="blog-content text-lg">{content}</div>
//       </div>
//     );
//   }
// }

// // Componente de función que usa `useParams` y pasa el `id` al componente de clase
// const BlogDetailWithParams = () => {
//   const { id } = useParams<{ id: string }>();  // Obtenemos el parámetro `id` desde la URL
//   return <BlogDetail id={id} />;
// };

// export default BlogDetailWithParams;


import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Usamos useParams

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
    const { id } = this.props; // Obtenemos el id pasado como prop desde el componente de función

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
          className="blog-content text-lg text-justify" // Justificar el texto
          dangerouslySetInnerHTML={{ __html: content }} // Renderizamos el HTML del contenido correctamente
        />
      </div>
    );
  }
}

// Componente de función que usa `useParams` y pasa el `id` al componente de clase
const BlogDetailWithParams = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el parámetro `id` desde la URL
  return <BlogDetail id={id} />;
};

export default BlogDetailWithParams;
