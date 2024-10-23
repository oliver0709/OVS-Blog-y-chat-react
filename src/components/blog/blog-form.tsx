
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";
// import "react-dropzone-component/styles/filepicker.css";
// import "dropzone/dist/dropzone.css";
// import RichTextEditor from "./rich-text-editor";

// interface BlogFormProps {
//   editMode?: boolean;
//   blog?: any;
//   handleFeaturedImageDelete?: () => void;
//   handleUpdateFormSubmission?: (blog: any) => void;
//   handleSuccessfullFormSubmission?: (blog: any) => void;
// }

// const BlogForm: React.FC<BlogFormProps> = (props) => {
//   const [id, setId] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [blog_status, setBlogStatus] = useState<string>("");
//   const [content, setContent] = useState<string>(""); // Mantenemos el estado del contenido
//   const [featured_image, setFeaturedImage] = useState<File | null>(null);
//   const [featured_image_url, setFeaturedImageUrl] = useState<string | null>(null);
//   const [apiUrl, setApiUrl] = useState<string>("https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs");
//   const [apiAction, setApiAction] = useState<string>("post");

//   const featuredImageRef = useRef<any>(null);

//   useEffect(() => {
//     // Cargamos los datos al entrar en modo edición
//     if (props.editMode && props.blog && props.blog.id !== id) {
//       setId(props.blog.id);
//       setTitle(props.blog.title);
//       setBlogStatus(props.blog.blog_status);
//       setContent(props.blog.content); // Aseguramos que el contenido se inicialice correctamente
//       setFeaturedImageUrl(props.blog.featured_image_url);
//       setApiUrl(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${props.blog.id}`);
//       setApiAction("patch");
//     }
//   }, [props.editMode, props.blog, id]);

//   // Manejo de las imágenes subidas
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       setFeaturedImage(file);
//       const previewUrl = URL.createObjectURL(file); // Previsualización de la imagen
//       setFeaturedImageUrl(previewUrl); // Establece la previsualización de la imagen
//     },
//     accept: {
//       'image/*': []
//     },
//     maxFiles: 1
//   });

//   // Actualización del contenido del editor
//   const handleRichTextEditorChange = (content: string) => {
//     setContent(content); // Actualizamos el contenido del editor de texto
//   };

//   // Construcción del formulario para enviar los datos
//   const buildForm = () => {
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("blog_status", blog_status);
//     formData.append("content", content); // Enviamos el contenido del editor

//     if (featured_image) {
//       formData.append("featured_image", featured_image);
//     }

//     return formData;
//   };

//   // Manejo del submit para crear o actualizar entradas
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Session expired, please log in again.");
//       window.location.href = "/auth";
//       return;
//     }

//     const formData = buildForm();
//     axios({
//       method: apiAction,
//       url: apiUrl,
//       data: formData,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true,
//     })
//       .then((response) => {
//         const updatedBlog = response.data;

//         if (!updatedBlog) {
//           console.error("Error: Blog data is undefined.");
//           return;
//         }

//         if (featured_image && featuredImageRef?.current) {
//           featuredImageRef.current.dropzone.removeAllFiles();
//         }

//         setTitle("");
//         setBlogStatus("");
//         setContent(""); // Limpiamos el contenido tras guardar
//         setFeaturedImage(null);
//         setFeaturedImageUrl(null);

//         if (props.editMode) {
//           props.handleUpdateFormSubmission?.(updatedBlog);
//         } else {
//           props.handleSuccessfullFormSubmission?.(updatedBlog);
//         }
//       })
//       .catch((error) => {
//         console.log("handleSubmit for blog error", error);
//         if (error.response && error.response.status === 401) {
//           alert("Session expired, please log in again.");
//           window.location.href = "/auth";
//         }
//       });
//   };

//   // Eliminación de imágenes
//   const deleteImage = () => {
//     if (!props.editMode || !props.blog?.id) {
//       // Si no estamos en modo edición o no hay un id, simplemente limpiamos la previsualización de la imagen
//       setFeaturedImage(null);
//       setFeaturedImageUrl(null);
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Session expired, please log in again.");
//       window.location.href = "/auth";
//       return;
//     }

//     axios
//       .delete(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${props.blog?.id}/image`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       })
//       .then(() => {
//         setFeaturedImageUrl(null);
//         props.handleFeaturedImageDelete?.();
//       })
//       .catch((error) => {
//         console.log("deleteImage error", error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="blog-form-wrapper space-y-6">
//       <div className="flex space-x-6">
//         <input
//           type="text"
//           onChange={(e) => setTitle(e.target.value)}
//           name="title"
//           placeholder="Blog Title"
//           value={title}
//           className="w-1/2 p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           onChange={(e) => setBlogStatus(e.target.value)}
//           name="blog_status"
//           placeholder="Blog status"
//           value={blog_status}
//           className="w-1/2 p-2 border border-gray-300 rounded"
//         />
//       </div>

