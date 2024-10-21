import React, { Component, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface LoginState {
  email: string;
  password: string;
  errorText: string;
}

interface BlogLoginProps {
  navigate: NavigateFunction;
  handleSuccessfulLogin: () => void; // Aceptamos esta prop aquí
}

class BlogLogin extends Component<BlogLoginProps, LoginState> {
  constructor(props: BlogLoginProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    } as Pick<LoginState, keyof LoginState>);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(
        "https://ovs-api-blogbackend.onrender.com/auth/login",
        {
          email: this.state.email,
          password: this.state.password,
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          console.log("Login successful!");
          this.props.handleSuccessfulLogin(); // Llamamos a la función que actualiza el estado en App.tsx
          this.props.navigate("/blog"); // Redirigimos al blog después del login
        } else {
          this.setState({ errorText: "Invalid email or password" });
        }
      })
      .catch(error => {
        console.error("Login error", error);
        this.setState({ errorText: "An error occurred during login" });
      });
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Login to Blog Dashboard</h1>
        {this.state.errorText && (
          <div className="text-red-500 mb-4">{this.state.errorText}</div>
        )}
        <form onSubmit={this.handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    );
  }
}

// HOC para inyectar `useNavigate` como prop
export default function BlogLoginWithNavigation(props: { handleSuccessfulLogin: () => void }) {
  const navigate = useNavigate();
  return <BlogLogin navigate={navigate} handleSuccessfulLogin={props.handleSuccessfulLogin} />;
}