//       <div>
//         <RichTextEditor
//           handleRichTextEditorChange={handleRichTextEditorChange}
//           editMode={props.editMode || false}
//           contentToEdit={content} // Pasamos el contenido en caso de edición
//         />
//       </div>

//       <div className="image-uploaders">
//         {featured_image_url ? (
//           <div className="portfolio-manager-image-wrapper">
//             <img
//               src={featured_image_url}
//               alt="Preview"
//               className="w-full"
//             />
//             <div className="image-removal-link">
//               <a
//                 onClick={() => deleteImage()}
//                 className="text-red-600 cursor-pointer"
//               >
//                 Remove file
//               </a>
//             </div>
//           </div>
//         ) : (
//           <div {...getRootProps({ className: "dropzone" })}>
//             <input {...getInputProps()} />
//             <p className="dz-message text-gray-400">Drag & drop an image here, or click to select one</p>
//           </div>
//         )}
//       </div>

//       <button className="btn bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
//     </form>
//   );
// };

// export default BlogForm;










import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
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

const BlogForm: React.FC<BlogFormProps> = (props) => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [blog_status, setBlogStatus] = useState<string>("");
  const [content, setContent] = useState<string>(""); // Mantenemos el estado del contenido
  const [featured_image, setFeaturedImage] = useState<File | null>(null);
  const [featured_image_url, setFeaturedImageUrl] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState<string>("https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs");
  const [apiAction, setApiAction] = useState<string>("post");

  const featuredImageRef = useRef<any>(null);

  useEffect(() => {
    if (props.editMode && props.blog && props.blog.id !== id) {
      setId(props.blog.id);
      setTitle(props.blog.title);
      setBlogStatus(props.blog.blog_status);
      setContent(props.blog.content); // Aseguramos que el contenido se inicialice correctamente
      setFeaturedImageUrl(props.blog.featured_image_url);
      setApiUrl(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${props.blog.id}`);
      setApiAction("patch");
    }
  }, [props.editMode, props.blog, id]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFeaturedImage(file);
      const previewUrl = URL.createObjectURL(file); // Previsualización de la imagen
      setFeaturedImageUrl(previewUrl); // Establece la previsualización de la imagen
    },
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  const handleRichTextEditorChange = (content: string) => {
    setContent(content); // Actualizamos el contenido del editor de texto
  };

  const buildForm = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("blog_status", blog_status);
    formData.append("content", content); // Enviamos el contenido del editor

    if (featured_image) {
      formData.append("featured_image", featured_image);
    }

    return formData;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired, please log in again.");
      window.location.href = "/auth";
      return;
    }

    const formData = buildForm();
    axios({
      method: apiAction,
      url: apiUrl,
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

        if (featured_image && featuredImageRef?.current) {
          featuredImageRef.current.dropzone.removeAllFiles();
        }

        setTitle("");
        setBlogStatus("");
        setContent(""); 
        setFeaturedImage(null);
        setFeaturedImageUrl(null);

        if (props.editMode) {
          props.handleUpdateFormSubmission?.(updatedBlog);
        } else {
          props.handleSuccessfullFormSubmission?.(updatedBlog);
        }
      })
      .catch((error) => {
        console.log("handleSubmit for blog error", error);
        if (error.response && error.response.status === 401) {
          alert("Session expired, please log in again.");
          window.location.href = "/auth";
        }
      });
  };

  const deleteImage = () => {
    if (!props.editMode || !props.blog?.id) {
      setFeaturedImage(null);
      setFeaturedImageUrl(null);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired, please log in again.");
      window.location.href = "/auth";
      return;
    }

    axios
      .delete(`https://ovs-api-blogbackend.onrender.com/portfolio/portfolio_blogs/${props.blog?.id}/image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        setFeaturedImageUrl(null);
        props.handleFeaturedImageDelete?.();
      })
      .catch((error) => {
        console.log("deleteImage error", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form-wrapper space-y-6">
      <div className="flex space-x-6">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="Blog Title"
          value={title}
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          onChange={(e) => setBlogStatus(e.target.value)}
          name="blog_status"
          placeholder="Blog status"
          value={blog_status}
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <RichTextEditor
          handleRichTextEditorChange={handleRichTextEditorChange}
          editMode={props.editMode || false}
          contentToEdit={content} // Pasamos el contenido en caso de edición
        />
      </div>

      <div className="image-uploaders">
        {featured_image_url ? (
          <div className="portfolio-manager-image-wrapper">
            <img
              src={featured_image_url}
              alt="Preview"
              className="w-full"
            />
            <div className="image-removal-link">
              <a
                onClick={() => deleteImage()}
                className="text-red-600 cursor-pointer"
              >
                Remove file
              </a>
            </div>
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p className="dz-message text-gray-400">Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </div>

      <button className="btn bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
    </form>
  );
};

export default BlogForm;
